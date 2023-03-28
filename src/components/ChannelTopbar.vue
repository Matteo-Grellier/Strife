<script setup lang="ts">
  import { ref } from 'vue';
  import { useChannelStore } from '@/stores/channel'
  import ModifyChannel from "./ModifyChannel.vue";


  const props = defineProps<{
    channelName: string
  }>();

  const channelStore = useChannelStore();
  const currentUser = localStorage.getItem('username');

  const IsAdmin = () => {
    return ( currentUser == channelStore.getSelectedChannel().creator );
  }

  var showModifyChannel = ref(false)
  const ChangeShowModifyValue = () => {
    showModifyChannel.value = !showModifyChannel.value;
  }

</script>

<template>
  <div class="ChannelTopbar">
    <h1 class="ChannelName">{{channelName}}</h1>
    <button @click="ChangeShowModifyValue()" v-if="IsAdmin()" class="config-btn"> ⚙️ </button>
  </div>
  <div class="fakeShadow"/>
  <ModifyChannel v-if="showModifyChannel" class="modifyDiv" :actual-channel-name="channelName" :actual-channel-img="channelStore.getSelectedChannel().img"/>
</template>

<style scoped>
  .ChannelTopbar {
    background-color: var(--color-dark-blue);
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    /* box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.334); */
  }

  .ChannelName {
    margin: 0;
    font-size: 20px;
  }

  .fakeShadow {
    background: linear-gradient(#1f2630ae, #00000000);
    height: 2vh;
  }

  .config-btn {
    background-color: #00000000;
    font-size: 25px;
    height: 35px;
    width: 35px;
    margin-left: 5px;
    padding: 0;
    text-align: center;
  }
  .config-btn:hover {
    background-color: var(--color-light-blue);
  }

  .modifyDiv {
    position: absolute;
    top: 1vh;
    left: 65vh;
  } 
</style>
