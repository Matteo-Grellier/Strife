<script setup lang="ts">
    import LibraryAdd from "../assets/LibraryAdd.svg"
    import ChannelLink from "./ChannelLink.vue"

    const yes = "yes";
    const noYes = "no-yes"

</script>

<template>
  <div class="ChannelSidebar">
    <div class="upperDiv">
        <RouterLink to="/"> 
            <img src="/logo-text.png" alt="STIFE" class="StrifeLogo"> 
        </RouterLink>
        <hr class="separator"/>
        <ul class="channelList">
            <li >
                <ChannelLink :channelName="yes" channelImg="logo-solo"/>
                <ChannelLink :channelName="noYes" channelImg="logo-solo"/>
            </li>
        </ul>
    </div>
    <button class="buttonPlus">
        <img :src="LibraryAdd" alt="LibraryAdd" class="libraryAdd"> 
    </button>
  </div>
</template>

<style scoped>
    .ChannelSidebar{
        flex-direction: column;
        max-width: 188px;
        background-color: var(--color-dark-blue);
        height: 100vh;
        padding-left: 2%;
        padding-right: 2%;
    }

    .upperDiv {
        height: 90vh;
    }

    .buttonPlus{
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .StrifeLogo{
        width: 100%;
        margin-top: 20px;
    }

    .libraryAdd{
        width: 35px;
        margin-right: 0;
    }

    .channelList {
        list-style-type: none;
        width: 200px;
        padding: 0;
    }

    .separator {
        margin-top: 20px;
        margin-bottom: 30px;
    }
</style>