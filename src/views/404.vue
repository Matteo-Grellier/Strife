<template>
  <div class="flex-container">
    <div class="row">
      <h1 class="title">404</h1>
      <h1 class="description">PAGE NOT FOUND</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.flex-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #3D4B5F;
}

.row {
  width: auto;
}

.title {
  display: flex;
  color: red;
  font-size: 7em;
  justify-content: center;
}
</style>