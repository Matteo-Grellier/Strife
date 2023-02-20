<script lang="ts" setup>
</script>
<template>
    <h3 v-for="index in 2" :key="index">Test button</h3>
    <button>Test button</button>
    <button><img src="https://cdn-icons-png.flaticon.com/512/261/261987.png" width="30"/><span>Test button with icon</span></button>
    <input type="text" placeholder="Votre nom svp...">
    <textarea name="testtext" id="testtext" placeholder="Entre ton texte"></textarea>
    <input type="textarea"><div v-for="index in 2" :key="index">
        <h4>m.leger<span>✨</span><span class="date">• Aujourd'hui à 14h36</span></h4>
        <p>Ceci est mon premier message avec un <a>super lien</a> ! <b>Bold</b> <i>Italique</i> <b><i>Bold et italique</i></b></p>
    </div>
</template>
<style scoped>
.date {
  font-family: var(--message-font);
  font-size: var(--date-font-size);
  font-weight: 500;
  color: var(--date-text-color);
}

/* button {
    background-color: #fff;
} */
</style>