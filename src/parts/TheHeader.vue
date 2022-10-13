<template>
  <header class="relative w-full flex justify-center items-center bg-[rgb(255,255,255)] p-4 shadow-md">
    <h2 class="font-bold text-xl">{{ title }}</h2>
    <div class="absolute right-3">
      <router-link class="mr-1" to="/register">
        <TheNormalBtn>
          ログイン
        </TheNormalBtn>
      </router-link>
      <router-link to="/sign-in">
        <the-normal-btn>
          新規登録
        </the-normal-btn>
      </router-link>
    </div>
  </header>
  
</template>

<script setup>
  import { defineProps } from "vue";
  import TheNormalBtn from "../parts/TheNormalBtn.vue";

  defineProps({
    title: String
  })
</script>