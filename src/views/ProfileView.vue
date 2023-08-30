<script async setup>
import { useUserStore } from "../stores/user";
import { onMounted, reactive, ref } from "vue";
import axios from "axios";

const userStore = useUserStore();
const userInfo = ref();
onMounted(async () => {
  userInfo.value = await userStore.getUserInfo();
  console.log(userInfo.value);
});

async function submitForm() {
  const result = await axios.patch("/user/update", userInfo.value);
  console.log(result);
}
</script>
<template>
  <div class="container mx-auto mt-10 px-10" v-if="userInfo">
    <div class="flex justify-center max-w-2xl mx-auto">
      <form class="mt-7 w-full" @submit.prevent="submitForm">
        <div class="mb-4">
          <label
            for="first_name"
            class="block text-black hover:text-gray-800 font-medium"
            >First Name
          </label>
          <input
            type="text"
            class="w-full p-2.5 rounded-xl border-2 bg-neutral-200 mt-2 outline-none hover:bg-neutral-100 transition-colors duration-200 ease-out focus:border-blue-700"
            v-model="userInfo.first_name"
            id="first_name"
          />
        </div>
        <div class="mb-4">
          <label
            for="last_name"
            class="block text-black hover:text-gray-800 font-medium"
            >Last Name</label
          >
          <input
            type="text"
            class="w-full p-2.5 rounded-xl border-2 bg-neutral-200 mt-2 outline-none hover:bg-neutral-100 transition-colors duration-200 ease-out focus:border-blue-700"
            v-model="userInfo.last_name"
            id="last_name"
          />
        </div>
        <div class="mb-4">
          <label
            for="username"
            class="block text-black hover:text-gray-800 font-medium"
            >Username</label
          >
          <input
            type="text"
            class="w-full p-2.5 rounded-xl border-2 bg-neutral-200 mt-2 outline-none hover:bg-neutral-100 transition-colors duration-200 ease-out focus:border-blue-700"
            v-model="userInfo.username"
            id="username"
          />
        </div>
        <div class="mb-4">
          <label
            for="email"
            class="block text-black hover:text-gray-800 font-medium"
            >Email</label
          >
          <input
            type="email"
            class="w-full p-2.5 rounded-xl border-2 bg-neutral-200 mt-2 outline-none hover:bg-neutral-100 transition-colors duration-200 ease-out focus:border-blue-700"
            disabled
            v-model="userInfo.email"
            id="email"
          />
        </div>
        <button
          type="submit"
          class="w-full flex justify-center items-center py-3 bg-black shadow-2xl text-white rounded-lg"
        >
          Submit Changes
        </button>
      </form>
    </div>
  </div>
</template>
