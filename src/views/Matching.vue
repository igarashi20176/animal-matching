<template>
	<div class="w-3/4  min-w-[600px] m-auto p-2">
		<h2 class="font-bold text-3xl text-center mb-3">性格診断</h2>
		<p class="text-center mb-12 border-b-2 border-gray-400" v-if="!isEnd">※全て回答してね</p>
		<p class="text-center mb-8 border-b-2 border-gray-400" v-else>診断結果</p>

		<chart-list-item :chart="sendChart" @send-answer="countScore" v-if="!isEnd" />

		<div class="bg-gray-200 p-5 rounded-2xl" v-if="isEnd">
			<div class="mb-10">
				<p class="text-xl mb-6">あなたの性格診断の結果は...</p>
				<p class="font-bold text-center text-3xl text-red-400 underline">{{ res }}</p>
			</div>  
			<div class="">
				<p class="text-lg mb-5">ペットにもたくさんの性格を持った子たちがいます</p>
				<p class="text-lg">あなたに合うペットとマッチングしましょう!</p>
			</div>
			<div class="text-center">
				<the-normal-btn 
					class="mt-5"
					@click="router.push( { name: 'list', params: { chara: res } } )">
					マッチングをする
				</the-normal-btn>
			</div>
  	</div>
		
	</div>
</template>

<script setup>
	import { computed, ref } from "vue";
	import { useRouter } from "vue-router";
	import { useStore } from "vuex";
	import ChartListItem from "../templates/MatchingListItem.vue";
	import TheNormalBtn from "../parts/TheNormalBtn.vue";

	
	const store = useStore()
	const router = useRouter()

	// 問題を格納
	const questions = [
		{
			title: "出かけている時が多い方である",
			question_A: 'そう思う',
			question_B: 'そうは思わない',
			A_score: 6,
			B_score: 2,
		},
		{
			title: "人といる方が安心する方だ",
			question_A: 'そう思う',
			question_B: 'そうは思わない',
			A_score: 1,
			B_score: 6,
		},
		{
			title: "行動するより考える派だ",
			question_A: 'そう思う',
			question_B: 'そうは思わない',
			A_score: 3,
			B_score: 1,
		},
		{
			title: "友達が待ち合わせに遅れてきても許せるほうだ",
			question_A: 'そう思う',
			question_B: 'そうは思わない',
			A_score: 1,
			B_score: 4,
		},
		{
			title: "家にいる方が落ち着く",
			question_A: 'そう思う',
			question_B: 'そうは思わない',
			A_score: 1,
			B_score: 7,
		},
		{
			title: "いろいろな事に手を出してしまうタイプだ",
			question_A: 'そう思う',
			question_B: 'そうは思わない',
			A_score: 6,
			B_score: 1,
		}
	]

	
	/**
	 * 問題を進める & 問題を全て解き終わったらchart-list-itemを非表示
	 */
	let isEnd = ref(false)

	// chartNum番目の問題を返す
	const sendChart = computed( () => questions[chartNum.value] )

	const countNum = () => {
		if ( chartNum.value < questions.length - 1 ) {
			++chartNum.value
		} else {
			isEnd.value = !isEnd.value
			generateResult()
		}
	}


	/**
	 * スコアを加算
	 */
	let score = 0
	let chartNum = ref(0)

	const countScore = choice => {
		choice = choice + "_score"
		score += questions[chartNum.value][choice]
		countNum()
	}

	// 結果を生成
	let res = ref("")
	const generateResult = () => {

		if ( score > 32 ) {
			res.value = "好奇心旺盛"
		} else if ( score > 25 ) {
			res.value = '甘えん坊'
		} else if ( score > 20 ) {
			res.value = '活発'
		} else if ( score > 15 ) {
			res.value = '温厚'
		} else if ( score > 10 ) {
			res.value = '慎重'
		} else {
			res.value = '一人が好き'
		}
		
		store.commit('setChara', res)
	}

</script>