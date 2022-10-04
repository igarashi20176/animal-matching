<template>
	<div class="w-3/4  min-w-[600px] m-auto p-2 bg-[#fafafa]">
		<h2 class="font-bold text-3xl text-center mb-3">診断チャート</h2>
		<p class="text-center mb-12 border-b-2 border-gray-400" v-if="!isEnd">※全て回答してね</p>
		<p class="text-center mb-12 border-b-2 border-gray-400" v-else>診断結果</p>

		<chart-list-item v-if="!isEnd" @send-answer="countScore" :chart="sendChart" />
		<component v-else :is="currentComponent" />

	</div>
</template>

<script setup>
	import { computed, ref } from "vue";
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

	// 性格診断マッチングでのアニマルリストのフィルター
	const array_equal = a => {
		animalLists.filter(animal => {
			if (!Array.isArray(a)) return false
			if (!Array.isArray(b)) return false
			if (a.length != b.length) return false
			for (var i = 0, n = a.length; i < n; ++i) {
				if (a[i] !== b[i]) return false
			}
			return true
		})
	}

	const sendChart = computed( () => charts[chartNum.value] )

	/**
	 * 問題を進める & 問題を全て解き終わったらchart-list-itemを非表示
	 */
	const countNum = () => {
		if ( chartNum.value < charts.length - 1 ) {
			++chartNum.value
		} else {
			isEnd.value = !isEnd.value
		}
	}

	/**
	 * スコアを加算
	 */
	const countScore = choice => {
			choice = choice + "_score"
			score.value += charts[chartNum.value][choice]
			countNum()
	}
	
	
	/**
	 * 診断結果に応じて結果コンポーネントを表示
	 */
	const currentComponent = computed( () => {
		if( score.value <= 42 && score.value >= 30 ){
				return TheResultA // setup記法だとcomponentを文字列でローカルに保存しないため, 変数としてcomponentを返す
			} else if ( score.value < 30 && score.value >= 21 ) {
				return TheResultB
			} else {
				return TheResultC
			}
	} )

</script>