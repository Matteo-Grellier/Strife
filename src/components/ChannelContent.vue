<script lang="ts" setup>
import api, {webSocketApi} from '@/boot/axios';
import { onBeforeMount, reactive, onMounted, ref, watchEffect, watch } from 'vue';
import { useAuthStore } from '@/stores/auth-store';

import { useRouter } from 'vue-router';

import Message from './Message.vue';
import Spinner from './Spinner.vue';
import Button from './Button.vue';
import { useMessagesStore } from '@/stores/messages';

const authStore = useAuthStore();
const messagesStore = useMessagesStore();
const router = useRouter();

type Props = {
    channelId: number,
    creator: string,
    // messages: Message[]
}

const props = defineProps<Props>();

// const messages: Message[] = reactive([])
// const messages = ref<Message[]>(props.messages)
const isLoaded = ref(true);
const currentUserIsModerator = ref(false);


// onBeforeMount(async () => {
//     await setMessages();
//     isLoaded.value = true
//     console.log(props.creator, authStore.username)
//     currentUserIsModerator.value = (props.creator === authStore.username);

//     // await createWebSocketConnection();
// })

// router.afterEach(async (to) => {
//     // await setMessages();
//     const newMessage = await getMessagesFromApi();
//     messages.pop();
//     messages.push(newMessage);

//     console.log(messages);
    
//     isLoaded.value = true
//     console.log(props.creator, authStore.username)
//     currentUserIsModerator.value = (props.creator === authStore.username);
// })

const createWebSocketConnection = async () => {
    webSocketApi.get(`/ws/channel/${props.channelId}/token/${authStore.token}`)
}

// const setMessages = async () => {
//     const messagesToAdd = await getMessagesFromApi();
//     messages.value.unshift(...messagesToAdd);
// }

// const getMessagesFromApi = async () => {
//     const offset = messages.value.length;

//     console.log(props.channelId)

//     const config = {
//         headers: { Authorization: `Bearer ${authStore.getToken()}` }
//     };
//     const response = await api.get(`/protected/channel/${props.channelId}/messages/${offset}`, config)

//     return response.data;
// }

// const loadOlderMessages = async () => {
//     isLoaded.value = false
//     await setMessages();
//     isLoaded.value = true
// }

const onScroll = async ({target}: Event) => {
    const currentElement: Element = target as Element

    //The logic to know if we are at the top of the div is reversed because we used a trick in css (we use column-reverse) : 
    //So we want to know if we are at the bottom of the div !
    if((currentElement.scrollHeight + currentElement.scrollTop) - currentElement.clientHeight <= 1) {
        await messagesStore.loadOlderMessages(props.channelId.toString());
    }
}

// watch(props, async () => {
//     // await setMessages();
//     // console.log({beforeMessage: messages.value[0]})
//     const newMessages = await getMessagesFromApi();
//     // messages.value.length = 0;
//     // console.log({emptyMessages: messages.value[0]})
//     messages.value = newMessages;

//     // console.log(newMessages[0]);

//     isLoaded.value = true
//     // console.log(props.creator, authStore.username)
//     currentUserIsModerator.value = (props.creator === authStore.username);
//     // console.log({messages: messages.value[0]}, "WEEEEESH")
// })

// watch(props, () => {
//     messages.value = props.messages
// })

// router.afterEach(async () => {
//     // await setMessages();
//     // console.log({beforeMessage: messages.value[0]})
//     const newMessages = await getMessagesFromApi();
//     // messages.value.length = 0;
//     // console.log({emptyMessages: messages.value[0]})
//     messages.value = newMessages;

//     // console.log(newMessages[0]);

//     isLoaded.value = true
//     // console.log(props.creator, authStore.username)
//     currentUserIsModerator.value = (props.creator === authStore.username);
//     // console.log({messages: messages.value[0]}, "WEEEEESH")
// })

</script>
<template>
    <div class="channel-content" @scroll="onScroll">
        <div class="channel-container">
            <div class="channel-messages-container">
                <div v-if="!isLoaded" class="channel-spinner">
                    <Spinner/>
                </div>
                <Message v-for="(message, index) of messagesStore.messages" 
                :message="message" 
                :previousMessage="(index > 0) ? messagesStore.messages[index-1] : undefined"
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
    height: 100%;
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