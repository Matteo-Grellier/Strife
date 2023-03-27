import api from "@/boot/axios";
import { defineStore } from "pinia";
import { ref } from "vue";

type State = {
    selectedChannel: Channel,
    channels: Channel[],
}

export const useChannelStore = defineStore("channel", {
    state: (): State => ({
        selectedChannel: {
            name: "Channel Name",
            id: -1,
            img: "default.jpg",
            creator: "Unknown",
            users: [],
        },
        channels: []

    }),
    actions: {
        setSelectedChannel(id: string) {
            const selectedChannel = this.channels.find((channel) => id === channel.id.toString())

            if(!selectedChannel) return;

            this.selectedChannel = selectedChannel;
        },
        setChannels(channels: Channel[]) {
            this.channels.push()
        },
        getSelectedChannel() {
            return this.selectedChannel;
        },
        getIsAdmin() {
            const currentUser = localStorage.getItem('username')

            return (currentUser == this.selectedChannel.creator)
        },
        sendMessageOnChannel(message: string, type: "image" | "text") {
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            };

            const id = this.selectedChannel.id
        
            try{
                if(type === "image") {
                    api.post(`/protected/channel/${id}/message`, {
                        Image: message
                    }, config)
                } else {
                    api.post(`/protected/channel/${id}/message`, {
                        Text: message
                    }, config)
                }
            } catch(e: any) {
                console.error(e.message);
            }
        }
    }
});