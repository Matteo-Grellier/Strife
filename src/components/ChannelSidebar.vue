<script setup lang="ts">
    import LibraryAdd from "../assets/LibraryAdd.svg"
    import api from '@/boot/axios';
    import { useAuthStore } from '@/stores/auth-store'
    import ChannelLink from "./ChannelLink.vue";
    import { onBeforeMount, ref } from 'vue';
    import Spinner from './Spinner.vue';
    import { useChannelStore } from '@/stores/channel'
    import AddChannel from "./AddChannel.vue";

    const channels = ref<ChannelLink[]>([]);
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
    interface ChannelLink {
        name: string;
        img: string;
        id: number;
        creator: string;
    }

    const channelStore = useChannelStore();

    function selectedChannel(channel:ChannelLink){
        channelStore.selectedChannel(channel)
    }

    var isCreatingNewChannel = ref(false);
    function changeAddChannelState() {        
        isCreatingNewChannel.value = !isCreatingNewChannel.value;
        console.log(isCreatingNewChannel.value);
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
                <div v-if="channels.length > 0">
                    <ul class="channelList" v-if="isLoaded">
                        <li >
                            <ChannelLink @click="selectedChannel(channel)" v-for="channel in channels" :key="channel.id" :channelName="channel.name" :channelImg="channel.img"/>
                        </li>
                    </ul>
                </div>
                <div v-else>
                    <h1>Pas de channels</h1>
                </div>
            
            </div>
        </div>
        <button id="buttonPlus" @click="changeAddChannelState()">
            <img :src="LibraryAdd" alt="LibraryAdd" class="libraryAdd"> 
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
    }

    .separator {
        margin-top: 20px;
        margin-bottom: 30px;
    }

    .addChannelDiv {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>
