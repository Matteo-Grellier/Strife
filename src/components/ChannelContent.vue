<script lang="ts" setup>
import api, {webSocketApi} from '@/boot/axios';
import { onBeforeMount, reactive, onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores/auth-store';

import Message from './Message.vue';
import Spinner from './Spinner.vue';
import Button from './Button.vue';

const authStore = useAuthStore();

type Props = {
    channelId: number,
    creator: string,
}

const props = defineProps<Props>();

const messages: Message[] = reactive([])
const isLoaded = ref(false);
const currentUserIsModerator = ref(false);

onBeforeMount(async () => {
    await setMessages();
    isLoaded.value = true
    console.log(props.creator, authStore.username)
    currentUserIsModerator.value = (props.creator === authStore.username);

    await createWebSocketConnection();
})

const createWebSocketConnection = async () => {
    webSocketApi.get(`/ws/channel/${props.channelId}/token/${authStore.token}`)
}

const setMessages = async () => {
    const messagesToAdd = await getMessagesFromApi();
    messages.unshift(...messagesToAdd);
}

const getMessagesFromApi = async () => {
    const offset = messages.length;

    const config = {
        headers: { Authorization: `Bearer ${authStore.getToken()}` }
    };
    const response = await api.get(`/protected/channel/${props.channelId}/messages/${offset}`, config)

    return response.data;
}

const loadOlderMessages = async () => {
    isLoaded.value = false
    await setMessages();
    isLoaded.value = true
}

const onScroll = async ({target}: Event) => {
    const currentElement: Element = target as Element

    //The logic to know if we are at the top of the div is reversed because we used a trick in css (we use column-reverse) : 
    //So we want to know if we are at the bottom of the div !
    if((currentElement.scrollHeight + currentElement.scrollTop) - currentElement.clientHeight <= 1) {
        await loadOlderMessages();
    }
}

</script>
<template>
    <div class="channel-content" @scroll="onScroll">
        <div class="channel-container">
            <div class="channel-messages-container">
                <div v-if="!isLoaded" class="channel-spinner">
                    <Spinner/>
                </div>
                <Message v-for="(message, index) of messages" 
                :message="message" 
                :previousMessage="(index > 0) ? messages[index-1] : undefined"
                :showToolbar="currentUserIsModerator"
                />
            </div>
        </div>
    </div>

</template>

<style scoped>
.channel-content {
    overflow-y: auto;
    overflow-x: hidden;
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column-reverse;
}

.channel-container {
    display: flex;
    flex-direction: column-reverse;
    justify-content: flex-end;
}

.channel-spinner {
    display: flex;
    width: 100%;
    height: 100vh;
    justify-content: center;
    align-items: center;
}

.channel-content::-webkit-scrollbar {
  width: 5px;
}
.channel-content::-webkit-scrollbar-track {
  background: var(--color-main-blue);
}
.channel-content::-webkit-scrollbar-thumb {
  background-color: var(--color-light-blue);
  border-radius: 20px;
}
</style>