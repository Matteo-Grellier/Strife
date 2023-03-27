<script setup lang="ts">
  import ChannelSidebar from "../components/ChannelSidebar.vue";
  import ChannelTopbar from "../components/ChannelTopbar.vue";
</script>

<template>
  <div class="channelContent">
    <img class="chooseChannelSVG" src="../assets/chooseChannel.svg" alt="chooseChannel">
    <h2>Welcome to Strife, choose a channel to start !</h2>
  </div>
</template>

<style scoped>
  .elements {
    display: flex;
    flex-direction: row;
  }

  .channelContent {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  .chooseChannelSVG{
    width: 30%;
    display: flex;
  }
</style>