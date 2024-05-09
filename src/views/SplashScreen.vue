<script setup>
import PageNavigation from '../components/PageNavigation.vue'
import SiteLogo from '../components/SiteLogo.vue'
import { ref } from 'vue'
</script>

<template>
  <div class="overlay">
    <div class="header">
      <div class="title-container">
        <div>
          <SiteLogo />
          <PageNavigation />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  margin-top: 6dvh;
}

.overlay {
  background: #F9F9F9;
  position: fixed;
  height: 100dvh;
  width: 100dvw;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  z-index: 1;
  flex-direction: column;
  color: #4b4b54;
}

.overlay .header {
  flex-direction: column;
  align-items: center;
}
</style>