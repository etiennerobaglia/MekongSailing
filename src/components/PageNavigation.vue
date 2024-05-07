<template>
  <nav class="nav-links">
    <div class="nav-link">
      <RouterLink to="/auto">Auto <br>Map</RouterLink>
    </div>
    <div class="nav-link">
      <RouterLink to="/two-maps-scroll">Two <br>Maps<br>Scroll</RouterLink>
    </div>
    <div class="nav-link">
      <RouterLink to="/scroll">One<br>Map<br>Scroll</RouterLink>
    </div>
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

.nav-link a {
  line-height: 1.15rem;
  color: #EC4E42;
  text-decoration: none;
  font-weight: 600;
}

.nav-link {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 3px;
  font-weight: 600;
  border: 3px solid #4b4b54;
  color: #4b4b54;
}

.nav-link:hover {
  background-color: #4b4b54;
}
</style>