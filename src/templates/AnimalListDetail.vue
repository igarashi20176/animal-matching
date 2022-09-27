<template>
  <div class="relative p-3 bg-[#d6d3d1]">
    <p class="mb-4 font-bold text-2xl text-center">名前: {{ list.name }}</p>
    <figure class="flex">
      <img 
        class="w-[250px] h-[350px] rounded-xl border-4"
        :src="`/src/assets/images/${list.img}.jpg`" :alt="list.name">
      <figcaption class="ml-3 text-2xl">
        <div class="text-center font-bold">
          <p class="text-center my-5 font-bold">
            <span class="text-blue-500" v-if="list.gender === 'オス'">♂</span> 
            <span class="text-red-500" v-else>♀</span>
            {{ list.gender }} {{ list.age }}歳 <span v-if="list.week">{{ list.week }}週</span>
          </p>
          <p class="mb-10">
            性格: {{ list.chara }}
          </p>
          <p>詳細</p>
        </div>
        <p class="mt-2 p-2 rounded-lg bg-white">{{ list.remarks }}</p>
      </figcaption>
    </figure>
    <router-link to="/list">
      <button class="absolute top-3 py-2 p-6  rounded-xl bg-white">戻る</button>
    </router-link>
  </div>
</template>

<script setup>
  import { useRoute } from "vue-router";
  import { computed } from "vue";
  import { useStore } from "vuex";

  const route = useRoute()
  const store = useStore()

  const list = store.getters.getAnimalById(Number(route.params.id))
</script>