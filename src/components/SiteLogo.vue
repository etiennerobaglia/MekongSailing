<template>
  <div class="title-text">
    <span class="title-text-name">Mekong <span class="sailing">Sailing</span></span>
    <a class="credit" href="https://etienne.robaglia.fr">
      etienne.robaglia.fr
    </a>
  </div>
</template>

<script>
</script>

<style scoped>
.title-text {
  font-weight: 600;
  font-size: 1.3rem;
  display: flex;
  flex-direction: column;
}

.title-text-name {
  font-weight: 600;
}

.title-text .sailing {
  color: #EC4E42;
  font-weight: 600;
  font-size: 1.3rem;
}

.credit {
  font-size: .95rem;
  position: relative;
  right: 0;
  left: 0;
  color: #4b4b54;
  font-weight: 500;
  text-decoration: none;
}

.credit:hover {
  text-decoration: underline;
}
</style>