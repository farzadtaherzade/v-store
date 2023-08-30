<script setup>
import useVuelidate from "@vuelidate/core";
import { required, minLength, email } from "@vuelidate/validators";
import { computed, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "../stores/auth";

const router = useRouter();
const route = useRoute();

const authStore = useAuthStore();

const formData = reactive({
  email: "",
  password: "",
});

const rules = computed(() => {
  return {
    email: { required, email },
    password: { required, minLength: minLength(4) },
  };
});
const v$ = useVuelidate(rules, formData);

const submitForm = async () => {
  const result = await v$.value.$validate();
  if (result) {
    await authStore.getToken(formData.email, formData.password);
    if (route.query.redirect) {
      router.push(route.query.redirect);
    } else {
      router.push({ name: "home" });
    }
  } else {
    alert("error, form not submited");
  }
};
</script>

<template>
  <section class="h-screen w-full flex items-center justify-center">
    <div
      class="md:w-5/12 sm:w-7/12 lg:w-4/12 xl:w-4/12 w-8/12 p-9 border-gray-700 shadow-2xl rounded-xl"
    >
      <span class="font-bold text-black text-2xl">Welcome Back</span>
      <form class="mt-7" @submit.prevent="submitForm">
        <div class="mb-4">
          <label
            for="email"
            class="block text-black hover:text-gray-800 font-medium"
            >Email</label
          >
          <input
            type="email"
            class="w-full p-2.5 rounded-xl border-2 bg-neutral-200 mt-2 outline-none hover:bg-neutral-100 transition-colors duration-200 ease-out focus:border-blue-700"
            :class="{ 'border border-red-800': v$.email.$error }"
            placeholder="example@gmail.com"
            id="email"
            v-model="formData.email"
          />
        </div>
        <div>
          <label
            for="password"
            class="block text-black hover:text-gray-800 font-medium"
            >Password</label
          >
          <input
            type="text"
            class="w-full p-2.5 rounded-xl border-2 bg-neutral-200 mt-2 outline-none hover:bg-neutral-100 transition-colors duration-200 ease-out focus:border-blue-700"
            :class="{ 'border border-red-800': v$.password.$error }"
            placeholder="ExamPle12@"
            id="password"
            v-model="formData.password"
          />
        </div>
        <button
          class="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer mt-6 text-white p-2 rounded-md transition-colors duration-300 ease-out"
        >
          Sign In
        </button>
        <p class="text-sm font-light text-gray-800 dark:text-gray-400 mt-5">
          Don’t have an account yet?
          <RouterLink
            :to="{ name: 'register' }"
            class="font-medium text-black hover:underline"
            >Sign Up</RouterLink
          >
        </p>
      </form>
    </div>
  </section>
</template>