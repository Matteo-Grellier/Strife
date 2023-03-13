<script setup lang="ts">
import { ref } from 'vue';
import api from '@/boot/axios';
import { useAuthStore } from '@/stores/auth-store';

const channelName = ref('');
const channelImg = ref('');
const JWT = useAuthStore().getToken();


  const config = {
        headers: {
            Authorization: `Bearer ${JWT}`
        }
    };
function onSubmit() {
    console.log(channelName.value);
    console.log(channelImg.value);
    api.put('/protected/channel', {
        name: channelName.value,
        img: channelImg.value
    }, config)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}
</script>

<template>
    <main>
        <label for="channelName">Name of the channel</label>
        <input type="text" v-model="channelName">
        <label for="channelName">Link of the image of the channel</label>
        <input type="text" v-model="channelImg">
        <button v-on:click="onSubmit">Create</button>
    </main>
</template>