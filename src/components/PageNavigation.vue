<template>
  <nav class="nav-links">
    <RouterLink class="nav-link" to="/auto">
      <div class="nav-link-text red">Auto</div>
      <div class="nav-link-text">One</div>
      <div class="nav-link-text">Map</div>
    </RouterLink>
    <RouterLink class="nav-link" to="/two-maps-scroll">
      <div class="nav-link-text red">Scroll</div>
      <div class="nav-link-text">Two</div>
      <div class="nav-link-text">Maps</div>
    </RouterLink>
    <RouterLink class="nav-link" to="/scroll">
      <div class="nav-link-text red">Scroll</div>
      <div class="nav-link-text">One</div>
      <div class="nav-link-text">Map</div>
    </RouterLink>
  </nav>
</template>

<script>
</script>

<style scoped>
.nav-links {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: .5rem;
  margin-top: .5rem;
}

.nav-link .red {
  color: #EC4E42;
}

.nav-link-text {
  color: #4b4b54;
  font-weight: 600;
}

.nav-link {
  line-height: 1.15rem;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 65px;
  height: 65px;
  border-radius: 3px;
  font-weight: 600;
  border: 3px solid #4b4b54;
}

.nav-link:hover .nav-link-text:not(.red) {
  color: #F9F9F9;
}

.nav-link:hover {
  background-color: #4b4b54;
}
</style>