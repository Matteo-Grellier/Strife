<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { getIsToday, getIsYesterday } from '../utils';

type Props = {
    message: Message,
    previousMessage?: Message
}

// type Message = {
//     channelId : number, 
//     timestamp : number, 
//     author : string, 
//     content : MessageContent
// }

// type MessageContent = {
//     text?: string,
//     image?: string
// }

const props = defineProps<Props>()

const timeOfSentMessage = ref("");
const isSendInSameTime = ref(false);

const getCorrespondingDateAndHours = () => {
    const dateOfMessage = new Date(props.message.timestamp);
    console.log(dateOfMessage);
    // const currentDate = new Date();
    const messageTime = dateOfMessage.toLocaleString("fr-FR", {
        hour: '2-digit',
        minute: '2-digit'
    });

    if (getIsToday(dateOfMessage)) { // to change
        timeOfSentMessage.value = `Today at ${messageTime}`
    } else if (getIsYesterday(dateOfMessage)) { // to change
        // date.value = dateOfMessage.toLocaleString("fr-FR")
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

onMounted(() => {
    const minuteInMilliseconds = 60000;
    const numberOfMinutes = 3;

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

</script>
<template>
    <div v-if="!isSendInSameTime" class="message" style="margin-top: 10px">
        <h1 class="letter-profile">{{ message.author[0].toUpperCase() }}</h1>
        <div class="message-content">
            <h4>{{ message.author }}<span class="date"> • {{ timeOfSentMessage }}</span></h4>
            <p v-if="message.content.Text">{{ message.content.Text }}</p>
            <img v-else :src="message.content.Image" :alt="`Image from ${message.author}`">
        </div>
    </div>
    <div v-else="isSendInSameTime" class="message">
        <div class="message-content message-content-inline">
            <p class="date date-same-time">{{ timeOfSentMessage }}</p>
            <p v-if="message.content.Text">{{ message.content.Text }}</p>
            <img v-else :src="message.content.Image" :alt="`Image from ${message.author}`">
        </div>
    </div>
</template>
<style scoped>
h1, .message-content, .message-content h4, .message-content p {
    margin: 0;
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
    /* align-items: center; */
    /* margin: 5px 0; */
    padding: 5px 15px;
}

.message:hover {
    /* background-color: var(--color-main-blue) */
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

.message-content-inline {
    display: flex;
    align-items: center;
}

.date-same-time {
    visibility: hidden;
    width: 60px;
    min-width: 60px;
}

.message:hover .date-same-time {
    transition: all 0.2s ease-in-out;
    visibility: visible;
}
.message-content img {
    border-radius: 10px;
    max-width: 50em;
}
</style>
