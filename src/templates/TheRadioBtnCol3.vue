<template>
  <div v-if="isFilter" class="absolute p-1 text-md top-[5%] right-[16%] bg-orange-400 z-10 rounded-2xl">
    <div 
      class="relative inline-block w-[250px] h-auto p-4 font-bold text-[#fff] text-center 
      before:content-[''] before:absolute before:top-[25px] before:left-full before:border-solid before:border-[15px] before:border-transparent before:border-l-[15px] before:border-l-orange-400 ">
      <p>フィルターを選択してね</p>
      <ul class="flex justify-center gap-x-2 mt-4 text-slate-700">
        <li>
          <input type="radio" name="species" v-model="filters[btnA.model]" id="dog" value="dog" class="hidden peer">
          <label for="dog" class="m-1 border-2 cursor-pointer block w-[50px] rounded-2xl text-lg hover:bg-slate-400 peer-checked:bg-white">犬</label>
        </li>
        <li>
          <input type="radio" name="species" v-model="filters[btnA.model]" id="cat" value="cat" class="hidden peer">            
          <label for="cat" class="m-1 border-2 cursor-pointer block w-[50px] rounded-2xl text-lg hover:bg-slate-400 peer-checked:bg-white">猫</label>
        </li>
      </ul>
      <ul class="flex justify-center gap-x-2 mt-4 text-slate-700">
        <li>
          <input type="radio" name="gender" v-model="filters[btnB.model]" id="female" value="female" class="hidden peer">
          <label for="female" class="m-1 border-2 cursor-pointer block w-[50px] rounded-2xl text-lg hover:bg-slate-400 peer-checked:bg-white">メス</label>
        </li>
        <li>
          <input type="radio" name="gender" v-model="filters[btnB.model]" id="male" value="male" class="hidden peer">            
          <label for="male" class="m-1 border-2 cursor-pointer block w-[50px] rounded-2xl text-lg hover:bg-slate-400 peer-checked:bg-white">オス</label>
        </li>
      </ul>
      <ul class="flex justify-center gap-x-2 mt-4 text-slate-700">
        <li>
          <input type="radio" name="isFav" v-model="filters[btnC.model]" id="favTrue" value="true" class="hidden peer">
          <label for="favTrue" class="m-1 border-2 cursor-pointer block w-[100px] rounded-2xl text-md hover:bg-slate-400 peer-checked:bg-white">お気に入りのみ</label>
        </li>
        <li>
          <input type="radio" name="isFav" v-model="filters[btnC.model]" id="favFalse" value="false" class="hidden peer">
          <label for="favFalse" class="m-1 border-2 cursor-pointer block w-[100px] rounded-2xl text-md hover:bg-slate-400 peer-checked:bg-white">お気に入り以外</label>
        </li>
      </ul>
    </div>
    <button class="block mt-5 da" @click="getFilteredAnimal">フィルタリングをする</button>
    <button class="block mt-5 da" @click="resetFilters">リセット</button>
  </div>
</template>

<script setup>
  import { ref } from "vue";

  defineProps({
    btnA: { type: Object, default: { tag: "タグA", model: "modelA", value: "" } },
    btnB: { type: Object, default: { tag: "タグB", model: "modelB", value: "" } },
    btnC: { type: Object, default: { tag: "タグC", model: "modelC", value: "" } }
  })

  let filters = ref({
    [btnA.model]: "Any", 
    [btnB.model]: "Any", 
    [btnC.model]: "Any" 
  })

  modelA = ref(btnA.model)
  modelB = ref(btnA.model)
</script>