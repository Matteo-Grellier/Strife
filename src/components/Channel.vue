<script setup lang="ts">
    const props = defineProps<{
        channelName: string,
        channelImg: string
    }>();

    const channelName = "/" + props.channelName ;
    const channelImgClean = "/" + props.channelImg + ".png";
</script>

<template>
  <div class="chanelDiv">
    <RouterLink :to="channelName" class="chanelDiv">
        <img :src="channelImgClean" :alt="channelImgClean" :title="channelName" class="channelLogo"> 
        <p class="channelName" >{{ channelName }}</p>
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
