<script lang="ts" setup>
import IconDelete from './icons/IconDelete.vue';
import IconEdit from './icons/IconEdit.vue';
import IconClose from './icons/IconClose.vue';
import IconCheck from './icons/IconCheck.vue';
import { ref } from 'vue';

const isUpdatingMessage = ref(false);

const emit = defineEmits(["updating:message", "updateconfirm:message"]);

const clickUpdatingContent = () => {
    isUpdatingMessage.value = !isUpdatingMessage.value;
    console.log("BONSOIR", isUpdatingMessage.value)
    emit("updating:message", isUpdatingMessage.value);
}

</script>
<template>
    <div class="toolbar">
        <button :title="(isUpdatingMessage) ? 'Cancel edition' : 'Edit content'" @click="clickUpdatingContent">
            <IconClose v-if="isUpdatingMessage" width="25" height="25"/>
            <IconEdit v-else width="25" height="25"/>
        </button>
        <button v-if="isUpdatingMessage" title="Confirm edition" @click="() => emit('updateconfirm:message')">
            <IconCheck width="25" height="25"/>
        </button>
        <button v-if="!isUpdatingMessage" title="Delete content" class="delete">
            <IconDelete width="25" height="25"/>
        </button>
    </div>  
</template>
<style scoped>
.toolbar {
    display: flex;
    position:relative;
    top: -15px;
    z-index: 1;
    background-color: var(--color-dark-blue);
    border-radius: 10px;
    border: 2px solid var(--color-light-blue);
    height: 100%;
}

.toolbar:hover {
    box-shadow: 0 2px 6px 2px rgba(0, 0, 0, 0.2);
}

button {
    background-color: var(--color-dark-blue);
    border-radius: inherit;
    height: 100%;

    padding: 2px;
}

button:hover {
    background-color: var(--color-main-blue);
    
}

button img {
    margin-right: 0;
}

svg {
    fill: var(--color-grey);
}
.delete svg {
    fill: var(--color-red);
}
</style>