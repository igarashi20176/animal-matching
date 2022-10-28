<template>
  <div class="relative mt-3 p-3 bg-lime-50 border-2 border-gray-400 rounded-2xl shadow-[6px_4px_5px_0px_rgba(0,0,0,0.3)]">
    <the-normal-btn 
      class="absolute top-3"
      @click="emits('change-view', null)">
      戻る
    </the-normal-btn>
    <figure class="flex pt-12 md:gap-x-11">
      <img
        class="w-[200px] h-[250px] sm:w-[280px] sm:h-[330px] rounded-xl border-2 border-gray-400" 
        :src="`${animal.imgURL}`" :alt="animal.name">
      <figcaption class="ml-3 text-2xl">
        <div class="text-left">
          <p class="mb-4 px-2 py-1 bg-[#fcfcfc] text-2xl border-2 border-gray-400 rounded-md">名前  <span class="font-bold text-3xl ml-3">{{ animal.name }}</span></p>
          <p class="my-5 px-2 py-1 bg-[#fcfcfc] font-bold text-2xl border-2 border-gray-400 rounded-md">
            <span class="text-blue-500" v-if="animal.gender === 'male'">♂オス</span> 
            <span class="text-red-500" v-else>♀メス</span>
            <span class="ml-5">{{ animal.age }}歳 / {{ animal.place }}</span>
          </p>
          <p class="mb-4 sm:mb-10 px-2 py-1 bg-[#fcfcfc] border-2 border-gray-400 rounded-md">
            <span class="text-xl">性格:</span> <span class="font-bold">{{ animal.chara.join(" ") }}</span>
          </p>
          <p>詳細</p>
          <p class="mt-2 p-2 bg-[#fcfcfc] border-2 rounded-lg border-gray-400">{{ animal.remarks }}</p>
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

  const emits = defineEmits([ 'change-view' ])
</script>