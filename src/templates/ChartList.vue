<template>
	<div class="w-3/4  min-w-[600px] m-auto p-2 bg-[#fafafa]">
		<h2 class="text-3xl text-center mb-3">診断チャート</h2>
		<p v-if="!checkSum" class="text-center mb-1 border-b-2 border-gray-400">※全て回答してね</p>
		<button 
			class="border-2 p-2 rounded-lg border-black text-center"
			v-if="checkSum"
			@click="checkAnswer">
			あなたと相性の良い動物は?
		</button>
		<div v-show="checkSum">
			{{ Res }}
		</div>
	</div>
</template>

<script setup>
	import { computed, ref } from "vue";
	import { useRouter } from "vue-router";
import ChartListItem from "../parts/ChartListItem.vue";

	const router = useRouter()

	const charts = [
		{
			question_A: '一人でいる方が好きだ',
			question_B: '他人と遊ぶ方がが好きだ',
			A_score: 3,
			B_score: 6,
			category: 'active'
		},
		{
			question_A: '注目を浴びるのが好きだ',
			question_B: 'ひっそりとやる方が好きだ',
			A_score: 3,
			B_score: 6,
			category: 'extrovert'
		},
		{
			question_A: '誰とでも仲良くできる方だ',
			question_B: '親しい人としか話さない',
			A_score: 3,
			B_score: 6,
			category: 'extrovert'
		},
		{
			question_A: '夏休みの宿題は終盤にやる方だった',
			question_B: '夏休みの宿題は最初に済ます方だった',
			A_score: 3,
			B_score: 6,
			category: 'mypase'
		},
		{
			question_A: '運動が好きな方だ',
			question_B: 'ゲームやアニメが好きな方だ',
			A_score: 3,
			B_score: 6,
			category: 'active'
		},
		{
			question_A: '些細な変化に気づく方だ',
			question_B: '変化に気づきにくい方だ',
			A_score: 3,
			B_score: 6,
			category: 'mypase'
		},
		{
			question_A: '人前で発表する事が好きだ',
			question_B: '夏休みの宿題は最初に済ます方だった',
			A_score: 3,
			B_score: 6,
			category: 'mypase'
		}
	]

	// // 何問目をAかBどちらで答えたかを記録
	// let answers = ref({}) // { 0: 'A' | 'B', ... }
	// const clickAnswer = ( id, choice ) => {
	// 	answers.value[String(id)] = choice 		
	// }

	// // 全ての問題を回答しているか？
	// const checkSum = computed( () => charts.length === Object.keys(answers.value).length ) 
	
	// // 診断スコアを計算
	// let active = 0
	// let extrovert = 0
	// let mypase = 0
	// let Res = []

	// const checkAnswer = () => {
	// 	for ( let key of Object.keys(answers.value) ) {
	// 		let score = answers.value[key] + '_score';
	// 		let category = charts[Number(key)].category
	// 		let point = charts[Number(key)][score]

	// 		if (category === 'active') {
	// 			active += point  
	// 		} else if ( category === 'extrovert' ) {
	// 			extrovert += point  
	// 		} else {
	// 			mypase += point
	// 		};
	// 	}
		
	// 	//結果をAnimalList.vueに送信
	// 	active >= 9 ? Res.push('活発') : Res.push('穏やか')
	// 	extrovert >= 9 ? Res.push('内向的') : Res.push('外向的')
	// 	mypase >= 9 ? Res.push('マイペース') : Res.push('せっかち')

	// 	router.push()
	// }
</script>