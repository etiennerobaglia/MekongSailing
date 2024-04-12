<script setup>
import Map from './components/Map.vue'
import LoadingOverlay from './components/LoadingOverlay.vue'
import Slider2D from './components/Slider2D.vue'
import { ref } from 'vue'

const mapLoaded = ref(false)
const mapStyleLoaded = ref(false)
const sliderPosition = ref(null)
</script>

<template>
  <LoadingOverlay v-if="!mapLoaded && !mapStyleLoaded" />
  <main>
    <Map @mapLoaded="mapLoaded = true" @mapStyleLoaded="mapStyleLoaded = true" :sliderPosition=sliderPosition />
    <Slider2D @update:position="(newPosition) => sliderPosition = newPosition" />
  </main>
</template>

<style scoped></style>