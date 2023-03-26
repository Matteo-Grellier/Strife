<script setup lang="ts">
    import GroupAdd from "../assets/groupAdd.svg"
    import User from "./User.vue"

    const ppl1 = "Chirac_le_sang";
    const ppl2 = "Xx_Sarkozy_xX"
    const ppl3 = "Holland-BEYOU-47"

</script>

<template>
  <div class="memberSidebar">
    <div class="upperDiv">
        <h3 class="title"> Utilisateurs </h3>
        <hr class="separator"/>
        <ul class="memberList">
            <li >
                <!-- <ChannelLink :channelName="yes" channelImg="logo-solo"/>
                <ChannelLink :channelName="noYes" channelImg="logo-solo"/> -->
                <User :username="ppl1" :is-admin="true"></User>
                <User :username="ppl2" :is-admin="false"></User>
                <User :username="ppl3" :is-admin="false"></User>
            </li>
        </ul>
    </div>
    <button class="buttonPlus">
        <img :src="GroupAdd" alt="LibraryAdd" class="libraryAdd"> 
        <h3>Add user</h3>
    </button>
  </div>
</template>

<style scoped>
    .memberSidebar{
        flex-direction: column;
        max-width: 188px;
        background-color: var(--color-dark-blue);
        height: 100vh;
        padding-left: 2%;
        padding-right: 2%;
        display: flex;
        justify-content: center;
    }

    .upperDiv {
        height: 90vh;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .buttonPlus{
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--color-light-blue);
        color: white;
    }

    .libraryAdd{
        width: 35px;
        margin-right: 20px;
        color: white;
    }

    .memberList {
        list-style-type: none;
        width: 200px;
        padding: 0;
    }

    .separator {
        margin-top: 10px;
        margin-bottom: 10px;
        width: 100%;
    }
</style>
