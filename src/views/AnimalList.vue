<template>
  <div class="relative" v-if="!isDetail">
    <h2
      class="font-bold text-center text-3xl width-[2px] py-3 mb-5 border-b-2 border-gray-400">
      一覧
    </h2>

    <div class="flex justify-between">
      <div>
        <p class="text-xl ml-5 border-b-2 border-[#333]" v-if="isEmptySetup">データが取得できませんでした</p>
        <p class="text-xl ml-5 border-b-2 border-[#333]" v-if="isEmptyFilter">フィルターに一致するデータがありませんでした</p>
      </div>

      <!-- フィルター機能 -->
      <button 
        class="text-right border-2 p-1 rounded-xl bg-gray-300"
        @click="isFilter = !isFilter">
        フィルター機能
      </button>
    </div>
    
    <the-radio-btn-col3 v-if="isFilter" 
      :btnA="filterBtns[0]" :btnB="filterBtns[1]" :btnC="filterBtns[2]"
      class=""
      @get-filtered="getFilteredAnimal" />

    <!-- 動物のリストを表示 -->
    <ul v-for="animal in animals">
      <li :key="animal.id" class="m-6">
        <animal-list-item :animal="animal" @change-detail="changeAnimalDetail" @toggle-fav="toggleFav" />
      </li>
    </ul>
  </div>

  <animal-list-detail :animal="currentList" v-if="isDetail" @change-list="changeAnimalDetail" />
</template>

<script setup>
  import { computed, onMounted, ref } from "vue"
  import AnimalListItem from "../templates/AnimalListItem.vue";
  import AnimalListDetail from "../templates/AnimalListDetail.vue";
  import TheRadioBtnCol3 from "../templates/TheRadioBtnCol3.vue";
  
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

  
  // フィルターのボタン
  const filterBtns = [
    {
      field: "species",
      valueA: "dog",
      valueB: "cat", 
      labelNameA: "犬",
      labelNameB: "猫" 
    },
    {
      field: "gender",
      valueA: "male",
      valueB: "female", 
      labelNameA: "オス",
      labelNameB: "メス" 
    },
    {
      field: "isFav",
      valueA: "true",
      valueB: "false", 
      labelNameA: "お気に入りのみ",
      labelNameB: "お気に入り以外" 
    }
  ]

  // 動物のリスト
  let animals = ref([])


  /**
   * animalListItemとAnimalListDetailの切り替え
   */
  let detailIndex = ref(0)
  let isDetail = ref(false)
  // 表示するAnimalListDetailを返す
  const currentList = computed( () => animals.value[detailIndex.value] )

  const changeAnimalDetail = id => {
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

  const getDocuments = query => {
    return new Promise( function( resolve ) {
      onSnapshot(query, (querySnapshot) => {
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
        resolve(fbAnimals)
      })
    })
  }

  const getImages = () => {
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
  }


  // 初期データ取得数が無かった場合
  let isEmptySetup = ref(false)

  onMounted( async () => {   
    animals.value = await getDocuments(animalCollectionRef)
    isEmptySetup.value = animals.value.length === 0 ? true : false
    if ( animals.value.length === 0 ) {
      isEmptySetup = true
    } else {
      isEmptySetup = false
      getImages()
    }
  })


  /**
   * Filterによる絞り込み
   */
  let isFilter = ref(false) 
  // フィルター結果に一致するデータが無い場合
  let isEmptyFilter = ref(false)

  const getFilteredAnimal = async filters => {
    const fields = Object.keys(filters)
    let q =  animalCollectionRef

    fields.forEach(field => {
      if ( filters[field] !== 'Any' ) {
        filters[field] = StringToBoolean(filters[field])
        q = query(q, where(field, '==', filters[field]))  
      }
    })

    animals.value = await getDocuments(q)
    if ( animals.value.length === 0 ) {
      isEmptyFilter.value = true
    } else {
      isEmptyFilter.value = false
      getImages()
    }
    isFilter.value = !isFilter.value
  }

  const StringToBoolean = string => {
    if ( string === 'true' ) {
      return true
    } else if( string === 'false' ) {
      return false
    } else {
      return string
    }
  }

</script>