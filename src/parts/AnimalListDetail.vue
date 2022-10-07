<template>
  <div class="relative p-3 bg-amber-50 rounded-2xl border-2 shadow-[6px_4px_5px_0px_rgba(0,0,0,0.3)] border-gray-400">
    <p class="mb-4 font-bold text-3xl text-center">名前: {{ animal.name }}</p>
    <figure class="flex">
      <img
        class="w-[250px] h-[350px] rounded-xl border-2 border-gray-400" 
        :src="`/src/assets/images/${animal.img}.jpg`" :alt="animal.name">
      <figcaption class="ml-3 text-2xl">
        <div class="text-center font-bold">
          <p class="text-center my-5 font-bold">
            <span class="text-blue-500" v-if="animal.gender === 'male'">♂オス</span> 
            <span class="text-red-500" v-else>♀メス</span>
            {{ animal.age }}歳 / {{ animal.place }} <span v-if="animal.week">{{ animal.week }}週</span>
          </p>
          <p class="mb-10 ">
            性格: {{ animal.chara.join(", ") }}
          </p>
          <p>詳細</p>
        </div>
        <p class="mt-2 p-2 rounded-lg bg-white border-2 border-gray-400">{{ animal.remarks }}</p>
      </figcaption>
    </figure>
    <button 
      class="absolute top-3 py-2 p-6  rounded-xl bg-white">
      戻る
    </button>
  </div>
</template>

<script setup>

  const props = defineProps({
    animal: Object
  })

</script>