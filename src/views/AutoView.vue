<script setup>
import MapAuto from '../components/MapAuto.vue'
import LoadingOverlay from '../components/LoadingOverlay.vue'
import { ref } from 'vue'

const mapLoaded = ref(false)
</script>

<template>
  <LoadingOverlay v-if="true" />
  <main>
    <MapAuto @mapLoaded="mapLoaded = true" />
  </main>
</template>

<style scoped></style>