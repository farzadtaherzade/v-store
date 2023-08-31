<script setup>
import { onMounted } from "vue";
import { RouterView, useRoute } from "vue-router";
import Header from "./components/Header.vue";
import { useAuthStore } from "./stores/auth";

const authStore = useAuthStore();
onMounted(async () => {
  await authStore.checkToken();
});
</script>
<template>
  <main class="flex flex-col min-h-screen">
    <div class="container mx-auto pt-20">
      <Header />
    </div>
    <RouterView />
  </main>
</template>
