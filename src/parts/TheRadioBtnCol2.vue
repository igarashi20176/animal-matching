<template>
  <ul class="flex justify-center gap-x-2 mt-4 text-slate-700">
    <li>
      <input type="radio" :name="`${btnA.model}`" v-model="btnA.model" :id="`${btnA.value}`" :value="`${btnA.value}`" class="hidden peer">
      <label for="female" class="m-1 border-2 cursor-pointer block w-[50px] rounded-2xl text-lg hover:bg-slate-400 peer-checked:bg-white">{{ btnA.tag }}</label>
    </li>
    <li>
      <input type="radio" :name="`${btnB.model}`" v-model="btnB.model" id="male" value="male" class="hidden peer">            
      <label @click="" for="male" class="m-1 border-2 cursor-pointer block w-[50px] rounded-2xl text-lg hover:bg-slate-400 peer-checked:bg-white">{{ btnB.tag }}</label>
    </li>
  </ul>
</template>

<script setup>
  import { ref } from "vue";

  defineProps({
    btnA: { type: Object, default: { tag: "タグA", model: "", value: "" } },
    btnB: { type: Object, default: { tag: "タグB", model: "", value: "" } }
  })

  modelA = ref(btnA.model)
  modelB = ref(btnA.model)
</script>