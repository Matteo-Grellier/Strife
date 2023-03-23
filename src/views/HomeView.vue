<script setup lang="ts">
    import ChannelSidebar from "../components/ChanelSidebar.vue";
    import ChannelContent from "@/components/ChannelContent.vue";
</script>

<template>
    <main>
        <ChannelSidebar/>
        <ChannelContent :channelId="1"/>
        <ChannelSidebar/>
    </main>
</template>
<style>
    main {
        display: flex;
        flex-grow: 2;
        width: 100vw;
    }
</style>