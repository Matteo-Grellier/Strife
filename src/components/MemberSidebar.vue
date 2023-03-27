<script setup lang="ts">
    import GroupAdd from "../assets/groupAdd.svg"
    import User from "./User.vue"
    import api from '@/boot/axios';
    import { useAuthStore } from '@/stores/auth-store'
    import { onBeforeMount, ref } from 'vue';
    import { useChannelStore } from '@/stores/channel'

    const authToken = useAuthStore().getToken();
    const config = {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    };

    const channelStore = useChannelStore();
    // const ppl1 = "Chirac_le_sang";
    // const ppl2 = "Xx_Sarkozy_xX"
    // const ppl3 = "Holland-BEYOU-47"
    // const users = ref<User[]>([ { name: "Chirac_le_sang", id: 1, isAdmin: true}, { name: "Xx_Sarkozy_xX", id: 2, isAdmin: false}, { name: "Holland-BEYOU-47", id: 3, isAdmin: false} ]);
    const users = channelStore.getSelectedChannel().users;

    const IsAdmin = (user:string) => {
        console.log(user);
        
        if (channelStore.getSelectedChannel().creator == user) {
            return true;
        } else {
            return false;
        }
    }

    function ClickOnUser(user:string) {
        console.log("click on user : " + user);
        console.log("users : " + channelStore.selectedChannel.users);
        
    }

    function AddUserClick() {
        console.log("add user ");
    }

</script>

<template>
  <div class="memberSidebar">
    <div class="upperDiv">
        <h3 class="title"> Utilisateurs </h3>
        <hr class="separator"/>
        <ul class="memberList">
            <li>
                <User @click="ClickOnUser(user)" v-for="user, index in channelStore.selectedChannel.users" :key="index" :username="user" :is-admin="IsAdmin(user)" class="user"/>
            </li>
        </ul>
    </div>
    <button class="buttonPlus" @click="AddUserClick()">
        <img :src="GroupAdd" alt="LibraryAdd" class="libraryAdd"> 
        <h3> Add user </h3>
    </button>
  </div>
</template>

<style scoped>
    .memberSidebar{
        flex-direction: column;
        max-width: 188px;
        background-color: var(--color-dark-blue);
        height: 100vh;
        padding-left: 2%;
        padding-right: 2%;
        display: flex;
        justify-content: center;
    }

    .upperDiv {
        height: 90vh;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .buttonPlus{
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--color-light-blue);
        color: white;
    }

    .libraryAdd{
        width: 35px;
        margin-right: 20px;
        color: white;
    }

    .memberList {
        list-style-type: none;
        width: 188px;
        padding: 0;
        max-height: 70vh;
        overflow-y: auto;
        overflow-x: hidden;
    }
    .memberList::-webkit-scrollbar {
        width: 8px;
    }
    .memberList::-webkit-scrollbar-track {
        background: var(--color-main-blue);
    }
    .memberList::-webkit-scrollbar-thumb {
        background-color: var(--color-light-blue);
        border-radius: 20px;
    }

    .separator {
        margin-top: 10px;
        margin-bottom: 10px;
        width: 100%;
    }
</style>
