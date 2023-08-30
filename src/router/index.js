import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import ProfileView from "../views/ProfileView.vue";
import CartView from "../views/CartView.vue";
import CheckOutView from "../views/CheckOutView.vue";
import ProductView from "../views/ProductView.vue";
import { useAuthStore } from "../stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfileView,
    },
    {
      path: "/profile/checkout",
      name: "checkout",
      component: CheckOutView,
    },
    {
      path: "/product/:slug",
      name: "product",
      component: ProductView,
    },
    {
      path: "/cart",
      name: "cart",
      component: CartView,
    },
  ],
});

router.beforeEach((to, from) => {
  const authStore = useAuthStore();
  if (authStore.isAuth && (to.name === "login" || to.name === "register")) {
    return { name: "home" };
  }
  if (!authStore.isAuth && (to.name === "profile" || to.name === "checkout")) {
    return { name: "login", query: { redirect: to.fullPath } };
  }
});

export default router;
