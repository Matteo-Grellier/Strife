<script setup lang="ts">

type Props = {
    type?: "dark" | "light"
}

const props = defineProps<Props>();

</script>
<template>
    <button :class="(!type || type == 'light') ? 'light-btn' : 'dark-btn' ">
        <slot/>
    </button>
</template>
<style scoped>
/* Default values */
button {
  display: flex;
  align-items: center;
  text-align: center;
  padding: var(--button-padding-height) 0.5em;
  
  transition: all 0.2s ease-in-out;

  font-family: var(--button-font-family);
  font-size: var(--button-font-size);
  font-weight: 600;

  height: var(--button-height);
  border-radius: var(--button-border-radius);
  border: none;
  background-color: var(--color-yellow);
  border: 2px solid var(--color-yellow);
  color: var(--color-dark-blue);
}

button:hover {
  cursor: pointer;
  background-color: var(--color-main-blue);
  color: var(--color-yellow);
  box-shadow: 0 3px 6px 2px rgba(0, 0, 0, 0.2);
}

:slotted(svg) {
    fill: var(--color-dark-blue);
    width: 30px;
    height: 30px;
}

button:hover :slotted(svg) {
    fill: var(--color-yellow);
    width: 30px;
    height: 30px;
}

button img {
  margin-right: 0;
}

/* Darker values */
.dark-btn {
    background-color: var(--color-main-blue);
    border: 2px solid var(--color-dark-blue);
    color: var(--color-white-grey);
}

.dark-btn :slotted(svg) {
    fill: var(--color-white-grey);
    width: 30px;
    height: 30px;
}  

.dark-btn:hover {
    background-color: var(--color-main-blue);
    border: 2px solid var(--color-yellow);
    color: var(--color-yellow);
}

</style>