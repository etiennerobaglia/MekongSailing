<script setup>
import Map from './components/Map.vue'
import LoadingOverlay from './components/LoadingOverlay.vue'
import { ref } from 'vue'

const mapLoaded = ref(false)
const mapStyleLoaded = ref(false)
</script>

<template>
  <LoadingOverlay v-if="!mapLoaded && !mapStyleLoaded" />
  <Map @mapLoaded="mapLoaded = true" @mapStyleLoaded="mapStyleLoaded = true" />
</template>

<style scoped></style>
