<script setup lang="ts">
import { ref } from 'vue';
const channelName = ref('');
const channelImg = ref('');
</script>

<template>
    <main>
        <label for="channelName">Name of the channel</label>
        <input type="text" v-model="channelName">
        <label for="channelName">Link of the image of the channel</label>
        <input type="text" v-model="channelImg">
        
    </main>
</template>