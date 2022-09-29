<template> 
   <div class="w-2/5 min-w-[500px] m-auto box-border mt-10 mb-8 p-2 border-2 rounded-3xl flex justify-center text-center bg-[#f9fafb]">
    <router-link :to="btnA.path">
      <button class="w-[100px] border-2 rounded-md p-1 mx-1 hover:bg-pink-200 active:bg-pink-300" >
        {{ btnA.tag }}
      </button>
    </router-link>
    <router-link :to="btnB.path">
      <button class="w-[100px] border-2 rounded-md p-1 mx-1 hover:bg-pink-200 active:bg-pink-300">
        {{ btnB.tag }}
      </button>
    </router-link>
    <router-link :to="btnC.path">
      <button class="w-[100px] border-2 rounded-md p-1 mx-1 hover:bg-pink-200 active:bg-pink-300">
        {{ btnC.tag }}
      </button>
    </router-link>
  </div>
</template>

<script setup>
  import { defineProps } from "vue";

  defineProps({
    btnA: { type: Object, default: { tag: "タグ1", path: "/" } },
    btnB: { type: Object, default: { tag: "タグ2", path: "/" } },
    btnC: { type: Object, default: { tag: "タグ3", path: "/" } }
  })
</script>