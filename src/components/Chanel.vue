<script setup lang="ts">
    const props = defineProps<{
        serverName: string,
        serverImg: string
    }>();

    const serverRoute = "/" + props.serverName ;
    const serverImgClean = "/" + props.serverImg ;
</script>

<template>
  <div class="chanelDiv">
    <RouterLink :to="serverRoute">
        <img :src="serverImgClean" :alt="serverImgClean" class="StrifeLogo"> 
        <p>{{ serverName }}</p>
    </RouterLink>
  </div>
</template>

<style scoped>
    .chanelDiv{
        display: flex;
        flex-direction: row;
    }
</style>
