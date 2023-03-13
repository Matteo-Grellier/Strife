<script setup lang="ts">
    const props = defineProps<{
        serverName: string,
        serverImg: string
    }>();

    const serverRoute = "/" + props.serverName ;
    const serverImgClean = "/" + props.serverImg + ".png";
</script>

<template>
  <div class="chanelDiv">
    <RouterLink :to="serverRoute" class="chanelDiv">
        <img :src="serverImgClean" :alt="serverImgClean" :title="serverName" class="channelLogo"> 
        <p class="channelName" >{{ serverName }}</p>
    </RouterLink>
  </div>
</template>

<style scoped>
    .chanelDiv{
        display: flex;
        flex-direction: row;
    }

    .channelName {
        margin: 0px;
        margin-left: 10px;
    }

    .channelLogo {
        height: 50px;
        width: 50px;
    }
</style>
