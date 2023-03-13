<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import Login from './views/LoginView.vue'
</script>

<template>
  <header>
    <h1>Strife is life ! Strife, say goodbye to your wife !</h1>
    <p>(for the sake of the rhyme, every user, male or female, is advised to have a wife)</p>
    <nav>
      <RouterLink to="/login">Login</RouterLink>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/ff">random</RouterLink>
      <router-link :to="{ name: 'createChannel'}"> Create Channel </router-link>

    </nav> 
  </header>

  <main>
    <router-link :to="{ name: 'login'}"></router-link>
    <RouterView/>
  </main>
</template>

<style scoped>
</style>