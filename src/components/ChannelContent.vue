<script lang="ts" setup>
import api from '@/boot/axios';
import { onBeforeMount, reactive, onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores/auth-store';

import Message from './Message.vue';
import Spinner from './Spinner.vue';

const authStore = useAuthStore();

type Props = {
    channelId: number,
}

const props = defineProps<Props>();

const messages: Message[] = reactive([])
const isLoaded = ref(false);

onBeforeMount(async () => {
    const config = {
        headers: { Authorization: `Bearer ${authStore.getToken()}` }
    };
    const response = await api.get(`/protected/channel/${props.channelId}/messages/0`, config)

    messages.push(...response.data);
    console.log(messages);

    isLoaded.value = true
})

// onMounted(() => isLoaded.value = true)

</script>
<template>
    <div class="channel-content">
        <div class="channel-container">
            <div class="channel-messages-container">
                <div v-if="!isLoaded" class="channel-spinner">
                    <Spinner/>
                </div>
                <Message v-for="(message, index) of messages" 
                :message="message" 
                :previousMessage="(index > 0) ? messages[index-1] : undefined"
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