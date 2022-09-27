<template>
  <a class="block cursor-pointer" @click.prevent="showDetailItem(list.id)">
    <div class="relative m-6 p-2 border-2 border-gray-400 rounded-3xl bg-[#d6d3d1] hover:shadow-[0_0_8px_3px_rgba(0,0,0,0.3)] transition hover:translate-y-[-2px]">
      <img 
        class="w-[100px] h-auto border-4 border-[#e2e8f0] rounded-[9999px] ml-12"
        :src="`/src/assets/images/${list.img}.jpg`" :alt="list.img">
      <div class="absolute top-4 left-1/4"> 
        <p class="text-3xl font-bold mb-3">
          {{ list.name }}
          <button v-if="list.isFav"
            @click.stop="clickFav(list.id)"
            class="text-[40px] text-red-500 translate-y-1">
            &hearts;
           </button>
          <button v-else
            @click.stop="clickFav(list.id)"
            class="text-[40px] text-red-500 translate-y-1">
            &#9825;
          </button>
        </p>
        <p class="text-2xl font-bold mb-4">
          <span class="text-blue-500" 
            v-if="list.gender === 'オス'">♂</span> <span class="text-red-500" v-else>♀
            </span>
          {{ list.gender }} ( {{ list.age }}歳 <span v-if="list.week">{{ list.week }}週</span> ) 
        </p>
        <p class="text-xl font-bold">個性: {{ list.chara }}</p>
      </div>        
      <img src="../assets/images/arrow.png" alt="arrow" class="absolute top-1/3 right-5 w-[50px] h-auto rotate-90">
    </div>
  </a>
</template>

<script setup>
  import { defineProps } from "vue";
  import store from "../store/store";
  import { useRouter } from "vue-router";

  const router = useRouter()
  defineProps({
    list: Object
  })

  const clickFav = id => {
    store.commit('toggleFav', id)
  }

  const showDetailItem = id => {
    router.push({ name: 'detail', params: { id: id } })
  }
</script>