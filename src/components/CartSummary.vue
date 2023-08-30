<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { useProductStore } from "../stores/product";

const productStore = useProductStore();
const authStore = useAuthStore();
const router = useRouter();

async function checkoutHandler() {
  const result = await productStore.addnewCheckout();
  console.log(result);
  if (result.statusCode === 201) {
    router.push({ name: "checkout" });
  }
}
</script>

<template>
  <div
    class="w-full h-auto bg-white drop-shadow-2xl rounded-xl flex flex-col gap-y-7 p-10"
  >
    <p class="font-bold text-3xl">Cart Summary</p>
    <div class="flex items-center justify-between">
      <p class="font-semibold text-1xl">Total Product:</p>
      <span class="font-normal">{{ productStore.carts.length }}</span>
    </div>
    <hr />
    <div class="flex items-center justify-between">
      <p class="font-semibold text-1xl">Total Price:</p>
      <span class="font-normal">{{ productStore.totalPrice }}$</span>
    </div>
    <button
      @click="checkoutHandler"
      v-if="authStore.isAuth"
      class="bg-indigo-500 hover:bg-indigo-600 text-white flex items-center justify-center py-2 rounded-md duration-200"
    >
      Go to checkout
    </button>
    <RouterLink
      :to="{ name: 'login', query: { redirect: 'cart' } }"
      v-else
      class="bg-indigo-500 hover:bg-indigo-600 text-white flex items-center justify-center py-2 rounded-md duration-200"
    >
      Go to Checkout
    </RouterLink>
  </div>
</template>