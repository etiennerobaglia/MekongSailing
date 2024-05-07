<script setup>
import LoadingOverlay from '../components/LoadingOverlay.vue'
import PageNavigation from '../components/PageNavigation.vue'
import { ref } from 'vue'

const mapLoaded = ref(false)
const mapStyleLoaded = ref(false)
const sliderPosition = ref(null)
</script>

<template>
  <div class="overlay">
    <div class="header">
      <div class="title-container">
        <div v-if="false" class="loader"></div>
        <div>
          <div class="title-text">
            Mekong Sailing<br>
            <a class="credit" href="https://etienne.robaglia.fr">
              etienne.robaglia.fr
            </a>
          </div>
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

.title-text {
  font-weight: 600;
  font-size: 1.3rem;
  display: flex;
  flex-direction: column;
}

.title-logo {
  border-radius: 100%;
  width: 4rem;
  height: 4rem;
  margin-right: 8%;
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

.overlay .credit {
  font-size: .95rem;
  position: relative;
  right: 0;
  left: 0;
  color: #4b4b54
}

.credit {
  font-size: .65rem;
  text-decoration: none;
  line-height: 2dvh;
  position: fixed;
  bottom: 0;
  right: 2dvh;
  font-weight: 500;
}

.credit:hover {
  text-decoration: underline;
}

/* LOADER */
.loader,
.loader:after {
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
}

.loader {
  margin-right: 2rem;
  font-size: 8px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid #EC4E423b;
  border-right: 1.1em solid #EC4E423b;
  border-bottom: 1.1em solid #EC4E423b;
  border-left: 1.1em solid #EC4E42;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}

.hide {
  transition: .65s ease;
  opacity: 0;
  visibility: hidden;
}

@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

/* end LOADER */
</style>