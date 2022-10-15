<template>
  <the-header :title="title" />

  <the-routing-btn-col3 :btn-a="routingBtns[0]" :btn-b="routingBtns[1]" :btn-c="routingBtns[2]" />

  <div class="relative scroll h-[450px] w-[800px] overflow-auto border-2 border-gray-400 rounded-2xl m-auto p-2 bg-[#fff]">
    <router-view />
  </div>

  <the-footer>
    <h2 class="text-center">@copyright.inc</h2>
  </the-footer>

  <h2>
    kadah
  </h2>
</template>

<script setup>
import TheHeader from './parts/TheHeader.vue';
import TheFooter from './parts/TheFooter.vue';
import TheRoutingBtnCol3 from './parts/TheRoutingBtnCol3.vue';

const title = "あにまるまっちんぐ"

const routingBtns = [
  {
    tag: "診断",
    path: "/chart"
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
  .scroll::-webkit-scrollbar{
    display: none;
  }

</style>