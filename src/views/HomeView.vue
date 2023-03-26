<script setup lang="ts">
  import ChannelSidebar from "../components/ChannelSidebar.vue";
  import ChannelTopbar from "../components/ChannelTopbar.vue";
  import MemberSidebar from "../components/MemberSidebar.vue";
</script>

<template>
  <main>
    <div class="elements">
      <ChannelSidebar class="ChannelSidebar"/>
      <div class="middlePart">
        <ChannelTopbar channelName="test channel name"/>
        <div class="channelContent">
          home
        </div>
      </div>
      <MemberSidebar/>
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
    padding: 2%;
  }

  .MembersSidebar {
    flex: 1;
  }
</style>