<template>
	<div class="w-3/4  min-w-[600px] m-auto p-2 bg-[#fafafa]">
<<<<<<< HEAD
		<h2 class="text-3xl text-center mb-3">診断チャート</h2>
		<p v-if="!checkSum" class="text-center mb-1 border-b-2 border-gray-400">※全て回答してね</p>
		<ChartListItem />
		<button 
			class="border-2 p-2 rounded-lg border-black text-center"
			v-if="checkSum"
			@click="checkAnswer">
			あなたと相性の良い動物は?
		</button>
		<div v-show="checkSum">
			{{ Res }}
		</div>
=======
		<h2 class="font-bold text-3xl text-center mb-3">診断チャート</h2>
		<p class="text-center mb-12 border-b-2 border-gray-400" v-if="!isEnd">※全て回答してね</p>
		<p class="text-center mb-12 border-b-2 border-gray-400" v-else>診断結果</p>

		<chart-list-item v-if="!isEnd" @send-answer="countScore" :chart="sendChart" />
		<component v-else :is="currentComponent" />

>>>>>>> 5474ccfe80450524a2ab9f150652682d16fa12ed
	</div>
</template>

<script setup>
	import { computed, ref } from "vue";
<<<<<<< HEAD
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
=======
	import ChartListItem from "../parts/ChartListItem.vue";
	import TheResultA from "../parts/TheResultA.vue";
	import TheResultB from "../parts/TheResultB.vue";
	import TheResultC from "../parts/TheResultC.vue";

	const charts = [
		{
			title: "自由な時間が欲しいと思う時がある",
			question_A: 'そう思う',
			question_B: 'そうは思わない',
			A_score: 3,
			B_score: 6,
		},
		{
			title: "好きなモノは好きなだけ食べる方だ",
			question_A: 'そう思う',
			question_B: 'そうは思わない',
			A_score: 2,
			B_score: 6,
		},
		{
			title: "夜眠たくてもお風呂に入る方だ",
			question_A: 'そう思う',
			question_B: 'そうは思わない',
			A_score: 6,
			B_score: 3,
		},
		{
			title: "自由に使えるお金が少ないと思う時がある",
			question_A: 'そう思う',
			question_B: 'そうは思わない',
			A_score: 3,
			B_score: 6,
		},
		{
			title: "いろいろな事に手を出してしまうタイプだ",
			question_A: 'そう思う',
			question_B: 'そうは思わない',
			A_score: 2,
			B_score: 6,
		},
		{
			title: "友達が待ち合わせに遅れてきても許せるほうだ",
			question_A: 'そう思う',
			question_B: 'そうは思わない',
			A_score: 6,
			B_score: 2,
		},
		{
			title: "出かけている時が多い方である",
			question_A: 'そう思う',
			question_B: 'そうは思わない',
			A_score: 3,
			B_score: 6,
		}
	]

	let score = ref(0)
	let chartNum = ref(0)
	let isEnd = ref(false)

	const sendChart = computed( () => charts[chartNum.value] )

	// 問題を進める & 問題を全て解き終わったらcomponentを非表示
	const countNum = () => {
		if ( chartNum.value < charts.length - 1 ) {
			++chartNum.value
		} else {
			isEnd.value = !isEnd.value
		}
	}

	const countScore = choice => {
			choice = choice + "_score"
			score.value += charts[chartNum.value][choice]
			countNum()
	}
	
	// setup記法だとcomponentを文字列でローカルに保存しないため
	// 変数としてcomponentを返す
	const currentComponent = computed( () => {
		if( score.value <= 42 && score.value >= 30 ){
				return TheResultA
			} else if ( score.value < 30 && score.value >= 21 ) {
				return TheResultB
			} else {
				return TheResultC
			}
	} )
>>>>>>> 5474ccfe80450524a2ab9f150652682d16fa12ed
</script>