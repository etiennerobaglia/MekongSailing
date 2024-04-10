<script setup>
import mapboxgl from 'mapbox-gl'
import mekongGeoJSON from '../../mekong-line.json'
import "mapbox-gl/dist/mapbox-gl.css";
import { onMounted, ref } from 'vue'
import * as turf from '@turf/turf'

const mekong = ref(mekongGeoJSON)
const emit = defineEmits(['mapLoaded', 'mapStyleLoaded'])

onMounted(async () => {
  const scrollAreaH = ref(document.getElementById('scrollTarget').offsetHeight);

  const supportPageOffset = ref(window.scrollX !== undefined)
  const isCSS1Compat = ref(((document.compatMode || "") === "CSS1Compat"))

  // map setup
  mapboxgl.accessToken = "pk.eyJ1IjoiZXRyb2JhIiwiYSI6ImNsaDR1M3RtYTIxNDgzY29nYjk0azF3eG8ifQ.cf9iT5VHX-AR-QzHwHVLVQ"
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-v9',
    bounds: [
      [100.6054, 20.1209], [100.0298, 20.4225]
    ]


  });


  map.on('style.load', () => {
    emit('mapStyleLoaded')
    // add mekong bed line
    map.addSource('trace', {
      type: 'geojson',
      data: {
        'type': 'Feature',
        'properties': {},
        'geometry': {
          'type': 'LineString',
          'coordinates': mekong.value
        }
      }
    })
    map.addLayer({
      type: 'line',
      source: 'trace',
      id: 'line',
      paint: {
        'line-color': '#DD2A12',
        'line-width': 2
      },
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      }
    });

    // add mekong old map
    map.addSource('mekong', {
      'type': 'raster',
      'url': 'mapbox://etroba.7k40fojn'
    });
    map.addLayer({
      'id': 'mekong',
      'source': 'mekong',
      'type': 'raster',
      'paint': {
        'raster-opacity': 0.7,
      }
    });

    // add styling for the sky (3d background)
    map.addLayer({
      'id': 'sky',
      'type': 'sky',
      'paint': {
        'sky-type': 'atmosphere',
        'sky-atmosphere-sun-intensity': 10,
        'sky-atmosphere-color': 'rgb(135, 206, 235)'
      }
    });

    // add 3d terrain
    map.addSource('mapbox-dem', {
      'type': 'raster-dem',
      'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
      'tileSize': 512,
      'maxzoom': 14
    });
    map.setTerrain({
      'source': 'mapbox-dem',
      'exaggeration': 2
    });
  });

  map.on('load', () => {
    emit('mapLoaded')
    // const animationDuration = 5000000;
    // const cameraAltitude = 50000;
    const cameraAltitude_base = 2500;

    // get the overall length of each route so we can interpolate along them
    const routeLength = turf.length(turf.lineString(mekong.value));
    const cameraRouteLength = turf.length(turf.lineString(mekong.value));

    function frame() {
      ticking = false;

      // rate determines how far through the animation we are
      const y = supportPageOffset.value ? window.scrollY : isCSS1Compat.value ? document.documentElement.scrollTop : document.body.scrollTop;
      const rate = y / scrollAreaH.value;

      // find the best value with your eyes
      const cameraAltitude =
        cameraAltitude_base + (rate * rate * 10000);

      // use the rate to get a point that is the appropriate length along the route
      // this approach syncs the camera and route positions ensuring they move
      // at roughly equal rates even if they don't contain the same number of points

      const alongRoute = turf.along(
        turf.lineString(mekong.value),
        routeLength * (rate + 0.0015)
      ).geometry.coordinates;

      const alongCamera = turf.along(
        turf.lineString(mekong.value),
        cameraRouteLength * rate
      ).geometry.coordinates;
      console.log()
      const camera = map.getFreeCameraOptions();

      // set the position and altitude of the camera
      camera.position = mapboxgl.MercatorCoordinate.fromLngLat(
        {
          lng: alongCamera[0],
          lat: alongCamera[1]
        },
        cameraAltitude
      );

      // tell the camera to look at a point along the route
      camera.lookAtPoint({
        lng: alongRoute[0],
        lat: alongRoute[1]
      });

      map.setFreeCameraOptions(camera);
    }

    let ticking = false;

    function scrollEvent() {
      if (!ticking) {
        requestAnimationFrame(frame);
        ticking = true;
      }
    }

    document.addEventListener('scroll', scrollEvent, { passive: true });
  });
});


</script>

<template>
  <div class="map-wrapper">
    <div class="map" id="map"></div>
  </div>
  <div class="contents" id="scrollTarget">
    <div class="wrapper"></div>
  </div>
</template>

<style scoped>
.map-wrapper {
  position: fixed;
  margin: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

#map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
}

.contents {
  position: absolute;
  width: 100%;
  height: 100000vh;
}

.wrapper {
  position: relative;
  top: 200px;
}
</style>