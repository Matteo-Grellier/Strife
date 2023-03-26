<script setup lang="ts">
    const props = defineProps<{
        channelName: string,
        channelImg: string
    }>();

    const channelImgClean = "/" + props.channelImg + ".png";
</script>

<template>
  <div class="chanelDiv">
    <RouterLink :to="props.channelName" class="chanelDiv">
        <img :src="channelImgClean" :alt="channelImgClean" :title="props.channelName" class="channelLogo"> 
        <h3 class="channelName" >{{ props.channelName }}</h3>
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
        text-decoration: none;
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
