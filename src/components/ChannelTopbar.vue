<script setup lang="ts">
    const props = defineProps<{
        channelName: string
    }>();
</script>

<template>
  <div class="ChannelTopbar">
    <h1 class="ChannelName">{{channelName}}</h1>
  </div>
</template>

<style scoped>
  .ChannelTopbar {
    background-color: var(--color-dark-blue);
    height: 30px;
  }

  .ChannelName {
    margin: 0;
  }
</style>
