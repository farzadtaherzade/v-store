<script setup>
import { ref, onMounted, watch } from "vue";
import CardItem from "../components/CardItem.vue";
import { useProductStore } from "../stores/product";

const useProduct = useProductStore();
const products = ref([]);

async function addToCart(slug) {
  await useProduct.addToCart(slug);
}

onMounted(async () => {
  products.value = await useProduct.getAllProducts();
});
</script>

<template>
  <div class="container mx-auto mt-10">
    <section
      class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-24"
    >
      <CardItem
        v-for="product in products"
        :key="product._id"
        :title="product.title"
        :cover="product.cover"
        :price="product.price"
        :slug="product.slug"
        @add-to-cart="addToCart"
      />
    </section>
  </div>
</template>
