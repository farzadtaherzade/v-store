<script setup>
defineProps({
  title: String,
  price: Number,
  quantity: Number,
  cover: String,
  slug: String,
});
</script>

<template>
  <div
    class="w-full bg-white drop-shadow-2xl rounded-xl flex flex-row items-center justify-between p-10"
  >
    <div class="flex items-center gap-10">
      <div class="w-36 h-28">
        <RouterLink :to="{ name: 'product', params: { slug } }">
          <img
            :src="'http://localhost:8000/' + cover"
            alt="test"
            class="w-full h-full object-fill rounded-2xl"
          />
        </RouterLink>
      </div>
      <div class="flex flex-col gap-5">
        <p class="font-bold">{{ title }}</p>
        <p class="font-bold">{{ price }} $</p>
      </div>
    </div>
    <div>
      <span
        class="bg-white border border-indigo-800 py-1.5 cursor-pointer px-3 rounded-tl-lg rounded-bl-lg hover:bg-indigo-800 duration-300 hover:text-white"
        @click="$emit('increase', slug)"
        >+</span
      >
      <span
        class="bg-white border border-indigo-800 py-1.5 px-3 border-l-0 border-r-0 hover:bg-indigo-800 duration-300 hover:text-white"
      >
        {{ quantity }}
      </span>
      <span
        class="bg-white border border-indigo-800 py-1.5 cursor-pointer px-3 rounded-tr-lg rounded-br-lg hover:bg-indigo-800 duration-300 hover:text-white"
        @click="$emit('decrease', slug)"
        >-</span
      >
    </div>
  </div>
</template>
