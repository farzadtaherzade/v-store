import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";

import App from "./App.vue";
import router from "./router";
import { useAuthStore } from "./stores/auth";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.mount("#app");

const authStore = useAuthStore();

axios.defaults.headers.common[
  "authorization"
] = `Bearer ${authStore.returnToken}`;
