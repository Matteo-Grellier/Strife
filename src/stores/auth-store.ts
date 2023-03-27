import { defineStore } from "pinia";
import api from "@/boot/axios";
import { router } from "@/router";

// const router = useRouter();
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
          router.push(this.returnUrl || "/");
        })
        .catch((err) => {
          alert("Connection Failed");
        });
      setTimeout(() => {
        this.refreshToken();
      }, 2000 * 60 * 60);
    },

    getToken: () => {
      return JSON.parse(localStorage.getItem("token") || "null");
    },
    refreshToken() {
      const JWT = this.getToken();

      const config = {
        headers: {
          Authorization: `Bearer ${JWT}`,
        },
      };

      api.post("/protected/extend_session", {}, config).then((user) => {
        this.token = user;
        localStorage.setItem("token", JSON.stringify(user.data.token));
      });
      setTimeout(() => {
        this.refreshToken();
      }, 2000 * 60 * 60);
    },
    logout() {
      this.token = null;
      localStorage.removeItem("token");
    },
  },
});
