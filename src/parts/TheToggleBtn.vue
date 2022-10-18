<template>
  <div class="relative w-[75px] h-[35px] m-auto">
    <input id="toggle" @change="emits('update:value', checked)" v-model="checked" class="absolute left-0 top-0 w-full h-full z-5 opacity-0 cursor-pointer peer hidden" type='checkbox' >
    <label for="toggle" class="relative inline-block w-[75px] h-[35px] bg-[#ccc] rounded-3xl box-border transition peer-checked:bg-[#4BD865]
      after:content-[''] after:absolute after:w-[35px] after:h-[35px] after:rounded-full after:left-0 after:top-0 after:z-2 after:bg-[#fff] after:shadow-[0_0_5px_rgba(0, 0, 0, 0.2)] after:transition-all after:peer-checked:left-[40px]"></label>
  </div>
</template>

<script setup>
  import { ref } from "vue";

  const emits = defineEmits( [ 'update:value' ] )
  
  const checked = ref(false)
</script>