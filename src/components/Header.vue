<script setup>
import { useAuthStore } from "../stores/auth";
import { useProductStore } from "../stores/product";

const productStore = useProductStore();
const authStore = useAuthStore();
</script>

<template>
  <header class="bg-white drop-shadow-lg w-full p-5 fixed top-0 left-0">
    <div class="container mx-auto flex justify-between items-center">
      <RouterLink :to="{ name: 'home' }" class="text-xl font-bold"
        >VueShop</RouterLink
      >
      <div class="flex gap-5 items-center">
        <RouterLink :to="{ name: 'cart' }" class="relative">
          <img src="../assets/cart.png" alt="cart" class="w-7 h-auto" />
          <span
            class="absolute -top-3.5 -right-3.5 p-1 px-2.5 text-[0.7rem] text-white bg-indigo-600 rounded-full"
            >{{ productStore.shopLength }}</span
          >
        </RouterLink>
        |
        <RouterLink
          class="hover:underline"
          :to="{ name: 'register' }"
          v-if="!authStore.isAuth"
          >Login/Signup</RouterLink
        >
        <RouterLink class="hover:underline" :to="{ name: 'profile' }" v-else
          >Profile</RouterLink
        >
      </div>
    </div>
  </header>
</template>
