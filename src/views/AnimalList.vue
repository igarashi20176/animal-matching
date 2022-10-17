<template>

  <div class="relative" v-if="!isDetail">

    <h2 class="font-bold text-center text-3xl width-[2px] py-3 mb-5 border-b-2 border-gray-400">一覧</h2>

    <div class="flex justify-between items-center">
      
      <!-- お気に入りのみ切り替えボタン -->
      <div v-if="!emptyMsg && store.state.isLogin"
        class="bg-yellow-200 p-2 rounded-2xl">
        <p>お気に入りのみ表示</p>  
        <the-toggle-btn  v-model:value="isFavFilter"  />
        <!-- <the-toggle-btn  :value="isFavFilter" @update:value="isFavFilter = $event"  /> -->
      </div>

      <div>
        <p class="text-xl ml-5 border-b-2 border-[#333]" v-if="emptyMsg">{{ emptyMsg }}</p>
      </div>

      <img :src="edit" alt="">

      <!-- フィルター機能 -->
      <the-normal-btn 
        @click="isFilter = !isFilter">
        フィルター機能
      </the-normal-btn>

      <div class="absolute z-10 right-[19%] top-[7%]">
        <the-filter-radio-btn v-if="isFilter" 
          :btn-a="filterBtns[0]" :btn-b="filterBtns[1]"
          @get-filtered="getFilteredAnimal" />
      </div>

    </div>
   
    
    <!-- 動物のリストを表示 -->
    <ul v-for="animal in animals">
      <li :key="animal.id" class="m-6">
        <animal-list-item :animal="animal"
          :is-editor="isEditor(animal.id)" :is-fav="isFav(animal.id)" :is-fav-filter="isFavFilter"  
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
  import { useRoute } from "vue-router";
  import AnimalListItem from "../templates/AnimalListItem.vue";
  import AnimalListDetail from "../templates/AnimalListDetail.vue";
  import TheFilterRadioBtn from "../templates/TheFilterRadioBtn.vue";
  import TheNormalBtn from "../parts/TheNormalBtn.vue";
  import TheToggleBtn from "../parts/TheToggleBtn.vue";
  
  /**
   * firebase import
   */
  import { collection, doc,
    deleteDoc, updateDoc, onSnapshot,
    query, where
  } from "firebase/firestore"
  import { db } from "../firebase"
  import { getStorage, ref as fsRef , deleteObject, getDownloadURL } from "firebase/storage"


  /**
   * DB ref
   */
  const storage = getStorage()
  const animalCollectionRef = collection(db, 'animals')
  let userDocRef = null

  const store = useStore()
  const route = useRoute()

  // 
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
   * firestoreに対する処理
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
            imgURL: doc.data().imgURL,
            editor: doc.data().editor
          }
          fbAnimals.push(animal)
        })
        resolve(fbAnimals)
      })
    })
  }

  // animalsコレクションの中の個々のドキュメントに紐づく画像を取得
  const getImages = async () => {
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

  // お気に入りの着け外し
  const toggleFav = async ( id, isFav ) => {
    store.commit('setFavList', { id: id, isFav: isFav })

    await updateDoc( userDocRef , {
      favList: store.state.user.favList
    }).catch( () => alert("お気に入りが登録出来ませんでした。再度お試しください") )
  }


  // ドキュメントの削除
  const deleteDocument = async id => {
    if ( confirm('削除してもよろしいですか?') ) {
      let b = animals.value.find(animal => animal.id === id)

      const deleteObjectAwait = await deleteObject(fsRef(storage, b.imgURL))
      const deleteDocAwait = await deleteDoc(doc(db, 'animals', id))

      Promise.all( [ deleteDocAwait, deleteObjectAwait ] )
        .catch( () => alert('削除に失敗しました。再度お試しください')  )
      
      // 値の取得に失敗したら空の配列を返す
      animals.value = await getDocuments(animalCollectionRef).catch( () => [] )
      if ( animals.value.length === 0 ) {
        emptyMsg.value = 'データが取得できませんでした。'
      } else {
        emptyMsg.value = ''
        await getImages().catch( () => alert('画像の取得に失敗しました') )
      }
    }
  }


  /**
   * 初期状態のセットアップ
   */

  // 初期データ取得数が0だった場合, 告知  
  let emptyMsg = ref("")

  
  onMounted( async () => {   
    // Matchingコンポーネントからparamsが送られてきた場合
    if ( route.params.chara ) {

      let q = animalCollectionRef
      q = query(q, where("chara", "array-contains", route.params.chara))

      animals.value = await getDocuments(q).catch( () => [] )
      if ( animals.value.length === 0 ) {
        emptyMsg.value = 'データが取得できませんでした'
      } else {
        emptyMsg.value = ''
        await getImages().catch( () => alert('画像の取得に失敗しました') )
      }

    } else {
      animals.value = await getDocuments(animalCollectionRef).catch( () => [] )
      if ( animals.value.length === 0 ) {
        emptyMsg.value = 'データが取得できませんでした'
      } else {
        emptyMsg.value = ''
        await getImages().catch( () => alert('画像の取得に失敗しました') )
      }

      if ( store.state.isLogin ) {
        userDocRef = doc(db, 'users', store.state.user.uid )
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

    // listItemからDetailへ切り替える / DetailからlistItemへの切り替えはid値を伴わない
    if ( id !== null ) {
      detailIndex.value = animals.value.findIndex(animal => animal.id === id)
    }
  }  


  /**
   * Filterによる絞り込み
   */

  // フィルターコンポーネントを表示/非表示
  let isFilter = ref(false)
  // お気に入りのみの絞り込みを適用/非適用 
  let isFavFilter = ref(false)

  // フィルターコンポーネントからフィルター条件を取得
  const getFilteredAnimal = async filters => {
    let q = animalCollectionRef

    // フィルター条件を適用したクエリの生成
    Object.keys(filters).forEach(field => {
      if ( filters[field] !== 'Any' ) {
        filters[field] = StringToBoolean(filters[field])
        q = query(q, where(field, '==', filters[field]))  
      }
    })

    animals.value = await getDocuments(q).catch( () => [] )
    if ( animals.value.length === 0 ) {
      emptyMsg.value = "フィルター条件に一致するデータがありませんでした"
    } else {
      emptyMsg.value = '' 
      await getImages().catch( () => alert('画像の取得に失敗しました') )
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