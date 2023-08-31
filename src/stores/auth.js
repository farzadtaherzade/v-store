import axios from "axios";
import { acceptHMRUpdate, defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: "",
    isAuth: false,
  }),
  getters: {
    returnToken: (state) => state.token,
  },
  actions: {
    async getToken(email, password) {
      const result = await axios.post("/auth/login", { email, password });
      if (result.data.statusCode == 200) {
        this.token = result.data.token;
        this.isAuth = true;
        this.setItemToLocal(this.returnToken);
      }
      return result.data.statusCode;
    },
    async register(data) {
      const result = await axios.post("/auth/register", data);
      return result.status;
    },
    async checkToken() {
      const token = localStorage.getItem("token");
      if (token) {
        this.token = token;
        this.isAuth = true;
        this.setItemToLocal(token);
      } else {
        this.token = "";
        this.isAuth = false;
        localStorage.removeItem("token");
      }
    },
    setItemToLocal(str) {
      localStorage.setItem("token", str);
    },
    logout() {
      localStorage.removeItem("token");
      this.token = "";
      this.isAuth = false;
      return "logout";
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
