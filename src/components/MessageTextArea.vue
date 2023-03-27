<script setup lang="ts">
import IconSend from './icons/IconSend.vue';
import IconGif from './icons/IconGif.vue';
import IconImage from './icons/IconImage.vue'
import { ref, computed } from 'vue';
import api from '@/boot/axios';
import { useAuthStore } from '../stores/auth-store';

type Props = {
    channelId: number,
}

const authStore = useAuthStore();

const props = defineProps<Props>()

const contentOfTextarea = ref("");


const sendMessage = () => {

    const config = {
        headers: { Authorization: `Bearer ${authStore.getToken()}` }
    };

    try{
        api.post(`/protected/channel/${props.channelId}/message`, {
            Text: contentOfTextarea.value
        }, config)

        contentOfTextarea.value = "";
    } catch(e: any) {
        console.error(e.message);
    }

}

</script>
<template>
    <div class="textarea-bar">
        <textarea placeholder="Enter your message..." v-model="contentOfTextarea" name="" :rows="1">{{ contentOfTextarea }}</textarea>
        <div class="buttons">
            <button class="classic-button"><IconImage height="40"/></button>
            <button class="gif-button"><IconGif height="25"/></button>
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