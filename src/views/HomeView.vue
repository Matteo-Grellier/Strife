<script setup lang="ts">
  import ChannelSidebar from "../components/ChannelSidebar.vue";
  import ChannelTopbar from "../components/ChannelTopbar.vue";
</script>

<template>
  <main>
    <div class="elements">
      <ChannelSidebar class="ChannelSidebar"/>
      <div class="innerContent">
        <ChannelTopbar channelName="test channel name"/>
        home
      </div>
      <p class="MembersSidebar">members bar</p>
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

  .innerContent {
    flex: 3;
  }

  .MembersSidebar {
    flex: 1;
  }
</style>