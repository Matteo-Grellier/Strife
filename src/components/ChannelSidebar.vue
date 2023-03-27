<script setup lang="ts">
    import LibraryAdd from "../assets/LibraryAdd.svg"
    import api from '@/boot/axios';
    import { useAuthStore } from '@/stores/auth-store'
    import ChannelLink from "./ChannelLink.vue";
    import { onBeforeMount, ref } from 'vue';
    import Spinner from './Spinner.vue';
    import { useChannelStore } from '@/stores/channel'
    import {useRoute, useRouter} from "vue-router";

    const route = useRoute();
    const channelStore = useChannelStore();

    const channels = ref<Channel[]>([]);
    const isLoaded = ref(false);
    const authToken = useAuthStore().getToken();
    const config = {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    };

    onBeforeMount(async () => {
        // await getChannels();
        channels.value = channelStore.channels;
        console.log(channels);
        const channelId = route.params.channelId;

        isLoaded.value = true

        if(!channelId) return;

        channelStore.setSelectedChannel(channelId as string)
    })
    const getChannels = async () => {
        await api.get('/protected/user/channels', config)
        .then(function(response){
            channels.value = response.data;
        })
        .catch(function(error) {
            console.log('Error:', error);
        });
    }

    function selectedChannel(id: number){
        // channelStore.setSelectedChannel(id.toString())
    }
</script>

<template>
  <div class="ChannelSidebar">
    <div class="upperDiv">
        <RouterLink to="/"> 
            <img src="/logo-text.png" alt="STIFE" class="StrifeLogo"> 
        </RouterLink>
        <hr class="separator"/>
        <div v-if="!isLoaded" class="ChannelLink-spinner">
            <Spinner/>
        </div>
        <div class="channelListContainer">
        <ul class="channelList" v-if="isLoaded">
            <li >
                <ChannelLink @click="() => selectedChannel(channel.id)" v-for="channel in channels" 
                :key="channel.id" 
                :channelName="channel.name" 
                :channelImg="channel.img" 
                :channelId="channel.id"/>
            </li>
        </ul>
    </div>
    </div>
    
    
    <button id="buttonPlus">
        <img :src="LibraryAdd" alt="LibraryAdd" class="libraryAdd"> 
    </button>
  </div>
</template>

<style scoped>
    .ChannelSidebar{
        flex-direction: column;
        max-width: 188px;
        background-color: var(--color-dark-blue);
        height: 100vh;
        padding-left: 2%;
        padding-right: 2%;
    }

    .upperDiv {
        height: 90vh;
    }

    .buttonPlus{
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .StrifeLogo{
        width: 100%;
        margin-top: 20px;
    }

    .libraryAdd{
        width: 35px;
        margin-right: 0;
    }

    .channelList {
        list-style-type: none;
        width: 200px;
        padding: 0;
    }

    .separator {
        margin-top: 20px;
        margin-bottom: 30px;
    }
</style>
