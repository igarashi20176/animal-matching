<template>

  <div class="relative" v-if="!isDetail">

    <h2 class="font-bold text-center text-3xl width-[2px] py-3 mb-5 border-b-2 border-gray-400">一覧</h2>

    <div class="flex justify-between">
      <div>
        <p class="text-xl ml-5 border-b-2 border-[#333]" v-if="isEmptySetup">データが取得できませんでした</p>
        <p class="text-xl ml-5 border-b-2 border-[#333]" v-if="isEmptyFilter">フィルターに一致するデータがありませんでした</p>
      </div>

      <!-- フィルター機能 -->
      <the-normal-btn  @click="isFilter = !isFilter">
        フィルター機能
      </the-normal-btn>

      <div class="absolute z-10 right-[19%] top-[7%]">
        <the-radio-btn-col3 v-if="isFilter" 
          :btn-a="filterBtns[0]" :btn-b="filterBtns[1]" :btn-c="filterBtns[2]"
          @get-filtered="getFilteredAnimal" />
      </div>
    </div>
   
    
    <!-- 動物のリストを表示 -->
    <ul v-for="animal in animals">
      <li :key="animal.id" class="m-6">
        <animal-list-item :is-editor="isEditor(animal.id)" :is-fav="isFav(animal.id)" :animal="animal" 
          @change-detail="changeAnimalDetail" @toggle-fav="toggleFav" @delete-doc="deleteDocument" />
      </li>
    </ul>

  </div>

  <!-- データの詳細を表示 -->
  <animal-list-detail v-else :animal="currentList" @change-list="changeAnimalDetail" />
</template>

<script setup>
  import { computed, onMounted, ref } from "vue"
  import { useStore } from "vuex";
  import AnimalListItem from "../templates/AnimalListItem.vue";
  import AnimalListDetail from "../templates/AnimalListDetail.vue";
  import TheRadioBtnCol3 from "../templates/TheRadioBtnCol3.vue";
  import TheNormalBtn from "../parts/TheNormalBtn.vue";
  
  /**
   * firebase import
   */
  import { collection, doc, getDoc,
    deleteDoc, updateDoc, onSnapshot,
    query, where 
  } from "firebase/firestore";
  import { db } from "../firebase";
  import { getStorage, deleteObject, ref as fsRef ,getDownloadURL } from "firebase/storage";


  /**
   * DB ref
   */
  const storage = getStorage()
  const animalCollectionRef = collection(db, 'animals')
  let userDocRef = null


  const store = useStore()
  // 動物のリスト
  let animals = ref([])
  // フィルターのボタン
  const filterBtns = [
    {
      field: "species",
      valueA: "dog",
      valueB: "cat", 
      labelNameA: "イヌ",
      labelNameB: "ネコ" 
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

  
  /**
   * computed
   */

  // ログインユーザーとデータの登録者が一致するか
  // 一致するユーザは, データの編集・書き込みが可能
  const isEditor = computed( () => {
    return id => {
      if ( store.state.isLogin ) {
        let b = animals.value.find(animal => animal.id === id )
        return ( store.state.user.uid === b.editor )
      } else {
        return false
      }
    }
  })

  // ログインユーザにお気に入り登録されているデータであるか
  const isFav = computed( () => {
    return id => {
      if ( store.state.isLogin ) {
        return store.state.user.favList.some( doc => {
          if ( doc === id ){
            return true
          }
        })  
      } else {
        // ログインしていない場合は, お気に入りボタンは表示しない
        return null
      }
    }
  })


  /**
   * animalListItemとAnimalListDetailの切り替え
   */

  let detailIndex = ref(0)
  let isDetail = ref(false)
  // 表示するAnimalListDetailを返す
  const currentList = computed( () => animals.value[detailIndex.value] )

  const changeAnimalDetail = id => {
    isDetail.value = !isDetail.value

    // detailからitemListへの移行にはid値を伴わない
    if ( id !== null ) {
      detailIndex.value = animals.value.findIndex(animal => animal.id === id)
    }
  }  


  /**
   * お気に入りの着け外し
   */

  const toggleFav = async ( id, isFav ) => {
    await store.dispatch('setFavList', { id: id, isFav: isFav })

    updateDoc( userDocRef , {
      favList: store.state.user.favList
    })
  }


  /**
   * ドキュメントの削除
   */

  const deleteDocument = async id => {
    if ( confirm('削除してもよろしいですか?') ) {
      let b = animals.value.find(animal => animal.id === id)
      try {
        await deleteObject(fsRef(storage, b.imgURL_origin))
        await deleteDoc(doc(db, 'animals', id))
      } catch (error) {
        console.log(error);
        alert('削除に失敗しました。再度お試しください')
      }
      
      // 値の祝に失敗したら空の配列を返す
      animals.value = await getDocuments(animalCollectionRef).catch( () => [] )
      if ( animals.value.length === 0 ) {
        isEmptySetup = true
      } else {
        isEmptySetup = false
        getImages()
      }
    }
  }


  /**
   * 初期状態のセットアップ
   */

  // 初期データ取得数が0だった場合, 告知  
  let isEmptySetup = ref(false)

  onMounted( async () => {   
    animals.value = await getDocuments(animalCollectionRef).catch( () => [] )
    if ( animals.value.length === 0 ) {
      isEmptySetup = true
    } else {
      isEmptySetup = false
      getImages()
    }

    if ( store.state.user.uid ) {
      userDocRef = doc(db, 'users', store.state.user.uid )
    }
  })


  /**
   * 登録されている動物の情報を取得
   */

  // animalsドキュメントの取得
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
            imgURL: "",
            imgURL_origin: doc.data().imgURL_origin,
            editor: doc.data().editor
          }
          fbAnimals.push(animal)
        })
        resolve(fbAnimals)
      })
    })
  }

  // animalsコレクションの中の個々のドキュメントに紐づく画像を取得
  const getImages = () => {
    if ( animals.value.length > 0 ) {
      animals.value.forEach( animal => {
        getDownloadURL(fsRef(storage, animal.imgURL_origin))
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


  /**
   * Filterによる絞り込み
   */

  let isFilter = ref(false) 
  // フィルター結果に一致するデータが無い場合, 告知
  let isEmptyFilter = ref(false)

  // フィルターコンポーネントからフィルター条件を取得
  const getFilteredAnimal = async filters => {
    const fields = Object.keys(filters)
    let q = animalCollectionRef

    // フィルター条件を適用したクエリの生成
    fields.forEach(field => {
      if ( filters[field] !== 'Any' ) {
        filters[field] = StringToBoolean(filters[field])
        q = query(q, where(field, '==', filters[field]))  
      }
    })

    animals.value = await getDocuments(q).catch( () => [] )
    if ( animals.value.length === 0 ) {
      isEmptyFilter.value = true
    } else {
      isEmptyFilter.value = false 
      getImages()
    }
    isFilter.value = !isFilter.value
  }

  const StringToBoolean = value => {
    if ( value === 'true' ) {
      return true
    } else if( value === 'false' ) {
      return false
    } else {
      return value
    }
  }
  
</script>