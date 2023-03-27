<script setup lang="ts">
import IconSend from './icons/IconSend.vue';
import IconGif from './icons/IconGif.vue';
import IconImage from './icons/IconImage.vue'
import GifSelector from './GifSelector.vue';
import { ref } from 'vue';
import { useChannelStore } from '@/stores/channel';

const channelStore = useChannelStore()

const contentOfTextarea = ref("");

const gifSelectorIsAppear = ref(false);
const isImageArea = ref(false);


const sendMessage = () => {

    const type = (isImageArea.value) ? 'image': 'text'

    channelStore.sendMessageOnChannel(contentOfTextarea.value, type)

    contentOfTextarea.value = "";
}

</script>
<template>
    <GifSelector v-if="gifSelectorIsAppear"/>
    <div class="textarea-bar">
        <pre v-if="isImageArea">image :</pre>
        <textarea 
        :placeholder="isImageArea ? 'Enter your image link...' : 'Enter your message...'" 
        v-model="contentOfTextarea" 
        name="" 
        :rows="1"
        >{{ contentOfTextarea }}</textarea>
        <div class="buttons">
            <button class="classic-button" @click="() => isImageArea = !isImageArea"><IconImage height="40"/></button>
            <button class="gif-button" @click="() => gifSelectorIsAppear = !gifSelectorIsAppear"><IconGif height="25"/></button>
            <button class="classic-button" @click="sendMessage"><IconSend/></button>
        </div>
    </div>
</template>
<style scoped>

    .textarea-bar {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px 20px;
        margin-top: 20px;
        border-radius: 20px;
        background-color: var(--color-light-blue);
    }

    .textarea-bar pre {
        background-color: var(--color-dark-blue);
        border-radius: 5px;
        padding: 5px;
        margin-left: 10px;
    }

    textarea {
        margin: 5px;
        width: 100%;
        /* height: auto; */
        max-height: 300px;
        color: var(--color-white-grey);
    }

    button {
        background: none;
    }

    .buttons {
        display: flex;
    }

    .classic-button {
        fill: var(--color-dark-blue);
    }

    .classic-button:hover {
        fill: var(--color-main-blue);
    }
</style>