<script setup lang="ts">
import { useUserStore } from '../stores/user-store'

import {ref} from 'vue' 


// const api =  axios.create({ baseURL: "https://edu.tardigrade.land/msg" })
const userStore = useUserStore()
const data = ref({
            username: '',
            password: ''
        });

        const handleLogin = async () => {
            console.log(data)
  try {
    await userStore.handleLogin(data)
    alert("Connected")
  } catch (e) {
    alert("Connection error")
  }
}
// const handleSubmit = async () => {
        
//         console.log(data);

//             await axios.post("https://edu.tardigrade.land/msg/login",data)
//             .then((res) => {
//                 const token = res.data.token;
//                 alert("Connexion réussie");
//                 localStorage.setItem("token", token);
               
//             })
//             .catch((err) => {
//                 console.error(err);
//                 alert("Connexion échouée");
//             });
//     };




</script>
<template>
     <div id="app">
    <form class="">
      <h2>Login</h2>
      <div class="">
        <label class="" for="username">Username</label>
        <input
          id="username"
          name="username"
          type="username"
          v-model="data.username"
          class=""
        />
      </div>
      <div class="">
        <label class="" for="username">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          v-model="data.password"
          class=""
        />
      </div>
      <button class="" @click="handleLogin" >Login</button>
    </form>
  </div>

</template>



<style scoped >

</style>