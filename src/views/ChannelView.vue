<script setup lang="ts">
  import ChannelSidebar from "../components/ChannelSidebar.vue";
  import ChannelTopbar from "../components/ChannelTopbar.vue";
  import ChannelContent from "@/components/ChannelContent.vue";
  import MemberSidebar from "../components/MemberSidebar.vue";
  import MessageTextArea from "../components/MessageTextArea.vue";
  import { useChannelStore } from '../stores/channel';
  import { onBeforeMount, ref } from 'vue';
  import { useRouter, useRoute } from "vue-router"
import { useAuthStore } from '@/stores/auth-store';
import api from "@/boot/axios";
import { useMessagesStore } from '../stores/messages';

  const router = useRouter();
  const route = useRoute();
  

  const channelStore = useChannelStore();
  const authStore = useAuthStore();
  const messagesStore = useMessagesStore();


  const currentChannel = ref(channelStore.selectedChannel)
  const currentMessages = ref<Message[]>([])

  // onBeforeMount(async () => {
  //   // channelStore.setSelectedChannel(route.params.channelId as string);

  //   // console.log(channelStore.selectedChannel)

  //   // currentChannel.value = channelStore.selectedChannel;

  //   channelStore.setSelectedChannel(route.params.channelId as string);

  //   console.log({selectedChannel: channelStore.selectedChannel})

  //   currentChannel.value = channelStore.selectedChannel;

  //   console.log({currentChannel:currentChannel.value})

  //   await setMessages();
  // })

  const setMessages = async () => {
    currentMessages.value = await getMessagesFromApi();
  }

  const getMessagesFromApi = async () => {
    const offset = currentMessages.value.length;

    console.log(currentChannel.value.id)

    const config = {
        headers: { Authorization: `Bearer ${authStore.getToken()}` }
    };
    const response = await api.get(`/protected/channel/${currentChannel.value.id}/messages/${offset}`, config)

    return response.data;
}

  router.afterEach(async (to) => {
      channelStore.setSelectedChannel(route.params.channelId as string);

      // console.log({selectedChannel: channelStore.selectedChannel})

      // currentChannel.value = channelStore.selectedChannel;

      // console.log({currentChannel:currentChannel.value})

      // messagesStore.setMessages(route.params.channelId as string);

      // await setMessages();

      await messagesStore.setMessages(route.params.channelId as string);

      currentMessages.value = messagesStore.messages
  })
</script>

<template>
    <div class="elements">
        <ChannelTopbar :channelName="channelStore.selectedChannel.name"/>
        <ChannelContent :channelId="channelStore.selectedChannel.id" :creator="channelStore.selectedChannel.creator"/>
        <MessageTextArea/>
    </div>
</template>

<style scoped>
</style>