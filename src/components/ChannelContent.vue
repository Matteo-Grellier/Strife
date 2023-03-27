<script lang="ts" setup>
import api from '@/boot/axios';
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
}

const props = defineProps<Props>();

const isLoaded = ref(true);
const currentUserIsModerator = ref(false);

const onScroll = async ({target}: Event) => {
    const currentElement: Element = target as Element

    //The logic to know if we are at the top of the div is reversed because we used a trick in css (we use column-reverse) : 
    //So we want to know if we are at the bottom of the div !
    if((currentElement.scrollHeight + currentElement.scrollTop) - currentElement.clientHeight <= 1) {
        await messagesStore.loadOlderMessages(props.channelId.toString());
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