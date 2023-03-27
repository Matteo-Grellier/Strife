<script setup lang="ts">
    const props = defineProps<{
        channelName: string
    }>();
</script>

<template>
  <div class="ChannelTopbar">
    <h1 class="ChannelName">{{channelName}}</h1>
  </div>
  <div class="fakeShadow"/>
</template>

<style scoped>
  .ChannelTopbar {
    background-color: var(--color-dark-blue);
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    /* box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.334); */
  }

  .ChannelName {
    margin: 0;
    font-size: 20px;
  }

  .fakeShadow {
    background: linear-gradient(#1f2630ae, #00000000);
    height: 2vh;
  }
</style>
