import api from "@/boot/axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuthStore } from "./auth-store";

type State = {
    messages: Message[]
}

export const useMessagesStore = defineStore("message", {
    state: (): State => ({
        messages: [],

    }),
    actions: {
        async setMessages(channelId: string) {        
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
        
            this.messages.unshift(...response.data);
        }

    }
})