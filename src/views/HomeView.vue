<script setup lang="ts">
  import ChannelSidebar from "../components/ChannelSidebar.vue";
  import ChannelTopbar from "../components/ChannelTopbar.vue";
</script>

<template>
  <main>
    <div class="elements">
      <ChannelSidebar class="ChannelSidebar"/>
      <div class="middlePart">
        <ChannelTopbar channelName=""/>
        <div class="channelContent">
          <img class="chooseChannelSVG" src="../assets/chooseChannel.svg" alt="chooseChannel">
          <h2>Welcome to Strife, choose a channel to start !</h2>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
  .elements {
    display: flex;
    flex-direction: row;
  }

  .ChannelSidebar {
    flex: 1;
  }

  .middlePart {
    flex: 3;
  }

  .channelContent {
    padding: 2vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 84vh;
  }
  .chooseChannelSVG{
    width: 30%;
    display: flex;
  }
</style>