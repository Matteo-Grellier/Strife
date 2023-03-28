<script setup lang="ts">
    import { useChannelStore } from '../stores/channel';

    const gifs = [
        "https://media.tenor.com/n-JBNeXeFYMAAAAd/gigachad-luigi.gif",
        "https://media.tenor.com/2VohKap_UmQAAAAd/msf-clash.gif",
        "https://media.giphy.com/media/b7oDqbZu8PiopnOF9x/giphy.gif",
        "https://media.tenor.com/2wqBVzYtlZ0AAAAC/harry-potter-thug-life.gif",
        "https://media.tenor.com/31CLZ4HCc54AAAAC/visiteur-du-futur-florent-dorin.gif",
        "https://media.tenor.com/FzHTu225tMgAAAAd/willem-dafoe.gif",
        "https://media.tenor.com/1DVVF2Ew9scAAAAC/boss-gatsby.gif",
        "https://media.tenor.com/Gwjwa1pWE-oAAAAd/jdg-joueur-du-grenier.gif"

    ]

    const channelStore = useChannelStore();
</script>
<template>
    <div class="gif-selector-container">
        <div class="gifselector">
            <img v-for="gif, index of gifs" :key="index" @click="channelStore.sendMessageOnChannel(gif, 'image')" :src="gif">
        </div>
    </div>
</template>
<style scoped>
.gifselector {
    display: flex;
    width: 300px;
    height: 300px;
    background-color: var(--color-light-blue);
    position: relative;
    top: -50;
    right: 0;
    z-index: 100;
    overflow-y: auto;
    border-radius: 10px;
    padding: 10px;
    margin-right: 20px;
}

.gifselector img {
    width: 250px;
    margin: 10px;
    object-fit: cover;
    border-radius: 20px;
}

.gifselector img:hover {
    cursor: pointer;
}

.gif-selector-container {
    width: 100%;
    display: flex;
    justify-content: flex-end;
}
</style>