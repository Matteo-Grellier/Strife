<script setup lang="ts">
    import LibraryAdd from "../assets/LibraryAdd.svg"
    import api from '@/boot/axios';
    import { useAuthStore } from '@/stores/auth-store'
    import { useChannelStore } from '@/stores/channel'
    import { onBeforeMount, ref } from 'vue';
    import ChannelLink from "./ChannelLink.vue";
    import Spinner from './Spinner.vue';
    import AddChannel from "./AddChannel.vue";
    import ModifyChannel from "./ModifyChannel.vue";
    import {useRoute, useRouter} from "vue-router";

    const route = useRoute();

    const channels = ref<Channel[]>([]);
    const isLoaded = ref(false);
    const authToken = useAuthStore().getToken();
    const config = {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    };

    onBeforeMount(async () => {
        await getChannels();
        isLoaded.value = true
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

    interface User {
        name: string;
        id: number;
        isAdmin: boolean;
    };

    interface ChannelLink {
        name: string;
        img: string;
        id: number;
        creator: string;
        users: User[];
    };

    const channelStore = useChannelStore();

    // function selectedChannel(channel:ChannelLink) {
    //     channelStore.selectedChannel(channel);
    // }

    var isCreatingNewChannel = ref(false);
    function changeAddChannelState() {        
        isCreatingNewChannel.value = !isCreatingNewChannel.value;
        console.log(isCreatingNewChannel.value);
    }

    onBeforeMount(async () => {
        channels.value = channelStore.channels;
        console.log(channels);
        const channelId = route.params.channelId;

        isLoaded.value = true

        if(!channelId) return;

        channelStore.setSelectedChannel(channelId as string)
    })
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
                <div v-if="channels.length > 0">
                    <ul class="channelList" v-if="isLoaded">
                        <li >
                            <ChannelLink v-for="channel in channels" 
                            :key="channel.id" 
                            :channelName="channel.name" 
                            :channelImg="channel.img" 
                            :channelId="channel.id"/>
                        </li>
                    </ul>
                </div>
                <div v-else>
                    <h1>Pas de channels</h1>
                </div>
            </div>
            <div class="fakeshadow"></div>
        </div>
        <button id="buttonPlus" @click="changeAddChannelState()">
            <img :src="LibraryAdd" alt="LibraryAdd" class="libraryAdd"> 
            <h3>New channel</h3>
        </button>
    </div>
    <AddChannel v-if="isCreatingNewChannel" class="addChannelDiv"/>
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
        max-height: 70vh;
        overflow-y: auto;
        overflow-x: hidden;
    }

    .channelList::-webkit-scrollbar {
        width: 8px;
    }
    .channelList::-webkit-scrollbar-track {
        background: var(--color-main-blue);
    }
    .channelList::-webkit-scrollbar-thumb {
        background-color: var(--color-light-blue);
        border-radius: 20px;
    }

    .separator {
        margin-top: 20px;
        margin-bottom: 30px;
    }

    .addChannelDiv {
        position: absolute;
        top: 40vh;
        left: 15vh;
    }

    .channelListContainer {
        /* overflow-y: scroll; */
    }

    .fakeshadow {
        background: linear-gradient(#00000000, #1f2630);
        height: 2vh;
    }
</style>
