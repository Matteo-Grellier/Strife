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
            users: []
        },
        channels: []

    }),
    actions: {
        // setSelectedChannel(channel:Channel) {
        //     this.selectedChannel.name = channel.name;
        //     this.selectedChannel.id = channel.id;
        //     this.selectedChannel.img = channel.img;
        //     this.selectedChannel.creator = channel.creator;
        // },
        setSelectedChannel(id: string) {
            const selectedChannel = this.channels.find((channel) => id === channel.id.toString())

            if(!selectedChannel) return;

            this.selectedChannel = selectedChannel;
        },
        setChannels(channels: Channel[]) {
            this.channels.push()
        }

    }
})