<template>    
<<<<<<< HEAD
  <div class="flex my-6 pt-5 p-4 rounded-2xl border-2 border-gray-300 hover:shadow-[0_0_8px_3px_rgba(0,0,0,0.2)]">
    <button
      class="mr-4 p-5 rounded-xl bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 basis-1/2" 
      @click="clickAnswer(idx, 'A')">
      A.{{ chart.question_A }}
    </button>
    <button
      class="p-3 rounded-xl bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 basis-1/2"
      @click="clickAnswer(idx, 'B')">
=======
	<h3 class="text-center text-xl mb-7">Q.{{ chart.title }}</h3>
  <div class="flex pt-5 p-4 rounded-2xl border-2 border-gray-300 hover:shadow-[0_0_8px_3px_rgba(0,0,0,0.2)] transition">
    <button
      class="mr-4 p-5 rounded-xl bg-pink-200 hover:bg-pink-300 active:bg-pink-400 focus:outline-none focus:ring focus:ring-pink-300 basis-1/2" 
      @click="emit('sendAnswer', 'A')">
      A.{{ chart.question_A }}
    </button>
    <button
      class="p-3 rounded-xl bg-sky-200 hover:bg-sky-300 active:bg-sky-400 focus:outline-none focus:ring focus:ring-sky-300 basis-1/2"
      @click="emit('sendAnswer', 'B')">
>>>>>>> 5474ccfe80450524a2ab9f150652682d16fa12ed
      B.{{ chart.question_B }}
    </button>
  </div>
</template>

<script setup>
<<<<<<< HEAD
  import { ref } from "vue";

  let answers = ref({}) // { 0: 'A' | 'B', ... }
	const clickAnswer = ( id, choice ) => {
		answers.value[String(id)] = choice 		
	}

	// 全ての問題を回答しているか？
	const checkSum = computed( () => charts.length === Object.keys(answers.value).length ) 
	
	// 診断スコアを計算
	let active = 0
	let extrovert = 0
	let mypase = 0
	let Res = []

	const checkAnswer = () => {
		for ( let key of Object.keys(answers.value) ) {
			let score = answers.value[key] + '_score';
			let category = charts[Number(key)].category
			let point = charts[Number(key)][score]

			if (category === 'active') {
				active += point  
			} else if ( category === 'extrovert' ) {
				extrovert += point  
			} else {
				mypase += point
			};
		}
		
		//結果をAnimalList.vueに送信
		active >= 9 ? Res.push('活発') : Res.push('穏やか')
		extrovert >= 9 ? Res.push('内向的') : Res.push('外向的')
		mypase >= 9 ? Res.push('マイペース') : Res.push('せっかち')

  }
=======
  import { defineProps, defineEmits } from "vue";

	defineProps({
		chart: Object
	})

	const emit = defineEmits([ 'sendAnswer' ])

>>>>>>> 5474ccfe80450524a2ab9f150652682d16fa12ed
</script>