
<script lang="ts" setup>
// N.B : This spinner comes from https://10015.io/tools/css-loader-generator !
</script>
<template>
    <div class="spinner"></div>
</template>
<style>
.spinner {
   position: relative;
   width: 56px;
   height: 56px;
   display: flex;
   align-items: center;
   justify-content: center;
}

.spinner::before,
.spinner::after {
   border: 6.7px solid #ffb400;
   border-radius: 50%;
   position: absolute;
   content: '';
   display: block;
}

.spinner::before {
   width: 33.6px;
   height: 33.6px;
   border-bottom-color: transparent;
   border-left-color: transparent;
   animation: spinner-1o3y8q 0.75s infinite linear reverse;
}

.spinner::after {
   animation: spinner-1o3y8q 0.5s infinite linear;
   height: 56px;
   width: 56px;
   border-right-color: transparent;
   border-top-color: transparent;
}

@keyframes spinner-1o3y8q {
   to {
      transform: rotate(360deg);
   }
}
</style>