<template>

	<div class="w-3/4  min-w-[600px] m-auto p-2">
		<h2 class="font-bold text-3xl text-center mb-3">性格診断</h2>
		<p class="text-center mb-12 border-b-2 border-gray-400" v-if="!isEnd">※全て回答してね</p>
		<p class="text-center mb-8 border-b-2 border-gray-400" v-else>診断結果</p>

		<matching-list-item :chart="sendQuestion" @send-answer="countScore" v-if="!isEnd" />

		<div class="relative bg-gray-200 p-5 rounded-2xl" v-if="isEnd">
			
			<div class="mb-10">
				<p class="text-xl mb-6">あなたの性格診断の結果は...</p>
				<p class="font-bold text-center text-3xl text-red-400 underline">{{ getChara }}</p>
			</div>  
			<div class="">
				<p class="text-lg mb-5">ペットにもたくさんの性格を持った子たちがいます</p>
				<p class="text-lg">あなたに合うペットとマッチングしましょう!</p>
			</div>

			<div class="text-center">
				<the-normal-btn 
					class="mt-5"
					@click="router.push( { name: 'list', params: { chara: store.state.user.chara } } )">
					マッチングをする
				</the-normal-btn>
			</div>

			<the-normal-btn class="absolute bottom-5 right-3" @click="resetChara">
				診断をやり直す
			</the-normal-btn>

  	</div>

	</div>

</template>

<script setup>
	import { computed, ref, onMounted } from "vue";
	import { useRouter } from "vue-router";
	import { useStore } from "vuex";
	import MatchingListItem from "../templates/MatchingListItem.vue";
	import TheNormalBtn from "../parts/TheNormalBtn.vue";
	
	import { updateDoc, doc } from "firebase/firestore"
  import { db } from "../firebase"

	/**
	 * firestore ref
	 */
	let userDocRef = null


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


	const getChara = computed( () => { return store.state.user.chara } )

	
	/**
	 * 性格診断済の場合は, 診断をスキップ
	 */

	onMounted( () => {
		
		if ( store.state.isLogin && store.state.user.chara ) {
			isEnd.value = true
		}

		userDocRef = doc(db, 'users', store.state.user.uid )
	})


	/**
	 * 問題を進める & 問題を全て解き終わったら診断結果を表示
	 */
	 let isEnd = ref(false)
	let chartNum = ref(0)

	// chartNum番目の問題を返す
	const sendQuestion = computed( () => questions[chartNum.value] )

	const countNum = () => {
		if ( chartNum.value < questions.length - 1 ) {
			++chartNum.value
		} else {
			// 結果を生成
			generateResult()
		}
	}

	/**
	 * スコアを加算
	 * 
	 * @param choice  MatchingListItemで選択した回答
	 */
		
	let score = 0

	const countScore = choice => {
		choice = choice + "_score"
		score += questions[chartNum.value][choice]
		countNum()
	}


	// 結果を生成
	let res = ref("")
	const generateResult = async () => {

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
		
		await updateDoc( userDocRef , {
      chara: res.value
    }).then( () => {
			store.commit('setChara', res.value)
			isEnd.value = true
		}).catch( () => alert("お気に入りが登録出来ませんでした。再度お試しください") )
  
	}

	// 登録されているユーザの性格情報をリセット
	const resetChara = async () => {
		await updateDoc( userDocRef , {
			chara: ""
		}).then( () => {
			store.commit('resetChara')
			chartNum.value = 0
			isEnd.value = false
		}).catch( () => alert("リセットに失敗しました。再度お試しください") )
  
	}
</script>