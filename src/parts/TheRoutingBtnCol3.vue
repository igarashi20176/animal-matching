<template> 
   <div class="w-2/5 min-w-[500px] m-auto box-border mt-10 mb-8 p-2 border-2 rounded-3xl flex justify-center text-center bg-[#f9fafb]">
    <router-link :to="btnA.path">
      <button class="w-[100px] border-2 rounded-md p-1 mx-1  active:bg-red-400">
        {{ btnA.key }}
      </button>
    </router-link>
    <router-link :to="btnB.path">
      <button class="w-[100px] border-2 rounded-md p-1 mx-1  active:bg-red-400">
        {{ btnB.key }}
      </button>
    </router-link>
    <router-link :to="btnC.path">
      <button class="w-[100px] border-2 rounded-md p-1 mx-1  active:bg-red-400">
        {{ btnC.key }}
      </button>
    </router-link>
  </div>
</template>

<script setup>
  import { defineProps } from "vue";

  defineProps({
    btnA: Object,
    btnB: Object,
    btnC: Object
  })
</script>