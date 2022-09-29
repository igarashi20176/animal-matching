<template>    
	<h3 class="text-center text-xl mb-7">Q.{{ chart.title }}</h3>
  <div class="flex pt-5 p-4 rounded-2xl border-2 border-gray-300 hover:shadow-[0_0_8px_3px_rgba(0,0,0,0.2)] transition">
    <button
      class="mr-4 p-5 rounded-xl bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 basis-1/2" 
      @click="emit('sendAnswer', 'A')">
      A.{{ chart.question_A }}
    </button>
    <button
      class="p-3 rounded-xl bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 basis-1/2"
      @click="emit('sendAnswer', 'B')">
      B.{{ chart.question_B }}
    </button>
  </div>
</template>

<script setup>
  import { defineProps, defineEmits } from "vue";

	defineProps({
		chart: Object
	})

	const emit = defineEmits([ 'sendAnswer' ])

</script>