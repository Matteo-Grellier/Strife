import { defineStore } from "pinia";
import api from "@/boot/axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: JSON.parse(JSON.stringify(localStorage.getItem("token"))),
    returnUrl: null,
  }),
  actions: {
    login(username: any, password: any) {
      api
        .post("/login", {
          username: username,
          password: password,
        })
        .then((user) => {
          this.token = user;
          localStorage.setItem("token", JSON.stringify(user.data.token));
          alert("Connexion Réussi");
        })
        .catch((err) => {
          console.log(err);
          alert("Connection Failed");
        });
    },
    getToken: () => {
      return localStorage.getItem("token");
    },
    logout() {
      this.token = null;
      localStorage.removeItem("token");
    },
  },
});