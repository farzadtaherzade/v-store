<script setup>
import { onMounted, ref } from "vue";
import CheckoutItem from "../components/CheckoutItem.vue";
import { useProductStore } from "../stores/product";

const productStore = useProductStore();
const orders = ref([]);

onMounted(async () => {
  orders.value = await productStore.getAllCheckouts();
});
</script>

<template>
  <div class="container mx-auto">
    <div class="flex flex-col gap-10">
      <CheckoutItem
        v-for="order in orders"
        :key="order._id"
        :user="order.user_detail"
        :total-amount="order.totalAmount"
        :cart-items="order.cartItems"
      />
    </div>
  </div>
</template>
