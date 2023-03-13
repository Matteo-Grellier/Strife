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
        background-color: #1F2630;
        width: 200px;
        height: 60px;
        border-radius: 10px;
        margin-bottom: 10px;
        margin-top: 10px;
        align-items: center;
        padding-left: 2px;
    }

    .chanelDiv:hover {
        background-color: #2B3542;
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
