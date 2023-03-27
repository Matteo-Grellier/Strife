<script setup lang="ts">
    import { ref } from 'vue';
    import api from '@/boot/axios';
    import { useAuthStore } from '@/stores/auth-store';
    import { useChannelStore } from '@/stores/channel';

    const user_id = ref('');
    const JWT = useAuthStore().getToken();
    const channelStore = useChannelStore();

    const config = {
        headers: {
            Authorization: `Bearer ${JWT}`
        }
    };

    function AddUserClick() {
        const channel_id = channelStore.getSelectedChannel().id;
    
        api.put(`/protected/channel/${channel_id}/user/${user_id.value}`, {}, config)
            .then(function (response) {
                console.log(response);
                window.location.reload()
            })
            .catch(function (error) {
                console.log(error);
            });
        console.log("add user ");
    } 
</script>

<template >
    <div class="addChannelDiv">
        <input type="text" v-model="user_id" placeholder="User To Add" class="input">
        <button v-on:click="AddUserClick" class="btn">Add User</button>
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
</style>