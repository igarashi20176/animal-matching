<template>
  <div v-if="isFilter" class="absolute p-1 text-md top-[5%] right-[16%] bg-orange-400 z-10 rounded-2xl">
    <div 
      class="relative inline-block w-[250px] h-auto p-4 font-bold text-[#fff] text-center 
      before:content-[''] before:absolute before:top-[25px] before:left-full before:border-solid before:border-[15px] before:border-transparent before:border-l-[15px] before:border-l-orange-400 ">
      <p>フィルターを選択してね</p>
      <ul class="flex justify-center gap-x-2 mt-4 text-slate-700">
        <li>
          <input type="radio" v-model="filters.modelA" id="radio-A-label" :value="btnA.valueA" class="hidden peer">
          <label for="radio-A-label" class="m-1 border-2 cursor-pointer block w-[50px] rounded-2xl text-lg hover:bg-slate-400 peer-checked:bg-white">{{ btnA.labelNameA }}</label>
        </li>
        <li>
          <input type="radio" v-model="filters.modelA" id="radio-B-label" :value="btnA.valueB" class="hidden peer">            
          <label for="radio-B-label" class="m-1 border-2 cursor-pointer block w-[50px] rounded-2xl text-lg hover:bg-slate-400 peer-checked:bg-white">{{ btnA.labelNameB }}</label>
        </li>
      </ul>
      <ul class="flex justify-center gap-x-2 mt-4 text-slate-700">
        <li>
          <input type="radio" name="gender" v-model="filters.modelB" id="radio-C-label" :value="btnB.valueA" class="hidden peer">
          <label for="radio-C-label" class="m-1 border-2 cursor-pointer block w-[50px] rounded-2xl text-lg hover:bg-slate-400 peer-checked:bg-white">{{ btnB.labelNameA }}</label>
        </li>
        <li>
          <input type="radio" name="gender" v-model="filters.modelB" id="radio-D-label" :value="btnB.valueB" class="hidden peer">            
          <label for="radio-D-label" class="m-1 border-2 cursor-pointer block w-[50px] rounded-2xl text-lg hover:bg-slate-400 peer-checked:bg-white">{{ btnB.labelNameB }}</label>
        </li>
      </ul>
      <ul class="flex justify-center gap-x-2 mt-4 text-slate-700">
        <li>
          <input type="radio" name="isFav" v-model="filters.modelC" id="radio-E-label" :value="btnC.valueC" class="hidden peer">
          <label for="radio-E-label" class="m-1 border-2 cursor-pointer block w-[100px] rounded-2xl text-md hover:bg-slate-400 peer-checked:bg-white">{{ btnC.labelNameA }}</label>
        </li>
        <li>
          <input type="radio" name="isFav" v-model="filters.modelC" id="radio-F-label" :value="btnC.valueC" class="hidden peer">
          <label for="radio-F-label" class="m-1 border-2 cursor-pointer block w-[100px] rounded-2xl text-md hover:bg-slate-400 peer-checked:bg-white">{{ btnC.labelNameB }}</label>
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
    btnA: { type: Object, default: { tag: "タグA", valueA: "", valueB: "", labelNameA: "", labelNameB: ""  } },
    btnB: { type: Object, default: { tag: "タグB", valueA: "", valueB: "", labelNameA: "", labelNameB: "" } },
    btnC: { type: Object, default: { tag: "タグC", valueA: "", valueB: "", labelNameA: "", labelNameB: "" } }
  })

  let filters = ref({
    modelA: "Any", 
    modelB: "Any", 
    modelC: "Any" 
  })

  modelA = ref(btnA.model)
  modelB = ref(btnA.model)
</script>