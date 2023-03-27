<script setup lang="ts">
    import GroupAdd from "../assets/groupAdd.svg"
    import User from "./User.vue"
    import Spinner from './Spinner.vue';
    import api from '@/boot/axios';
    import { useAuthStore } from '@/stores/auth-store'
    import { onBeforeMount, ref } from 'vue';

    const isLoaded = ref(false);

    const authToken = useAuthStore().getToken();
    const config = {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    };

    const ppl1 = "Chirac_le_sang";
    const ppl2 = "Xx_Sarkozy_xX"
    const ppl3 = "Holland-BEYOU-47"
    interface User {
        name: string;
        id: number;
        isAdmin: boolean;
    }
    const users = ref<User[]>([ { name: "Chirac_le_sang", id: 1, isAdmin: true}, { name: "Xx_Sarkozy_xX", id: 2, isAdmin: false}, { name: "Holland-BEYOU-47", id: 3, isAdmin: false} ]);

    onBeforeMount(async () => {
        await getUsers();
        isLoaded.value = true;
    })
    const getUsers = async () => {
        await api.get('/protected/user/channels', config)
        .then(function(response){
            users.value = response.data;
        })
        .catch(function(error) {
            console.log('Error:', error);
        });
    }

    function ClickOnUser(user:User) {
        console.log("click on user : " + user.name + "#" + user.id);
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
        <div v-if="!isLoaded" class="ChannelLink-spinner">
            <Spinner/>
        </div>
        <ul class="memberList" v-if="isLoaded">
            <li >
                <User @click="ClickOnUser(user)" v-for="user in users" :key="user.id" :username="user.name" :is-admin="user.isAdmin"/>
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
        width: 200px;
        padding: 0;
    }

    .separator {
        margin-top: 10px;
        margin-bottom: 10px;
        width: 100%;
    }
</style>
