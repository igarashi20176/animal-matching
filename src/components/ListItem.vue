<template>
  <ul v-for="(list, idx) in lists">
    <a class="block cursor-pointer">
      <li :key="list.id">
        <div class="relative m-6 p-2 border-2 border-gray-400 rounded-3xl bg-gray-300 hover:shadow-[0_0_8px_3px_rgba(0,0,0,0.4)]">
          <img 
            class="w-[100px] h-auto border-4 border-[#e2e8f0] rounded-[9999px] ml-12"
            :src="`/src/assets/images/${list.img}.jpg`"
            :alt="list.img">
          <div class="absolute top-4 left-1/4"> 
            <p class="text-3xl font-bold mb-3">{{ idx+1 }}. {{ list.name }}</p>
            <p class="text-2xl font-bold mb-4">
              <span class="text-blue-500" v-if="list.gender === 'オス'">♂</span> <span class="text-red-500" v-else>♀</span>
              {{ list.gender }} ( {{ list.age }}歳 {{ list.week }}週 ) 
            </p>
            <p class="text-xl font-bold">個性: {{ list.chara }}</p>
          </div>        
          <button v-if="list.isFav"
            @click="clickFav(list.id)"
            class="absolute top-[40%] right-[12%] text-[4em] text-red-500 ">
            &hearts;
          </button>
          <button v-else
            @click="clickFav(list.id)"
            class="absolute top-[40%] right-[12%] text-[4em] text-red-500">
            &#9825;
          </button>
        </div>
      </li>
    </a>
  </ul>
</template>

<script setup>
  import { defineProps } from "vue";
  import store from "../store/store";
  import { useRouter } from "vue-router";

  const router = useRouter()
  defineProps({
    lists: Object
  })

  const clickFav = id => {
    store.commit('toggleFav', id)
  }
</script>