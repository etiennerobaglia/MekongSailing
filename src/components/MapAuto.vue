<script setup>
import mapboxgl from 'mapbox-gl'
import mekongLine from '../../mekong-line-auto.json'
import "mapbox-gl/dist/mapbox-gl.css";
import { onMounted, ref } from 'vue'
import * as turf from '@turf/turf'

const mekong = ref(mekongLine.features[0].geometry.coordinates)
const emit = defineEmits(['mapLoaded'])

onMounted(async () => {
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
        'raster-opacity': .55
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
    emit('mapLoaded')
    console.log('mapLoaded')
  });
});

</script>

<template>
  <main id="map"></main>
</template>

<style scoped>
#map {
  width: 100%;
  height: 100vh;
}
</style>