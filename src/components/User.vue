<script setup lang="ts">
  const props = defineProps<{
    username: string,
    isAdmin: boolean,
  }>();

  var textClass = "usernameClass";

  if (props.isAdmin == true) 
  {
    textClass =  "adminUsernameClass";
  }
</script>

<template>
  <div class="userDiv">
    <h3 :class="textClass" >{{ isAdmin ? username + "  ✨" : username}}</h3>
  </div>
</template>

<style scoped>
  .userDiv{
    display: flex;
    flex-direction: row;
    background-color: #1F2630;
    width: 200px;
    height: 50px;
    border-radius: 10px;
    margin-bottom: 10px;
    margin-top: 10px;
    align-items: center;
    padding-left: 2px;
    cursor: pointer;
  }

  .userDiv:hover {
    background-color: #2B3542;
  }

  .usernameClass {
    margin: 0px;
    margin-left: 10px;
  }
  .adminUsernameClass {
    margin: 0px;
    margin-left: 10px;
    color: var(--color-yellow);
  }

  .channelLogo {
    height: 50px;
    width: 50px;
  }
</style>
