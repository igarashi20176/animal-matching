<template>
  <div class="relative p-3 bg-amber-50 rounded-2xl border-2 shadow-[6px_4px_5px_0px_rgba(0,0,0,0.3)] border-gray-400">
    <the-normal-btn />
    <p class="mb-4 font-bold text-3xl text-center"><span class="text-2xl">名前:</span> {{ animal.name }}</p>
    <figure class="flex">
      <img
        class="w-[300px] h-[350px] rounded-xl border-2 border-gray-400" 
        :src="`${animal.imgURL}`" :alt="animal.name">
      <figcaption class="ml-3 text-2xl">
        <div class="text-center font-bold">
          <p class="text-center my-5 font-bold text-2xl">
            <span class="text-blue-500" v-if="animal.gender === 'male'">♂オス</span> 
            <span class="text-red-500" v-else>♀メス</span>
            {{ animal.age }}歳 / {{ animal.place }}
          </p>
          <p class="mb-10 ">
            性格: {{ animal.chara.join(", ") }}
          </p>
          <p>詳細</p>
        </div>
        <p class="mt-2 p-2 rounded-lg bg-white border-2 border-gray-400">{{ animal.remarks }}</p>
      </figcaption>
    </figure>
  </div>
</template>

<script setup>
  import { TheNormalBtn } from "../parts/TheNormalBtn.vue";

  const props = defineProps({
    animal: Object
  })

  const emits = defineEmits([ 'change-list' ])
</script>