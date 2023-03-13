import { createRouter, createWebHistory, useRouter } from "vue-router";
import NotFoundView from "../views/404.vue";
import HomeView from "../views/HomeView.vue";
import CreateChannelView from "../views/CreateChannelView.vue";
import { useAuthStore } from "@/stores/auth-store";

const isAuthenticated = () => {
  const auth = useAuthStore();
  auth.getToken();
  console.log(auth.getToken());
  if (auth.getToken() === null) {
    return false;
  } else {
    return true;
  }
};

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/CreateChannel",
      name: "createChannel",
      component: CreateChannelView,
      beforeEnter() {
        if (!isAuthenticated()) {
          return { name: "login" };
        }
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFoundView,
    },
  ],
});
