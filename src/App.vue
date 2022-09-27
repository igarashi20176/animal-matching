<template>
  <the-header :title="title" />

  <the-routing-btn-col3 :btn-a="btnA" :btn-b="btnB" :btn-c="btnC" />

  <div class="scroll h-[450px] w-[800px] overflow-auto border-2 rounded-2xl m-auto p-2 bg-[#f9fafb]">
    <router-view />
  </div>

  <the-footer>
    <h2 class="text-center">@copyright.inc</h2>
  </the-footer>
</template>

<script setup>
import TheHeader from './parts/TheHeader.vue';
import TheFooter from './parts/TheFooter.vue';
import TheRoutingBtnCol3 from './parts/TheRoutingBtnCol3.vue';

const title = "あにまるちゃーと"

const btnA = {
  key: "診断",
  path: "/chart"
}

const btnB = {
  key: "お気に入り",
  path: { name: 'list', params: { filter: true } }
}

const btnC = {
  key: "一覧",
  path: "/list"
}

</script>

<style scoped>
  .scroll::-webkit-scrollbar{
    display: none;
  }
</style>