<script setup>
import { defineProps } from "vue";
import { useProductStore } from "../stores/product";
defineProps({
  title: String,
  price: Number,
  cover: String,
  slug: String,
});

const productStore = useProductStore();
</script>

<template>
  <div
    class="w-full bg-white drop-shadow-2xl rounded-xl flex flex-col overflow-hidden"
  >
    <div class="w-full h-[15rem]">
      <RouterLink :to="{ name: 'product', params: { slug } }">
        <img
          :src="'https://vn-store.onrender.com/' + cover"
          alt="test"
          class="w-full h-full object-cover"
        />
      </RouterLink>
    </div>
    <div class="p-5 text-black">
      <p class="text-bold">{{ title }}</p>
      <div
        class="flex justify-between px-5 bg-slate-300-500 text-black py-3 mt-3 shadow-md rounded-lg bg-opacity-80 items-center"
      >
        <span>{{ price }}$</span>
        <button
          class="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-1.5 rounded-xl duration-150"
          @click="$emit('addToCart', slug)"
        >
          {{
            productStore.findProductInCarts(slug) ? "In Cart" : " Add To Cart"
          }}
        </button>
      </div>
    </div>
  </div>
</template>
