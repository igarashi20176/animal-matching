<template> 
   <div class="flex justify-center gap-x-2 m-auto mt-10 mb-8 p-2 w-2/5 min-w-[450px] text-center bg-[#f9fafb] box-border border-2 border-gray-300 rounded-3xl">
    <router-link :to="btnA.path">
      <!-- :class="['w-[100px] border-2 rounded-md p-1 mx-1 hover:bg-pink-200 active:bg-pink-300', { 'bg-pink-200 shadow-[0_0_7px_3px_rgba(0,0,0,0.2)] transition': currentBtn === btnA.tag }]" -->
      <button 
        :class="['w-[100px] p-1 rounded-md transition-all text-[#fff] bg-[#38b48b] border-b-[5px] border-b-[#528d44] shadow-[0_3px_5px_rgba(0,0,0,0.3)] hover:mt-[3px] hover:bg-[#62d080] hover:border-b-2 hover:border-b-[#528d44]', { 'mt-[3px] border-b-2': currentBtn === btnA.tag }]"
        @click="currentBtn = btnA.tag">
        {{ btnA.tag }}
      </button>
    </router-link>
    <router-link :to="btnB.path">
      <button 
        :class="['w-[100px] p-1 rounded-md transition-all text-[#ffffff] bg-[#38b48b] border-b-[5px] border-b-[#528d44] shadow-[0_3px_5px_rgba(0,0,0,0.3)] hover:mt-[3px] hover:bg-[#62d080] hover:border-b-2 hover:border-b-[#528d44]', { 'mt-[3px] border-b-2': currentBtn === btnB.tag }]"
        @click="currentBtn = btnB.tag">
        {{ btnB.tag }}
      </button>
    </router-link>
    <router-link :to="btnC.path">
      <button 
        :class="['w-[100px] p-1 rounded-md transition-all text-[#ffffff] bg-[#38b48b] border-b-[5px] border-b-[#528d44] shadow-[0_3px_5px_rgba(0,0,0,0.3)] hover:mt-[3px] hover:bg-[#62d080] hover:border-b-2 hover:border-b-[#528d44]', { 'mt-[3px] border-b-2': currentBtn === btnC.tag }]"
        @click="currentBtn = btnC.tag">
        {{ btnC.tag }}
      </button>
    </router-link>
  </div>
</template>

<script setup>
  import { ref } from "vue";

  defineProps({
    btnA: { type: Object, default: { tag: "タグ1", path: "/" } },
    btnB: { type: Object, default: { tag: "タグ2", path: "/" } },
    btnC: { type: Object, default: { tag: "タグ3", path: "/" } }
  })

  let currentBtn = ref("")

</script>