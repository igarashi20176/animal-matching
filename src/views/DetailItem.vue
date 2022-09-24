<template>
  <p>{{ list.id }}. {{ list.name }}</p>
  <p>{{ list.remarks }}</p>
</template>

<script setup>
  import { useRoute } from "vue-router";

  const route = useRoute()
  const list = route.params.list

</script>