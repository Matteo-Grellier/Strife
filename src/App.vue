<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import Login from './views/LoginView.vue'
</script>

<template>
  <main>
    <router-link :to="{ name: 'login'}"></router-link>
    <RouterView name="ChannelSidebar" class="ChannelSidebar"></RouterView>
    <RouterView class="middlePart"/>
    <RouterView name="MemberSidebar" class="MembersSidebar"></RouterView>
  </main>
</template>

<style scoped>
  main {
    display: flex;
    flex-direction: row;
  }

  .ChannelSidebar {
    flex: 1;
  }

  .middlePart {
    display: flex;
    flex-direction: column;
    flex: 3;
    height: 100vh;
  }

  .MembersSidebar {
    flex: 1;
  }
</style>