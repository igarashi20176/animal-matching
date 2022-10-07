<template>
  <div class="relative" v-if="!isDetail">
    <h2
      class="font-bold text-center text-3xl width-[2px] py-3 mb-14 border-b-2 border-gray-400">
      一覧
    </h2>
    
    <button @click="getImages" class="p-2 border-2 border-orange-300 bg-orange-300">タッチ</button>

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
    <ul v-for="animal in animals">
      <li :key="animal.id">
        <animal-list-item :animal="animal" />
      </li>
    </ul>
  </div>

  <animal-list-detail :animal="currentList" @power="moveAnimalDetail" v-if="isDetail" />
</template>

<script setup>
  import { computed, onMounted, ref } from "vue"
  import AnimalListItem from "../parts/AnimalListItem.vue";
  import AnimalListDetail from "../parts/AnimalListDetail.vue";
  
  /**
   * firebase import
   */

  import { collection, doc, 
    addDoc, deleteDoc, updateDoc, onSnapshot,
    query, orderBy 
  } from "firebase/firestore";
  import { db } from "../firebase";
  import { getStorage, ref as fsRef ,getDownloadURL } from "firebase/storage";

  /**
   * DB ref
   */

  const storage = getStorage()
  const animalCollectionRef = collection(db, 'animals')
  // const todoCollectionQuery = query(animalCollectionRef, orderBy("date", "desc"));

  let animals = ref([])
  let detailIdx = ref(0)
  let isDetail = ref(false)

  // フィルター機能
  let species = ref('')
  let gender = ref('')
  let isFilter = ref(false)

  const currentList = computed( () => animals[detailIdx] )

  const moveAnimalDetail = id => {
    console.log("実行されました");
    isDetail.value = !isDetail.value
    detailIdx.value = animals.value.findIndex(animal => animal.id === id)
  }  

  /**
   * ドキュメント, 画像を取得
   */
  const getImages = () => {
    animals.value.forEach( animal => {
      getDownloadURL(fsRef(storage, animal.imgURL))
        .then((url) => {const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();

        animal.imgURL = url
      }).catch((error) => {
        console.log(error);
      });
    });
  }
  
  onMounted( () => {
      onSnapshot(animalCollectionRef, (querySnapshot) => {
      const fbAnimals = [];
      querySnapshot.forEach((doc) => {
        const animal = {
          id: doc.id,
          species: doc.data().species,
          name: doc.data().name,
          age: doc.data().age,
          place: doc.data().place,
          remarks: doc.data().remarks,
          chara: doc.data().chara,
          gender: doc.data().gender,
          isFav: doc.data().isFav,
          isPresent: doc.data().isPresent,
          imgURL: doc.data().imgURL
        }
        fbAnimals.push(animal)
      });
      animals.value = fbAnimals
    })

  })
</script>