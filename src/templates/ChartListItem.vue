<template>    
	<h3 class="text-center text-xl mb-7">Q.{{ chart.title }}</h3>
  <div class="flex pt-5 p-4 rounded-2xl border-2 border-gray-300 hover:shadow-[0_0_8px_3px_rgba(0,0,0,0.2)] transition">
    <button
      class="mr-4 p-5 rounded-xl bg-pink-200 hover:bg-pink-300 active:bg-pink-400 basis-1/2" 
      @click="emit('sendAnswer', 'A')">
      A.{{ chart.question_A }}
    </button>
    <button
      class="p-3 rounded-xl bg-sky-200 hover:bg-sky-300 active:bg-sky-400 basis-1/2"
      @click="emit('sendAnswer', 'B')">
      B.{{ chart.question_B }}
    </button>
  </div>
</template>

<script setup>

	defineProps({
		chart: Object
	})

	const emit = defineEmits([ 'sendAnswer' ])

</script>