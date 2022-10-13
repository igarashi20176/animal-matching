<template>
	<div class="w-3/4  min-w-[600px] m-auto p-2">
		<h2 class="font-bold text-3xl text-center mb-3">性格診断</h2>
		<p class="text-center mb-12 border-b-2 border-gray-400" v-if="!isEnd">※全て回答してね</p>
		<p class="text-center mb-8 border-b-2 border-gray-400" v-else>診断結果</p>

		<chart-list-item :chart="sendChart" @send-answer="countScore" v-if="!isEnd" />

		<div class="bg-gray-200 p-5 rounded-2xl" v-if="isEnd">
			<div class="mb-10">
				<p class="text-xl mb-6">あなたの性格診断の結果は...</p>
				<p class="font-bold text-center text-3xl text-red-400 underline">{{ results.join(" + ") }}</p>
			</div>  
			<div class="">
				<p class="text-lg mb-5">ペットにもたくさんの性格を持った子たちがいます</p>
				<p class="text-lg">あなたに合うペットとマッチングしましょう!</p>
			</div>
			<div class="text-center">
				<the-normal-btn 
					class="mt-5"
					@click="matchAnimal">
					マッチングをする
				</the-normal-btn>
			</div>
  	</div>
		
	</div>
</template>

<script setup>
	import { computed, ref } from "vue";
	import ChartListItem from "../templates/ChartListItem.vue";
	import TheNormalBtn from "../parts/TheNormalBtn.vue";
	import { useRouter } from "vue-router";

	const router = useRouter()

	// 問題を格納
	const charts = [
		{
			title: "出かけている時が多い方である",
			question_A: 'そう思う',
			question_B: 'そうは思わない',
			A_score: 6,
			B_score: 3,
			category: "active"
		},
		{
			title: "人といる方が安心する方だ",
			question_A: 'そう思う',
			question_B: 'そうは思わない',
			A_score: 3,
			B_score: 6,
			category: "lonely"
		},
		{
			title: "行動するより考える派だ",
			question_A: 'そう思う',
			question_B: 'そうは思わない',
			A_score: 3,
			B_score: 6,
			category: "curios"
		},
		{
			title: "友達が待ち合わせに遅れてきても許せるほうだ",
			question_A: 'そう思う',
			question_B: 'そうは思わない',
			A_score: 3,
			B_score: 6,
			category: "active"
		},
		{
			title: "家にいる方が落ち着く",
			question_A: 'そう思う',
			question_B: 'そうは思わない',
			A_score: 6,
			B_score: 3,
			category: "lonely"
		},
		{
			title: "いろいろな事に手を出してしまうタイプだ",
			question_A: 'そう思う',
			question_B: 'そうは思わない',
			A_score: 6,
			B_score: 3,
			active: "curios"
		}
	]

	/**
	 * 問題を進める & 問題を全て解き終わったらchart-list-itemを非表示
	 */
	let isEnd = ref(false)

	// chartNum番目の問題を返す
	const sendChart = computed( () => charts[chartNum.value] )

	const countNum = () => {
		if ( chartNum.value < charts.length - 1 ) {
			++chartNum.value
		} else {
			isEnd.value = !isEnd.value
			showResult()
		}
	}


	/**
	 * スコアを加算
	 */
	let curios = ref(0)
	let lonely = ref(0)
	let active = ref(0)
	let chartNum = ref(0)

	const countScore = choice => {
			choice = choice + "_score"
			if ( charts[chartNum.value].category === "active"  ) {
				active.value += charts[chartNum.value][choice]
			} else if ( charts[chartNum.value].category === "lonely" ) {
				lonely.value += charts[chartNum.value][choice]
			} else {
				curios.value += charts[chartNum.value][choice]
			}
			countNum()
	}
	
	
	/**
	 * 診断結果に応じて結果コンポーネントを表示
	 */
	let results = ref([])

	const showResult = () => {
		active.value < 7 ? results.value.push("温厚") : results.value.push("活発")
		curios.value < 7 ? results.value.push("慎重") : results.value.push("好奇心旺盛")
		lonely.value < 7 ? results.value.push("甘えん坊") : results.value.push("一人が好き")
	}


	/**
	 * 一覧に結果を送信し, マッチングを行う
	 */
	const matchAnimal = () => {
		// 診断結果も渡す
		router.push('/list')
	}

</script>