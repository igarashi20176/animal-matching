<template>
  <div class="relative">
    <h2
      class="font-bold text-center text-3xl width-[2px] py-3 mb-14 border-b-2 border-gray-400">
      一覧
    </h2>
    <button 
      class="absolute top-[8%] right-3 border-2 p-1 rounded-xl bg-gray-300"
      @click="isFilter = !isFilter">
      フィルター機能
    </button>
    <div v-if="isFilter" class="absolute p-1 text-md top-[5%] right-[16%] bg-orange-400 z-10 rounded-2xl">
      <div 
        class="relative inline-block w-[200px] h-[250px] p-4 font-bold text-[#fff] text-center 
        before:content-[''] before:absolute before:top-[25px] before:left-full before:border-solid before:border-[15px] before:border-transparent before:border-l-[15px] before:border-l-orange-400 ">
        <p>フィルターを選択してね</p>
      </div>
    </div>

    <ul v-for="list in lists">
      <li :key="list.id">
        <AnimalListItem :list="list" />
      </li>
    </ul>
  </div>
</template>

<script setup>
  import { computed, ref } from "vue"
  import { useStore } from "vuex"
  import AnimalListItem from "../parts/AnimalListItem.vue";
  
  const store = useStore()
  let isFilter = ref(false)

  // 動物のリストをすべて取得
  const lists = computed( () => store.getters.getAll )


</script>