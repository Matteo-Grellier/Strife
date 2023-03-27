import api from "@/boot/axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuthStore } from "./auth-store";

import Notification from "../assets/notification.wav";

type State = {
    messages: Message[]
    webSocket?: WebSocket 
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
        },
        async createWebSocketConnection(channelId: string) {
            try {
                const ws = new WebSocket(`wss://edu.tardigrade.land/msg/ws/channel/${channelId}/token/${localStorage.getItem('token')}`);

                this.webSocket = ws;

                if(!this.webSocket) return;

                ws.onopen = () => {
                    console.log("connexion established")
                    this.webSocket = ws;
                }

                this.webSocket.onmessage = (e) => {

                    const receivedMessage = JSON.parse(e.data);

                    if(!receivedMessage || !receivedMessage.timestamp) return;

                    this.messages.push(receivedMessage);

                    if(receivedMessage.author != localStorage.getItem('username')) {
                        const audio = new Audio(Notification);
                        audio.play();
                    }
                }
            } catch(e) {
                console.error(e);
            }
        },
        closeWebSocketConnection() {
            if(!this.webSocket) return;

            this.webSocket.close();

            this.webSocket.onclose = () => {
                this.webSocket = undefined;
                console.log(this.webSocket);
            }
        },
        updateMessage(updateMessage: Message) {
            const updatedMessages = this.messages.map((message) => {
                if(updateMessage.timestamp == message.timestamp 
                    && updateMessage.author == message.author
                    && updateMessage.channel_id == message.channel_id
                ) {
                    return updateMessage;
                }

                return message;
            })

            this.messages = updatedMessages;
        }

    }
})