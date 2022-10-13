<template>
  <div 
    class="relative inline-block w-[300px] h-auto p-4 font-bold text-[#fff] text-center border-stone-500 border bg-gradient-to-br from-slate-200 to-stone-300 rounded-xl
    before:content-[''] before:absolute before:top-[25px] before:left-full before:border-solid before:border-[15px] before:border-transparent before:border-l-[15px] before:border-l-stone-300 ">
    <p class="text-[#333]">フィルターを選択してね</p>
    <ul class="flex justify-center gap-x-5 mt-4 text-slate-700">
      <li>
        <input type="radio" v-model="filters[props.btnA.field]" id="radio-A-label" :value="props.btnA.valueA" class="hidden peer">
        <label for="radio-A-label" class="p-1 w-[120px] border border-[#333] cursor-pointer block rounded-xl text-md hover:bg-neutral-50 peer-checked:bg-white">{{ props.btnA.labelNameA }}</label>
      </li>
      <li>
        <input type="radio" v-model="filters[props.btnA.field]" id="radio-B-label" :value="props.btnA.valueB" class="hidden peer">            
        <label for="radio-B-label" class="p-1 w-[120px] border border-[#333] cursor-pointer block rounded-xl text-md hover:bg-neutral-50 peer-checked:bg-white">{{ props.btnA.labelNameB }}</label>
      </li>
    </ul>
    <ul class="flex justify-center gap-x-5 mt-4 text-slate-700">
      <li>
        <input type="radio" v-model="filters[props.btnB.field]" id="radio-C-label" :value="props.btnB.valueA" class="hidden peer">
        <label for="radio-C-label" class="p-1 w-[120px] border border-[#333] cursor-pointer block rounded-xl text-md hover:bg-neutral-50 peer-checked:bg-white">{{ props.btnB.labelNameA }}</label>
      </li>
      <li>
        <input type="radio" v-model="filters[props.btnB.field]" id="radio-D-label" :value="props.btnB.valueB" class="hidden peer">            
        <label for="radio-D-label" class="p-1 w-[120px] border border-[#333] cursor-pointer block rounded-xl text-md hover:bg-neutral-50 peer-checked:bg-white">{{ props.btnB.labelNameB }}</label>
      </li>
    </ul>
    <ul class="flex justify-center gap-x-5 mt-4 text-slate-700">
      <li>
        <input type="radio" name="isFav" v-model="filters[props.btnC.field]" id="radio-E-label" :value="props.btnC.valueA" class="hidden peer">
        <label for="radio-E-label" class="p-1 w-[120px] border border-[#333] cursor-pointer block rounded-xl text-md hover:bg-neutral-50 peer-checked:bg-white">{{ props.btnC.labelNameA }}</label>
      </li>
      <li>
        <input type="radio" name="isFav" v-model="filters[props.btnC.field]" id="radio-F-label" :value="props.btnC.valueB" class="hidden peer">
        <label for="radio-F-label" class="p-1 w-[120px] border border-[#333] cursor-pointer block rounded-xl text-md hover:bg-neutral-50 peer-checked:bg-white">{{ props.btnC.labelNameB }}</label>
      </li>
    </ul>
    <div class="flex justify-center gap-x-7">
      <button class="p-1 mt-5 border bg-red-300 hover:bg-red-400 border-[#333] rounded-xl transition" @click="resetFilters">リセット</button>
      <button class="p-1 mt-5 border bg-blue-300 hover:bg-blue-400 border-[#333] rounded-xl transition" @click="emits('get-filtered', filters)">フィルタリングをする</button>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, ref } from "vue";

  const props = defineProps({
    btnA: { type: Object, default: { field: "fieldA", valueA: "A", valueB: "B", labelNameA: "ラベルA", labelNameB: "ラベルB" } },
    btnB: { type: Object, default: { field: "fieldB", valueA: "A", valueB: "B", labelNameA: "ラベルA", labelNameB: "ラベルB" } },
    btnC: { type: Object, default: { field: "fieldC", valueA: "A", valueB: "B", labelNameA: "ラベルA", labelNameB: "ラベルB" } }
  })

  const emits = defineEmits( ['get-filtered'] )

  let filters = ref({
    [props.btnA.field]: "Any", 
    [props.btnB.field]: "Any", 
    [props.btnC.field]: "Any" 
  })

  const resetFilters = () => {
    filters.value[props.btnA.field] = 'Any'
    filters.value[props.btnB.field] = 'Any'
    filters.value[props.btnC.field] = 'Any'
  }
 
  onMounted( () => resetFilters() )
</script>