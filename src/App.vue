<template>
  <header class="bg-[#f9fafb] p-4 text-center">
    <h2 class="font-bold">あにまるちゃーと</h2>
  </header>
  <div class="w-2/5 min-w-[500px] m-auto box-border mt-10 mb-8 p-2 border-2 rounded-3xl flex justify-center text-center bg-[#f9fafb]">
    <router-link to="/chart">
      <button class="w-[100px] border-2 rounded-md p-1 mx-1  active:bg-red-400">
        診断
      </button>
    </router-link>
    <router-link :to="{ name: 'list', params: { filter: true } }">
      <button class="w-[100px] border-2 rounded-md p-1 mx-1  active:bg-red-400">
        お気に入り
      </button>
    </router-link>
    <router-link to="/list">
      <button class="w-[100px] border-2 rounded-md p-1 mx-1  active:bg-red-400">
        一覧
      </button>
    </router-link>
  </div>
  <div class="scroll h-[450px] w-[800px] overflow-auto border-2 rounded-2xl m-auto p-2 bg-[#f9fafb]">
    <router-view />
  </div>
  <footer class=" mt-10 text-center p-3 bg-[#fef9c3]">
    @copyright.inc
  </footer>
</template>

<script setup>
</script>

<style scoped>
  .scroll::-webkit-scrollbar{
    display: none;
  }
</style>