<script setup lang="ts">
  import ChannelSidebar from "../components/ChannelSidebar.vue";
  import ChannelTopbar from "../components/ChannelTopbar.vue";
  import ChannelContent from "@/components/ChannelContent.vue";
  import MemberSidebar from "../components/MemberSidebar.vue";
  import MessageTextArea from "../components/MessageTextArea.vue";
</script>

<template>
  <main>
    <div class="elements">
      <ChannelSidebar class="ChannelSidebar"/>
      <div class="middlePart">
        <ChannelTopbar channelName="test channel name"/>
        <ChannelContent :channelId="1" creator="m.leger"/>
        <MessageTextArea/>
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
    display: flex;
    flex-direction: column;
    flex: 3;
    height: 100vh;
  }

  .MembersSidebar {
    flex: 1;
  }
</style>