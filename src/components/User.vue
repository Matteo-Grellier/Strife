<script setup lang="ts">
  import IconDelete from './icons/IconDelete.vue';
  import { ref } from 'vue';
  import { useChannelStore } from '@/stores/channel'
  import api from '@/boot/axios';
  import { useAuthStore } from '@/stores/auth-store';

  const props = defineProps<{
    username: string,
    isAdmin: boolean,
  }>();

  var textClass = "usernameClass";

  if (props.isAdmin == true) 
  {
    textClass =  "adminUsernameClass";
  }
  
  const channelStore = useChannelStore();
  const currentUser = localStorage.getItem('username');
  const IsAdmin = () => {
    return ( currentUser == channelStore.getSelectedChannel().creator );
  }

  const JWT = useAuthStore().getToken();
  const config = {
    headers: {
      Authorization: `Bearer ${JWT}`
    }
  };

  const selectedChannelId = ref(channelStore.getSelectedChannel().id);

  const BanUser = (username:string) => {
    api.delete('/protected/channel/' + selectedChannelId.value + '/user/' + username, config)
    .then(function (response) {
      console.log(response);
      window.location.reload()
    })
    .catch(function (error) {
      console.log(error);
    });
  }
</script>

<template>
  <div class="userDiv">
    <h3 :class="textClass" >{{ isAdmin ? username + "  ✨" : username}}</h3>
    <button v-if="!props.isAdmin && IsAdmin()" class="delete-btn">
      <IconDelete @click="BanUser(username)"/>
    </button>
  </div>
</template>

<style scoped>
  .userDiv{
    display: flex;
    flex-direction: row;
    background-color: #1F2630;
    width: 170px;
    height: 50px;
    border-radius: 10px;
    margin-bottom: 10px;
    margin-top: 10px;
    align-items: center;
    justify-content: space-between;
    padding-left: 2px;
    cursor: pointer;

  }

  .userDiv:hover {
    background-color: #2B3542;
  }

  .usernameClass {
    margin: 0px;
    margin-left: 10px;
  }
  .adminUsernameClass {
    margin: 0px;
    margin-left: 10px;
    color: var(--color-yellow);
  }

  .channelLogo {
    height: 50px;
    width: 50px;
  }

  .delete-btn {
    background-color: #00000000;
    height: 35px;
    width: 35px;
    margin-right: 5px;
  }
  .delete-btn:hover {
    background-color: var(--color-light-blue);
  }

  svg {
    fill: var(--color-red);
  }
</style>
