import { createRouter, createWebHistory, useRouter } from "vue-router";
import NotFoundView from "../views/404.vue";
import HomeView from "../views/HomeView.vue";

import { useAuthStore } from "@/stores/auth-store";
import { useChannelStore } from "@/stores/channel";
import api from '@/boot/axios';

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
      components: {
        default: () => import('../views/HomeView.vue'),
        ChannelSidebar: () => import('../components/ChannelSidebar.vue'),
      }
    },
    {
      path:"/channel/:channelId",
      name: "channel",
      components: {
        default: () => import('../views/ChannelView.vue'),
        ChannelSidebar: () => import('../components/ChannelSidebar.vue'),
        MemberSidebar: () => import('../components/MemberSidebar.vue'),
      }
    },
    {
      path: "/C ChannelSideBareateChannel",
      name: "createChannel",
      component: () => import("../views/CreateChannelView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFoundView,
    },
  ],
});

const isAuthenticated = () => {
  const auth = useAuthStore();

  if (!auth.token) {
    return false;
  } else {
    return true;
  }
};

const getAllChannel = async () => {
  const auth = useAuthStore();
  const token = auth.getToken();
  
  const config = {
    headers: {
        Authorization: `Bearer ${token}`
    }
  }
  const response = await api.get('/protected/user/channels', config);

  return response.data;
}

router.beforeEach(async (to, from, next) => {

  if(to.name == "login") return next();

  if(!isAuthenticated()) next({name: "login"});

  const channelStore = useChannelStore();

  if(channelStore.selectedChannel.id == -1) {
      const channels = await getAllChannel();
      channelStore.channels = channels;
      console.log(channelStore.channels);
    }

  next();
})
