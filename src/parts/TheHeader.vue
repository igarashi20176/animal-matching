<template>
  <header class="bg-[#f9fafb] p-4 text-center">
    <h2 class="font-bold text-xl">{{ title }}</h2>
  </header>
</template>

<script setup>
  import { defineProps } from "vue";

  defineProps({
    title: String
  })
</script>