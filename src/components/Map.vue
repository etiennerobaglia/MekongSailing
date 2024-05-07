<template>
  <div class="map-wrapper">
    <div :class="'map-' + props.mapType" :id="'map-' + props.mapType" :ref="mapType"></div>
  </div>
  <div class="contents" id="scrollTarget" ref="scrollTarget">
    <div class="wrapper"></div>
  </div>
</template>

<script setup>
import mapboxgl from 'mapbox-gl'
import mekongLine from '../../mekong-line-scroll.json'
import "mapbox-gl/dist/mapbox-gl.css";
import { onMounted, ref, watch } from 'vue'
import * as turf from '@turf/turf'

const props = defineProps(['sliderPosition', 'mapType'])
const emit = defineEmits(['mapLoaded', 'mapStyleLoaded'])

const mapPromise = ref()
const mekong = ref(mekongLine.features[0].geometry.coordinates)
const scrollTarget = ref(null)
const y = ref(0)
const rate = ref(0)
const cameraAltitude = ref(2500);
const routeLength = ref(turf.length(turf.lineString(mekong.value)));
const cameraRouteLength = ref(turf.length(turf.lineString(mekong.value)));
const alongRoute = ref(0)
const alongCamera = ref(0)
const pitch = ref(0.0015)
const scrollTargetHeight = ref(null)

const updateScroll = () => {
  y.value =
    window.scrollX !== undefined
      ? window.scrollY
      : ((document.compatMode || "") === "CSS1Compat")
        ? document.documentElement.scrollTop
        : document.body.scrollTop;
  rate.value = y.value / scrollTarget.value.offsetHeight;
  alongCamera.value = turf.along(
    turf.lineString(mekong.value),
    cameraRouteLength.value * rate.value
  ).geometry.coordinates

  alongRoute.value = turf.along(
    turf.lineString(mekong.value),
    routeLength.value * (rate.value + pitch.value)
  ).geometry.coordinates
};

onMounted(async () => {
  scrollTargetHeight.value = scrollTarget.value.offsetHeight
  updateScroll();
  window.addEventListener('scroll', updateScroll);

  // map setup
  mapboxgl.accessToken = "pk.eyJ1IjoiZXRyb2JhIiwiYSI6ImNsaDR1M3RtYTIxNDgzY29nYjk0azF3eG8ifQ.cf9iT5VHX-AR-QzHwHVLVQ"
  const map = new mapboxgl.Map({
    container: 'map-' + props.mapType,
    style: props.mapType == "border-map-white" ? 'mapbox://styles/mapbox/light-v11' : 'mapbox://styles/mapbox/satellite-v9',
    bounds: [
      [100.6054, 20.1209],
      [100.0298, 20.4225]
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
        'line-color': '#80979F',
        'line-width': 3
      },
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      }
    });

    if (props.mapType.includes("border-map")) {
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
          'raster-opacity': props.mapType == "border-map-alone" ? .7 : 1,
        }
      });
    }

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
    mapPromise.value = Promise.resolve(map);

    function frame() {
      ticking = false;

      const camera = map.getFreeCameraOptions();

      // set the position and altitude of the camera
      camera.position = mapboxgl.MercatorCoordinate.fromLngLat(
        {
          lng: alongCamera.value[0],
          lat: alongCamera.value[1]
        },
        cameraAltitude.value
      );
      // tell the camera to look at a point along the route
      camera.lookAtPoint({
        lng: alongRoute.value[0],
        lat: alongRoute.value[1]
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
    // Handle Slider
    watch(() => props.sliderPosition, (slider, oldVal) => {
      if (slider) {
        scrollTargetHeight.value = scrollTarget.value.offsetHeight
        cameraAltitude.value = slider.y * 5000
        pitch.value = slider.x * 0.003
        updateScroll()
        requestAnimationFrame(frame);
      }
    }, { deep: true });
  });
});
</script>

<style scoped>
.map-wrapper {
  position: fixed;
  margin: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.map-border-map-alone {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100vh;
}

.map-satellite {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 50%;
  height: 100vh;
}

.map-border-map-white {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 50%;
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

@media only screen and (max-width: 700px) {
  .map-satellite {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50vh;
  }

  .map-border-map-white {
    position: absolute;
    top: 50vh;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50vh;
  }
}
</style>