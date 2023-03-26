<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import Login from './views/LoginView.vue'
</script>

<template>
  <main>
    <router-link :to="{ name: 'login'}"></router-link>
    <RouterView/>
  </main>
</template>

<style scoped>
</style>