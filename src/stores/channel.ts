import { defineStore } from "pinia";
import { ref } from "vue";

interface User {
    name: string;
    id: number;
    isAdmin: boolean;
};

type ChannelInfos = {
    name: string;
    img: string;
    id: number;
    creator: string;
    users: User[];
}

export const useChannelStore = defineStore("channel", {
    state: () => ({
        name: "Channel Name",
        id: 0,
        img: "default.jpg",
        creator: "Unknown",
        users: [{name: "default user", id: 0, isAdmin: true}]
    }),
    actions: {
        selectedChannel(channel:ChannelInfos) {
            this.name = channel.name;
            this.id = channel.id;
            this.img = channel.img;
            this.creator = channel.creator;
            this.users = channel.users
        },
        getSelectedChannel() {
            return [{
                name: this.name,
                img: this.img,
                id: this.$id,
                creator: this.creator,
                users: this.users,
            }]
        }
    }
})