<script setup>
import mapboxgl from 'mapbox-gl'
import mekongGeoJSON from '../../mekong-line.json'
import "mapbox-gl/dist/mapbox-gl.css";
import { onMounted, ref } from 'vue'
import * as turf from '@turf/turf'

const mekong = ref(mekongGeoJSON)

onMounted(async () => {
  // map setup
  mapboxgl.accessToken = "pk.eyJ1IjoiZXRyb2JhIiwiYSI6ImNsaDR1M3RtYTIxNDgzY29nYjk0azF3eG8ifQ.cf9iT5VHX-AR-QzHwHVLVQ"
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-streets-v12',
    center: [100.07924580378017, 20.372724587369504],

    pitch: 25,
    zoom: 14.5,
    bearing: 140
  });


  map.on('style.load', () => {

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
        'line-color': 'red',
        'line-width': 5
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

    const animationDuration = 5000000;
    const cameraAltitude = 5000;
    // get the overall distance of each route so we can interpolate along them
    const routeDistance = turf.lineDistance(turf.lineString(mekong.value));
    const cameraRouteDistance = turf.lineDistance(
      turf.lineString(mekong.value)
    );

    let start;

    function frame(time) {
      if (!start) start = time;
      // phase determines how far through the animation we are
      const phase = (time - start) / animationDuration;

      // phase is normalized between 0 and 1
      // when the animation is finished, reset start to loop the animation
      if (phase > 1) {
        // wait 1.5 seconds before looping
        setTimeout(() => {
          start = 0.0;
        }, 1500);
      }

      // use the phase to get a point that is the appropriate distance along the route
      // this approach syncs the camera and route positions ensuring they move
      // at roughly equal rates even if they don't contain the same number of points
      const alongRoute = turf.along(
        turf.lineString(mekong.value),
        routeDistance * phase
      ).geometry.coordinates;

      const alongCamera = turf.along(
        turf.lineString(mekong.value),
        cameraRouteDistance * phase
      ).geometry.coordinates;

      const camera = map.getFreeCameraOptions();
      // set the position and altitude of the camera
      camera.position = mapboxgl.MercatorCoordinate.fromLngLat(
        {
          lng: alongCamera[0] - 0.005,
          lat: alongCamera[1] - 0.005
        },
        cameraAltitude
      );

      // tell the camera to look at a point along the route
      camera.lookAtPoint({
        lng: alongRoute[0],
        lat: alongRoute[1]
      });

      map.setFreeCameraOptions(camera);

      window.requestAnimationFrame(frame);
    }

    window.requestAnimationFrame(frame);
  });
  map.on('click', (e) => console.log(e.lngLat));
});

</script>

<template>
  <main id="map"></main>
</template>

<style scoped>
#map {
  height: 100vh;
  width: 100vw;
}
</style>