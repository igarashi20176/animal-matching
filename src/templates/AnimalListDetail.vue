<template>
  <div class="relative p-3 bg-lime-50 rounded-2xl border-2 shadow-[6px_4px_5px_0px_rgba(0,0,0,0.3)] border-gray-400">
    <the-normal-btn 
      class="absolute top-3"
      @click="emits('change-list', null)">
      戻る
    </the-normal-btn>
    <figure class="flex gap-x-11 pt-12">
      <img
        class="w-[300px] h-[350px] rounded-xl border-2 border-gray-400" 
        :src="`${animal.imgURL}`" :alt="animal.name">
      <figcaption class="ml-3 text-2xl">
        <div class="text-left">
          <p class="mb-4 text-2xl">名前  <span class="font-bold text-3xl ml-3">{{ animal.name }}</span></p>
          <p class="my-5 font-bold text-2xl">
            <span class="text-blue-500" v-if="animal.gender === 'male'">♂オス</span> 
            <span class="text-red-500" v-else>♀メス</span>
            <span class="ml-5">{{ animal.age }}歳 / {{ animal.place }}</span>
          </p>
          <p class="mb-10 ">
            性格: <span class="font-bold">{{ animal.chara.join(" ") }}</span>
          </p>
          <p>詳細</p>
          <p class="mt-2 p-2 rounded-lg bg-white border-2 border-gray-400">{{ animal.remarks }}</p>
        </div>
      </figcaption>
    </figure>
  </div>
</template>

<script setup>
  import TheNormalBtn from "../parts/TheNormalBtn.vue";

  const props = defineProps({
    animal: Object
  })

  const emits = defineEmits([ 'change-list' ])
</script>