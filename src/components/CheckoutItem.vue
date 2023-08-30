<script setup>
defineProps({
  totalAmount: Number,
  user: Object,
  cartItems: Object,
});
</script>

<template>
  <div
    class="w-full bg-slate-200   drop-shadow-2xl rounded-xl flex flex-col justify-between p-10 gap-3"
  >
    <span class="font-bold">Checkout Detail</span>
    <div class="flex items-center flex-col md:flex-row gap-10">
      <div
        class="flex flex-col basis-8/12 w-full gap-2 bg-white p-5 rounded-xl shadow-xl"
      >
        <span class="font-bold text-center">Account Detail</span>
        <span class="font-semibold">Username: {{ user.username }}</span>
        <span class="font-semibold"
          >FullName: {{ user.first_name + " " + user.last_name }}</span
        >
        <span class="font-semibold">Email: {{ user.email }}</span>
      </div>
      <div
        class="flex flex-col basis-4/12 gap-2 w-full bg-white p-5 rounded-xl shadow-xl"
      >
        <span class="font-bold text-center">Product Detail</span>
        <span class="font-semibold" v-for="(item, id) in cartItems" :key="id">
          {{ item.product }} * {{ item.price }} : {{ item.price }}$
        </span>

        <hr />
        <span class="font-semibold">Total Amount: {{ totalAmount }}$</span>
      </div>
    </div>
  </div>
</template>
