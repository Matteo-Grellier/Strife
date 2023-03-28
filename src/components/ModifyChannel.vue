<script setup lang="ts">
    import { ref } from 'vue';
    import api from '@/boot/axios';
    import { useAuthStore } from '@/stores/auth-store';
    import { useChannelStore } from '@/stores/channel'

    const props = defineProps<{
        actualChannelName: string,
        actualChannelImg: string
    }>();

    const channelName = ref(props.actualChannelName);
    const channelImg = ref(props.actualChannelImg);
    const channelColor = ref('');

    const JWT = useAuthStore().getToken();
    const config = {
        headers: {
            Authorization: `Bearer ${JWT}`
        }
    };

    const channelStore = useChannelStore();
    const selectedChannelId = ref(channelStore.getSelectedChannel().id);

    function onSubmit() {
        console.log(channelColor.value);
        console.log(selectedChannelId.value);
        api.post('/protected/channel/' + selectedChannelId.value + '/update_metadata', {
            name: channelName.value,
            img: channelImg.value,
            theme: {
                primary_color: channelColor.value,
                primary_color_dark: channelColor.value,
                accent_color: channelColor.value,
                text_color: channelColor.value,
                accent_text_color: channelColor.value,
            }
        }, config)
        .then(function (response) {
            console.log(response);
            window.location.reload()
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    function onDelete() {
        api.delete('/protected/channel/' + selectedChannelId.value, config)
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
        <input type="color" v-model="channelColor">
        <button @click="onSubmit()" class="btn">Modify channel</button>
        <button @click="onDelete()" class="btn-del">Delete channel</button>
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
        background-color: #ec4621;
    }
</style>
