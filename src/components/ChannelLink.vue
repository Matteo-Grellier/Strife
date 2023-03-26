<script setup lang="ts">
    const props = defineProps<{
        channelName: string,
        channelImg: string
    }>();
</script>

<template >
  <div class="chanelDiv">
    <RouterLink :to="channelName" class="chanelDiv">
        <img :src="channelImg" alt="imgNotFound" :title="channelName" class="channelLogo"> 
        <p class="channelName" >{{ channelName }}</p>
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
        margin-bottom: 10px;
    }

    .channelName {
        margin: 0px;
        margin-left: 10px;
        display: flex;
        align-items: center;
    }

    .channelLogo {
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 15px;
    }
</style>
