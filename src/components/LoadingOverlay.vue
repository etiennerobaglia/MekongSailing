<template>
  <div class="overlay">
    <div class="header">
      <div class="title-container">
        <div class="loader"></div>
        <div class="title-text">
          Mekong<br>
          <a class="credit" href="https://etienne.robaglia.fr">
            etienne.robaglia.fr
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';


export default defineComponent({
  props: {
    mapLoaded: Boolean,
  }
});
</script>

<style scoped>
.overlay {
  background: white;
  position: fixed;
  height: 100dvh;
  width: 100dvw;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  z-index: 1;
  flex-direction: column;
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
  border-top: 1.1em solid #dd2a123b;
  border-right: 1.1em solid #dd2a123b;
  border-bottom: 1.1em solid #dd2a123b;
  border-left: 1.1em solid #DD2A12;
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