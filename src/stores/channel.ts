import { defineStore } from "pinia";
import { ref } from "vue";


type ChannelInfos = {
    name: string;
    img: string;
    id: number;
    creator: string;
}

export const useChannelStore = defineStore("channel", {
    state: () => ({
        name: "Channel Name",
        id: 0,
        img: "default.jpg",
        creator: "Unknown"
    }),
    actions: {
        selectedChannel(channel:ChannelInfos) {
            this.name = channel.name;
            this.id = channel.id;
            this.img = channel.img;
            this.creator = channel.creator;
        }
    }
})