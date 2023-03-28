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
      setTimeout(() => {
        this.refreshToken();
      }, 1000 * 60 * 60);
    },

    getToken: () => {
      return localStorage.getItem("token") || "null";
    },
    refreshToken() {
      const JWT = this.getToken();

      const config = {
        headers: {
          Authorization: `Bearer ${JWT}`,
        },
      };

      api.post("/protected/extend_session", {}, config).then((user) => {
        this.token = user.data.token;
        localStorage.setItem("token", user.data.token);
      });
      setTimeout(() => {
        this.refreshToken();
      }, 1000 * 60 * 60);
    },
    logout() {
      this.token = null;
      localStorage.removeItem("token");
    },
  },
});
