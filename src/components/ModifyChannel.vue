<script setup lang="ts">
    import { ref } from 'vue';
    import api from '@/boot/axios';
    import { useAuthStore } from '@/stores/auth-store';
    import { useChannelStore } from '@/stores/channel'

    const channelName = ref('');
    const channelImg = ref('');

    const JWT = useAuthStore().getToken();
    const config = {
        headers: {
            Authorization: `Bearer ${JWT}`
        }
    };

    const channelStore = useChannelStore();
    const users = ref(channelStore.getSelectedChannel()[0].);

    function onSubmit() {
        api.put('/protected/channel', {
            name: channelName.value,
            img: channelImg.value
        }, config)
        .then(function (response) {
            console.log(response);
            window.location.reload()
        })
        .catch(function (error) {
            console.log(error);
        });
    }
</script>

<template >
    <div class="addChannelDiv">
        <input type="text" v-model="channelName" placeholder="Channel Name" class="input">
        <input type="text" v-model="channelImg" placeholder="Channel Image" class="input">
        <button v-on:click="onSubmit" class="btn">Modify channel</button>
        <button v-on:click="onSubmit" class="btn-del">Delete channel</button>
    </div>
</template>

<style scoped>
    .addChannelDiv {
        background-color: var(--color-dark-blue);
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 10%;
        padding: 3%;
        max-width: 15%;
    }

    .input {
        margin-top: 5%;
        margin-bottom: 5%;
        font-family: var(--main-font);
    }

    .btn {
        margin-top: 5%;
    }

    .btn-del {
        margin-top: 2%;
        background-color: #DD4A29;
    }
</style>
