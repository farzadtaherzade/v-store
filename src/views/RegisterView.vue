<script setup>
import { computed, reactive } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, minLength, sameAs, email } from "@vuelidate/validators";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const formData = reactive({
  username: "",
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const rules = computed(() => {
  return {
    username: { required },
    first_name: { required },
    last_name: { required },
    email: { required, email },
    password: { required, minLength: minLength(8) },
    confirmPassword: {
      sameAs: sameAs(formData.password),
    },
  };
});

const v$ = useVuelidate(rules, formData);

const submitForm = async () => {
  const result = await v$.value.$validate();
  if (result) {
    await authStore.register(formData);
    router.push({ name: login });
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
        <div class="grid grid-cols-2 gap-3">
          <div class="mb-4">
            <label
              for="first_name"
              class="block text-black hover:text-gray-800 font-medium"
              >First Name</label
            >
            <input
              type="text"
              class="w-full p-2.5 rounded-xl border-2 bg-neutral-200 mt-2 outline-none hover:bg-neutral-100 transition-colors duration-200 ease-out focus:border-blue-700"
              :class="{ 'border border-red-800': v$.first_name.$error }"
              placeholder="John"
              id="first_name"
              v-model="formData.first_name"
            />
            <!-- <span
            v-for="error in v$.first_name.$errors"
            :key="error.$uid"
            class="text-red-700"
          >
            {{ error.$message }}
          </span> -->
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
              :class="{ 'border border-red-800': v$.last_name.$error }"
              placeholder="Wick"
              id="last_name"
              v-model="formData.last_name"
            />
            <!-- <span
            v-for="error in v$.last_name.$errors"
            :key="error.$uid"
            class="text-red-700"
          >
            {{ error.$message }}
          </span> -->
          </div>
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
            :class="{ 'border border-red-800': v$.email.$error }"
            placeholder="example@gmail.com"
            id="email"
            v-model="formData.email"
          />
          <!-- <span
            v-for="error in v$.email.$errors"
            :key="error.$uid"
            class="text-red-700"
          >
            {{ error.$message }}
          </span> -->
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
            :class="{ 'border border-red-800': v$.username.$error }"
            placeholder="John Killer"
            id="username"
            v-model="formData.username"
          />
          <!-- <span
            v-for="error in v$.email.$errors"
            :key="error.$uid"
            class="text-red-700"
          >
            {{ error.$message }}
          </span> -->
        </div>
        <div>
          <label
            for="password"
            class="block text-black hover:text-gray-800 font-medium"
            >Password</label
          >
          <input
            type="password"
            class="w-full p-2.5 rounded-xl border-2 bg-neutral-200 mt-2 outline-none hover:bg-neutral-100 transition-colors duration-200 ease-out focus:border-blue-700"
            :class="{ 'border border-red-800': v$.password.$error }"
            placeholder="ExamPle12@"
            id="password"
            v-model="formData.password"
          />
          <span
            v-for="error in v$.password.$errors"
            :key="error.$uid"
            class="text-red-700"
          >
            {{ error.$message }}
          </span>
        </div>
        <div>
          <label
            for="confirmPassword"
            class="block text-black hover:text-gray-800 font-medium"
            >Confirm Password</label
          >
          <input
            type="password"
            class="w-full p-2.5 rounded-xl border-2 bg-neutral-200 mt-2 outline-none hover:bg-neutral-100 transition-colors duration-200 ease-out focus:border-blue-700"
            :class="{ 'border border-red-800': v$.confirmPassword.$error }"
            placeholder="ExamPle12@"
            id="confirmPassword"
            v-model="formData.confirmPassword"
          />
          <span
            v-for="error in v$.confirmPassword.$errors"
            :key="error.$uid"
            class="text-red-700"
          >
            {{ error.$message }}
          </span>
        </div>
        <button
          class="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer mt-6 text-white p-2 rounded-md transition-colors duration-300 ease-out"
        >
          Sign Up
        </button>
        <p class="text-sm font-light text-gray-800 dark:text-gray-400 mt-5">
          Already have an account?
          <RouterLink
            :to="{ name: 'login' }"
            class="font-medium text-black hover:underline"
            >Sign In</RouterLink
          >
        </p>
      </form>
    </div>
  </section>
</template>