<script setup>
import { useProductStore } from "../stores/product";
import CardRow from "../components/CardRow.vue";
import CartSummary from "../components/CartSummary.vue";

const useProduct = useProductStore();
</script>

<template>
  <div class="container mx-auto mt-10">
    <div class="grid grid-cols-12 gap-12">
      <div class="grid col-span-12 md:col-span-8 gap-5">
        <CardRow
          v-for="cart in useProduct.carts"
          :key="cart._id"
          :title="cart.title"
          :cover="cart.cover"
          :price="cart.price"
          :quantity="cart.quantity"
          :slug="cart.slug"
          @increase="useProduct.increaseQuantity"
          @decrease="useProduct.decreaseQuantity"
        />
      </div>
      <div class="grid col-span-12 md:col-span-4">
        <CartSummary />
      </div>
    </div>
  </div>
</template>