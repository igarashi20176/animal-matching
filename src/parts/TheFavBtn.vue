<template>
  <button v-if="isFav"
    class="ml-3 px-2 text-[15px] text-red-500 border border-red-400 rounded-xl translate-y-[-5px] bg-red-200 hover:shadow-[0_0_5px_3px_rgba(0,0,0,0.1)] transition">
    お気に入りを解除&hearts;
  </button>
  <button v-else
    class="ml-3 px-2 text-[15px] text-red-400 border border-rose-400 rounded-xl translate-y-[-5px]  hover:shadow-[0_0_5px_2px_rgba(0,0,0,0.2)] transition">
    お気に入りに登録&#9825;
  </button>
</template>

<script setup>

  defineProps({
    isFav: { type: Boolean, required: true }
  })
</script>