<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <h1>Strife is life ! Strife, say goodbye to your wife !</h1>
    <p>(for the sake of the rhyme, every user, male or female, is advised to have a wife)</p>
    <nav>
      <RouterLink to="/login">Login</RouterLink>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/ff">random</RouterLink>
    </nav> 
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
</style>