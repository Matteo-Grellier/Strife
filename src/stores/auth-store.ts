import { defineStore } from "pinia";
import api from "@/boot/axios";
import { router } from "@/router";

// const router = useRouter();
export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token"),
    username: localStorage.getItem("username"),
    returnUrl: null,
  }),
  actions: {
    login(username: string, password: string) {
      api
        .post("/login", {
          username: username,
          password: password,
        })
        .then((user) => {
          this.token = user.data.token;
          this.username = username;
          localStorage.setItem("token", user.data.token);
          localStorage.setItem("username", username);
          router.push(this.returnUrl || "/");
        })
        .catch((err) => {
          alert("Connection Failed");
        });
    },
    getToken: () => {
      return (localStorage.getItem("token") || "null");
    },
    logout() {
      this.token = null;
      localStorage.removeItem("token");
    },
  },
});
