import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { login } from "@/services/users";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {},
  }),
  actions: {
    getJwtToken() {
      return localStorage.getItem("token");
    },
    async handleLogin(params: any) {
      try {
        const res = await login(params);
        localStorage.set("token", res.data.token);
      } catch (e) {
        localStorage.clear();
        throw new Error();
      }
    },
  },
});
