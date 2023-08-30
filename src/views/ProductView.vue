<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useProductStore } from "../stores/product.js";

const route = useRoute();
const productStore = useProductStore();
const slug = ref(route.params.slug);

onMounted(async () => {
  await productStore.getOneProduct(slug.value);
});
const addToCart = () => {
  productStore.addToCart(slug.value);
};
</script>

<template>
  <div class="container mx-auto mt-10" v-if="productStore.product">
    <div class="flex flex-col md:flex-row h-[30rem] gap-20">
      <div class="basis-6/12 w-full">
        <img
          :src="'https://vn-store.onrender.com/' + productStore.product.cover"
          :alt="productStore.product.title"
          class="w-full rounded-lg object-fill h-[30rem]"
        />
      </div>
      <div
        class="basis-6/12 flex flex-col h-full bg-slate-50 border border-white p-8 shadow-xl justify-between"
      >
        <div class="flex flex-col gap-10">
          <p class="text-black font-semibold">
            Title: {{ productStore.product.title }}
          </p>
          <p class="text-black font-semibold text-2xl">
            Description:
            {{ productStore.product.description }}
          </p>
        </div>
        <div
          class="flex justify-between px-5 bg-slate-300-500 text-black py-3 mt-3 shadow-md rounded-lg bg-opacity-80 items-center"
        >
          <span>Price: {{ productStore.product.price }} $</span>
          <button
            class="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-1.5 rounded-xl duration-150"
            @click="addToCart"
          >
            {{
              productStore.findProductInCarts(slug) ? "In Cart" : " Add To Cart"
            }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
