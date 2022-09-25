<template>
  <div bg-gray-400>
    <p>{{ item.id }}. {{ item.name }}</p>
    <p>{{ item.remarks }}</p>
  </div>
</template>

<script setup>
  import { useRoute } from "vue-router";
  import { ref } from "vue";

  const route = useRoute()
  const item = ref(route.params.list)
  console.log(route.params.list);
</script>