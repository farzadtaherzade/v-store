import axios from "axios";
import { acceptHMRUpdate, defineStore } from "pinia";
import { useAuthStore } from "./auth";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {},
  }),
  getters: {
    userInfo: (state) => state.user,
  },
  actions: {
    async getUserInfo() {
      const authStore = useAuthStore();
      axios.defaults.headers.common[
        "authorization"
      ] = `Bearer ${authStore.returnToken}`;
      const user = await axios.get("/user/me");
      this.user = user.data.user;
      return this.user;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
