<script setup lang="ts">
    import LibraryAdd from "../assets/LibraryAdd.svg"
    import Chanel from "../components/Chanel.vue"

    const props = defineProps<{
        serverName: string,
        serverImg: string
    }>();
</script>

<template>
  <div class="ServerSidebar">
    <RouterLink to="/"> 
        <img src="/logo-text.png" alt="STIFE" class="StrifeLogo"> 
    </RouterLink>
    <hr/>
    <ul>
        <li>
            <Chanel :serverName="serverName" serverImg="serverImg"/>
        </li>
    </ul>
    <button id="buttonPlus">
        <img :src="LibraryAdd" alt="LibraryAdd" class="libraryAdd"> 
    </button>
  </div>
</template>

<style scoped>
    .ServerSidebar{
        max-width: 300px;
        background-color: var(--color-dark-blue);
        height: 100em;
        padding: 2%;
    }

    .buttonPlus{
        padding: 0;
        height: 40px;
        display: flex;
        align-items: center;
    }

    .StrifeLogo{
        width: 100%;
    }

    .libraryAdd{
        width: 30px;
        /* fill: white; */
        /* filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(249deg) brightness(108%) contrast(101%); */
    }
</style>
