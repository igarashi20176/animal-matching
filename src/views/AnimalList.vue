<template>
  <div class="relative" v-if="!isDetail">
    <h2
      class="font-bold text-center text-3xl width-[2px] py-3 mb-10 border-b-2 border-gray-400">
      一覧
    </h2>

    <div class="text-center">
      <p class="inline text-xl border-b-2 border-[#333]">クリックすると詳細が見れます</p>
      <p class="inline text-xl border-b-2 border-[#333]" v-if="isEmptySetup">データが取得できませんでした</p>
      <p class="inline text-xl border-b-2 border-[#333]" v-if="isEmptyFilter">フィルターに一致するデータがありませんでした</p>
    </div>

    <!-- フィルター機能 -->
    <button 
      class="absolute top-[10%] right-3 border-2 p-1 rounded-xl bg-gray-300"
      @click="isFilter = !isFilter">
      フィルター機能
    </button>
    <div v-if="isFilter" class="absolute p-1 text-md top-[5%] right-[16%] bg-orange-400 z-10 rounded-2xl">
      <div 
        class="relative inline-block w-[250px] h-auto p-4 font-bold text-[#fff] text-center 
        before:content-[''] before:absolute before:top-[25px] before:left-full before:border-solid before:border-[15px] before:border-transparent before:border-l-[15px] before:border-l-orange-400 ">
        <p>フィルターを選択してね</p>
        <ul class="flex justify-center gap-x-2 mt-4 text-slate-700">
          <li>
            <input type="radio" name="species" v-model="filters.species" id="dog" value="dog" class="hidden peer">
            <label for="dog" class="m-1 border-2 cursor-pointer block w-[50px] rounded-2xl text-lg hover:bg-slate-400 peer-checked:bg-white">犬</label>
          </li>
          <li>
            <input type="radio" name="species" v-model="filters.species" id="cat" value="cat" class="hidden peer">            
            <label for="cat" class="m-1 border-2 cursor-pointer block w-[50px] rounded-2xl text-lg hover:bg-slate-400 peer-checked:bg-white">猫</label>
          </li>
        </ul>
        <ul class="flex justify-center gap-x-2 mt-4 text-slate-700">
          <li>
            <input type="radio" name="gender" v-model="filters.gender" id="female" value="female" class="hidden peer">
            <label for="female" class="m-1 border-2 cursor-pointer block w-[50px] rounded-2xl text-lg hover:bg-slate-400 peer-checked:bg-white">メス</label>
          </li>
          <li>
            <input type="radio" name="gender" v-model="filters.gender" id="male" value="male" class="hidden peer">            
            <label for="male" class="m-1 border-2 cursor-pointer block w-[50px] rounded-2xl text-lg hover:bg-slate-400 peer-checked:bg-white">オス</label>
          </li>
        </ul>
        <ul class="flex justify-center gap-x-2 mt-4 text-slate-700">
          <li>
            <input type="radio" name="isFav" v-model="filters.isFav" id="favTrue" value="true" class="hidden peer">
            <label for="favTrue" class="m-1 border-2 cursor-pointer block w-[100px] rounded-2xl text-md hover:bg-slate-400 peer-checked:bg-white">お気に入りのみ</label>
          </li>
          <li>
            <input type="radio" name="isFav" v-model="filters.isFav" id="favFalse" value="false" class="hidden peer">
            <label for="favFalse" class="m-1 border-2 cursor-pointer block w-[100px] rounded-2xl text-md hover:bg-slate-400 peer-checked:bg-white">お気に入り以外</label>
          </li>
        </ul>
      </div>
      <button class="block mt-5 da" @click="getFilteredAnimal">フィルタリングをする</button>
      <button class="block mt-5 da" @click="resetFilters">リセット</button>
    </div>

    <!-- 動物のリストを表示 -->
    <ul v-for="animal in animals">
      <li :key="animal.id">
        <animal-list-item :animal="animal" @change-detail="moveAnimalDetail" @toggle-fav="toggleFav" />
      </li>
    </ul>
  </div>

  <animal-list-detail :animal="currentList" v-if="isDetail" @change-list="moveAnimalDetail" />
</template>

<script setup>
  import { computed, onMounted, onBeforeUpdate, ref } from "vue"
  import AnimalListItem from "../templates/AnimalListItem.vue";
  import AnimalListDetail from "../templates/AnimalListDetail.vue";
  
  /**
   * firebase import
   */
  import { collection, doc, 
    deleteDoc, updateDoc, onSnapshot,
    query, orderBy, where 
  } from "firebase/firestore";
  import { db } from "../firebase";
  import { getStorage, ref as fsRef ,getDownloadURL } from "firebase/storage";


  /**
   * DB ref
   */
  const storage = getStorage()
  const animalCollectionRef = collection(db, 'animals')
  // const todoCollectionQuery = query(animalCollectionRef, orderBy("date", "desc"));

  
  // 動物のリスト
  let animals = ref([])
  // 初期データ取得数が無かった場合
  let isEmptySetup = ref(false)
  // フィルター結果に一致するデータが無い場合
  let isEmptyFilter = ref(false)


  /**
   * animalListItemとAnimalListDetailの切り替え
   */
  let detailIndex = ref(0)
  let isDetail = ref(false)
  // 表示するAnimalListDetailを返す
  const currentList = computed( () => animals.value[detailIndex.value] )

  const moveAnimalDetail = id => {
    isDetail.value = !isDetail.value

    if ( id !== null )
    detailIndex.value = animals.value.findIndex(animal => animal.id === id)
  }  


  /**
   * お気に入りの着け外し
   */
  const toggleFav = id => {
    let index = animals.value.findIndex(animal => animal.id === id)

    updateDoc(doc(animalCollectionRef, id), {
      isFav: !animals.value[index].isFav
    });
  }


  /**
   * ドキュメント, 画像を取得
   */
  onMounted( () => {   
    onSnapshot(animalCollectionRef, (querySnapshot) => {
      const fbAnimals = []
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
      })
      animals.value = fbAnimals
      isEmptySetup.value = animals.value.length === 0 ? true : false
    })
  })

  onBeforeUpdate( () => {
    if ( animals.value.length > 0 ) {
      animals.value.forEach( animal => {
        getDownloadURL(fsRef(storage, animal.imgURL))
          .then((url) => {const xhr = new XMLHttpRequest()
            xhr.responseType = 'blob'
            xhr.onload = (event) => {
              const blob = xhr.response
            }
            xhr.open('GET', url)
            xhr.send();

            animal.imgURL = url
          }).catch((error) => {
            console.log(error)
        })
      })
    }
  })


  /**
   * Filterによる絞り込み
   */
  let isFilter = ref(false) 
  let filters = ref({
    species: 'Any',
    gender: 'Any',
    isFav: 'Any'
  })

  const resetFilters = () => {
    filters.value.species = 'Any'
    filters.value.gender = 'Any'
    filters.value.isFav = 'Any'
  }

  const getFilteredAnimal = () => {
    let q = collection(db, 'animals')

    if ( filters.value.species !== 'Any' ) {
      q = query(q, where('species', '==', filters.value.species))
    }

    if ( filters.value.gender !== 'Any' ) {
      q = query(q, where('gender', '==', filters.value.gender))
    }
    
    if ( filters.value.isFav !== 'Any' ) {
      const boo = filters.value.isFav === 'true' ? true : false
      q = query(q, where('isFav', '==', boo))
    }
    
    onSnapshot(q, (querySnapshot) => {
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
      isEmptyFilter.value = animals.value.length === 0 ? true : false
      resetFilters()
      isFilter.value = !isFilter.value
    })
  }

</script>