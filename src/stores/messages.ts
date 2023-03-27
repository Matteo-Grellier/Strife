import api from "@/boot/axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuthStore } from "./auth-store";

// const authStore = useAuthStore();


type State = {
    messages: Message[]
}

export const useMessagesStore = defineStore("message", {
    state: (): State => ({
        messages: [],

    }),
    actions: {
        // setSelectedChannel(channel:Channel) {
        //     this.selectedChannel.name = channel.name;
        //     this.selectedChannel.id = channel.id;
        //     this.selectedChannel.img = channel.img;
        //     this.selectedChannel.creator = channel.creator;
        // },
        async setMessages(channelId: string) {
            // const offset = this.messages.length;

            console.log(channelId)
        
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            };
            const response = await api.get(`/protected/channel/${channelId}/messages/0`, config)
        
            this.messages = response.data;
        },
        async loadOlderMessages(channelId: string) {
            const offset = this.messages.length;

            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            };
            const response = await api.get(`/protected/channel/${channelId}/messages/${offset}`, config)

            const messages = this.messages;

            console.log(messages)
        
            this.messages.unshift(...response.data);

            // this.messages = messages;
        }

    }
})