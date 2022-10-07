<template>
  <div class="relative">
    <h2
      class="font-bold text-center text-3xl width-[2px] py-3 mb-14 border-b-2 border-gray-400">
      一覧
    </h2>
    
    <!-- フィルター機能 -->
    <button 
      class="absolute top-[8%] right-3 border-2 p-1 rounded-xl bg-gray-300"
      @click="isFilter = !isFilter">
      フィルター機能
    </button>
    <div v-if="isFilter" class="absolute p-1 text-md top-[5%] right-[16%] bg-orange-400 z-10 rounded-2xl">
      <div 
        class="relative inline-block w-[200px] h-[250px] p-4 font-bold text-[#fff] text-center 
        before:content-[''] before:absolute before:top-[25px] before:left-full before:border-solid before:border-[15px] before:border-transparent before:border-l-[15px] before:border-l-orange-400 ">
        <p>フィルターを選択してね</p>
        <ul class="flex justify-center gap-x-2 mt-4 text-slate-700">
          <li>
            <input type="radio" name="species" v-model="species" id="dog" value="dog" class="hidden peer">
            <label for="dog" class="m-1 border-2 cursor-pointer block w-[50px] rounded-2xl text-lg hover:bg-slate-400 peer-checked:bg-white">犬</label>
          </li>
          <li>
            <input type="radio" name="species" v-model="species" id="cat" value="cat" class="hidden peer">            
            <label for="cat" class="m-1 border-2 cursor-pointer block w-[50px] rounded-2xl text-lg hover:bg-slate-400 peer-checked:bg-white">猫</label>
          </li>
        </ul>
        <ul class="flex justify-center gap-x-2 mt-4 text-slate-700">
          <li>
            <input type="radio" name="gender" v-model="gender" id="female" value="female" class="hidden peer">
            <label for="female" class="m-1 border-2 cursor-pointer block w-[50px] rounded-2xl text-lg hover:bg-slate-400 peer-checked:bg-white">メス</label>
          </li>
          <li>
            <input type="radio" name="gender" v-model="gender" id="male" value="male" class="hidden peer">            
            <label for="male" class="m-1 border-2 cursor-pointer block w-[50px] rounded-2xl text-lg hover:bg-slate-400 peer-checked:bg-white">オス</label>
          </li>
        </ul>
        <ul class="flex justify-center gap-x-2 mt-4 text-slate-700">
          <li>
            <input type="radio" name="gender" v-model="gender" id="female" value="female" class="hidden peer">
            <label for="dafemale" class="m-1 border-2 cursor-pointer block w-[50px] rounded-2xl text-lg hover:bg-slate-400 peer-checked:bg-white">メス</label>
          </li>
          <li>
            <input type="radio" name="gender" v-model="gender" id="male" value="male" class="hidden peer">            
            <label for="male" class="m-1 border-2 cursor-pointer block w-[50px] rounded-2xl text-lg hover:bg-slate-400 peer-checked:bg-white">オス</label>
          </li>
        </ul>
      </div>
    </div>

    <!-- 動物のリストを表示 -->
    <ul v-for="list in lists">
      <li :key="list.id">
        <AnimalListItem :list="list" />
      </li>
    </ul>
  </div>
</template>

<script setup>
  import { computed, ref } from "vue"
  import { useStore } from "vuex"
  import AnimalListItem from "../parts/AnimalListItem.vue";
  
  /**
   * firebase install
   */

  import { collection, doc, 
    addDoc, deleteDoc, updateDoc, onSnapshot,
    query, orderBy 
  } from "firebase/firestore";
  import { db } from "../firebase";
  import { getStorage, ref as stRef ,getDownloadURL, listAll } from "firebase/storage";


  const store = useStore()

  let species = ref('')
  let gender = ref('')
  let isFilter = ref(false)

  // 動物のリストをすべて取得
  const lists = computed( () => store.getters.getAll )

</script>