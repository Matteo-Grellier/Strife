<script lang="ts" setup>
import { onMounted, ref, watchEffect, onBeforeMount } from 'vue';
import { getIsToday, getIsYesterday } from '../utils';
import MessageToolBar from "./MessageToolBar.vue"
import api from '@/boot/axios';
import { useAuthStore } from '@/stores/auth-store';
import { useChannelStore } from '@/stores/channel';
import { useMessagesStore } from '@/stores/messages';

type Props = {
    message: Message,
    previousMessage?: Message,
    showToolbar?: boolean,
}

const props = defineProps<Props>()

const authStore = useAuthStore();
const channelStore = useChannelStore();
const messagesStore = useMessagesStore();

const timeOfSentMessage = ref("");
const isSendInSameTime = ref(false);
const isUpdatingMessage = ref(false);

const updatedText = ref("");

const getCorrespondingDateAndHours = () => {
    const dateOfMessage = new Date(props.message.timestamp);
    console.log(dateOfMessage);

    const messageTime = dateOfMessage.toLocaleString("fr-FR", {
        hour: '2-digit',
        minute: '2-digit'
    });

    if (getIsToday(dateOfMessage)) { // to change
        timeOfSentMessage.value = `Today at ${messageTime}`
    } else if (getIsYesterday(dateOfMessage)) { // to change
        timeOfSentMessage.value = `Yesterday at ${messageTime}`
    } else {
        timeOfSentMessage.value = dateOfMessage.toLocaleDateString('fr-FR', {hour: 'numeric', minute: 'numeric'});
    }
}

const getCorrespondingHours = () => {
    const dateOfMessage = new Date(props.message.timestamp);

    const messageTime = dateOfMessage.toLocaleString("fr-FR", {
        hour: '2-digit',
        minute: '2-digit'
    });

    timeOfSentMessage.value = messageTime;
}

onBeforeMount(() => {
    const minuteInMilliseconds = 60000;
    const numberOfMinutes = 3;

    console.log("from message", { MESSAGE: props.message});

    isSendInSameTime.value = (
        Boolean(props.previousMessage) 
        && props.message.timestamp - props.previousMessage!.timestamp < minuteInMilliseconds*numberOfMinutes
    );

    if(isSendInSameTime.value) {
        console.log("it's totally true")
        getCorrespondingHours();
    } else {
        getCorrespondingDateAndHours();
    }

})

const enableUpdatingMessage = (isUpdating: boolean) => {
    isUpdatingMessage.value = isUpdating;
    updatedText.value = props.message.content.Text ?? "";
}

const confirmUpdating = () => {
    const config = {
        headers: { Authorization: `Bearer ${authStore.getToken()}` }
    };

    console.log(props.message)

    api.post(`/protected/channel/${props.message.channel_id}/message/moderate`,
    {
        channel_id: props.message.channel_id,
        timestamp: props.message.timestamp,
        author: props.message.author,
        content: {
            Text: updatedText.value
        }
    }, config)

    const updatedMessage = {
        channel_id: props.message.channel_id,
        timestamp: props.message.timestamp,
        author: props.message.author,
        content: {
            Text: updatedText.value
        }
    }
    isUpdatingMessage.value = !isUpdatingMessage.value;

    messagesStore.updateMessage(updatedMessage);

}

const clearMessage = () => {
    const config = {
        headers: { Authorization: `Bearer ${authStore.getToken()}` }
    };

    api.post(`/protected/channel/${props.message.channel_id}/message/moderate`,
    {
        channel_id: props.message.channel_id,
        timestamp: props.message.timestamp,
        author: props.message.author,
        content: {
            Text: ""
        }
    }, config)

    const clearedMessage = {
        channel_id: props.message.channel_id,
        timestamp: props.message.timestamp,
        author: props.message.author,
        content: {
            Text: ""
        }
    }

    messagesStore.updateMessage(clearedMessage);

}

</script>
<template>
    <div class="message-component" :style="(isSendInSameTime) ? 'margin-top: 0' : 'margin-top: 10px' ">
        <div v-if="!isSendInSameTime || message.author != previousMessage!.author" class="message">
            <h1 class="letter-profile">{{ message.author[0].toUpperCase() }}</h1>
            <div class="message-content">
                <h4>{{ message.author }}<span class="date"> • {{ timeOfSentMessage }}</span></h4>
                <textarea v-if="isUpdatingMessage" name="update-content" v-model="updatedText">{{ updatedText }}</textarea>
                <p v-else-if="message.content.Text">{{ message.content.Text }}</p>
                <img v-else-if="message.content.Image" :src="message.content.Image" :alt="`Image from ${message.author}`">
                <p v-else class="empty-message"><i>This message is empty 👓</i></p>
            </div>
        </div>
        <div v-else="isSendInSameTime" class="message">
            <div class="message-content message-content-inline">
                <p class="date date-same-time">{{ timeOfSentMessage }}</p>
                <textarea v-if="isUpdatingMessage" name="update-content" v-model="updatedText">{{ updatedText }}</textarea>
                <p v-else-if="message.content.Text">{{ message.content.Text }}</p>
                <img v-else-if="message.content.Image" :src="message.content.Image" :alt="`Image from ${message.author}`">
                <p v-else class="empty-message"><i>This message is empty 👓</i></p>
            </div>
        </div>
        <MessageToolBar 
        v-if="showToolbar" 
        :onUpdating:message="enableUpdatingMessage" 
        :onUpdateconfirm:message="confirmUpdating"
        :onClear:message="clearMessage"
        class="toolbar"/>
    </div>

</template>
<style scoped>
h1, .message-content, .message-content h4, .message-content p {
    margin: 0;
}

.message-content {
    width: 100%;
}

.message-content h4 {
    margin-bottom: 4px;
}
.date {
  font-family: var(--message-font);
  font-size: var(--date-font-size);
  font-weight: 500;
  color: var(--date-text-color);
}

.message {
    display: flex;
    width: 100%;
    padding: 5px 15px;
}

.message-component {
    display: flex;
    justify-content: space-between;
}

.message-component:hover {
    transition: all 0.2s ease-in-out;
    backdrop-filter: brightness(0.9);
}

.letter-profile {
    font-size: 2.3em;
    margin-right: 10px;
    background-color: var(--color-dark-blue);
    border-radius: 100%;
    width: 50px;
    height: 50px;
    min-width: 50px;
    min-height: 50px;
    line-height: 50px;
    text-align: center;
}

.message-content textarea {
    width: 100%;
}

.message-content-inline {
    display: flex;
    align-items: center;
}

.date-same-time {
    visibility: hidden;
    width: 60px;
    min-width: 60px;
}

.toolbar {
    opacity: 0;
    visibility: hidden;
    margin-right: 20px;
}

.message-component:hover .date-same-time {
    transition: all 0.2s ease-in-out;
    visibility: visible;
}

.message-component:hover .toolbar {
    transition: all 0.2s ease-in-out;
    opacity: 1;
    visibility: visible;
}
.message-content img {
    border-radius: 10px;
    max-height: 15em;
}

.empty-message {
    color:var(--color-empty-message)
}
</style>
