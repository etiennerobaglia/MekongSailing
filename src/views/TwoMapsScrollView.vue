<script setup>
import Map from '../components/Map.vue'
import LoadingOverlay from '../components/LoadingOverlay.vue'
import Slider2D from '../components/Slider2D.vue'
import { ref } from 'vue'

const mapLoaded = ref(false)
const mapStyleLoaded = ref(false)
const sliderPosition = ref(null)
</script>

<template>
  <LoadingOverlay v-if="!mapLoaded && !mapStyleLoaded" />
  <main>
    <section class="half-screen-map satellite">
      <Map @mapLoaded="mapLoaded = true" @mapStyleLoaded="mapStyleLoaded = true" :sliderPosition=sliderPosition
        :mapType="'satellite'" />
    </section>
    <section class="half-screen-map border-map">
      <Map @mapLoaded="mapLoaded = true" @mapStyleLoaded="mapStyleLoaded = true" :sliderPosition=sliderPosition
        :mapType="'border-map-white'" />
    </section>
    <Slider2D @update:position="(newPosition) => sliderPosition = newPosition" />
  </main>
</template>

<style scoped>
main {
  width: 100%;
}

section {
  width: 50%;
}
</style>