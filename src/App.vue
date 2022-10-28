<template>
  <the-header />

  <the-routing-btn-col3 :btn-a="routingBtns[0]" :btn-b="routingBtns[1]" :btn-c="routingBtns[2]" />

  <div class="relative m-auto p-2 lg:w-3/5 h-[450px] bg-[#fff] border-2 border-gray-400 rounded-2xl scroll-none overflow-auto">
    <router-view />
  </div>

  <the-footer>
    <h2 class="text-center">@copyright.inc</h2>
  </the-footer>
</template>

<script setup>
import TheHeader from './templates/TheHeader.vue';
import TheFooter from './parts/TheFooter.vue';
import TheRoutingBtnCol3 from './parts/TheRoutingBtnCol3.vue';

const routingBtns = [
  {
    tag: "診断",
    path: "/matching"
  },
  {
    tag: "一覧",
    path: "/list"
  },
  {
    tag: "追加",
    path: "/add"
  }
]

</script>

<style scoped>
  .scroll-none::-webkit-scrollbar{
    display: none;
  }

</style>