<template>

  <h2 class="font-bold text-center text-3xl py-3 mb-10 border-b-2 border-gray-400">登録フォーム</h2>

  <div class="w-4/5 text-center m-auto border-2 border-gray-400 bg-rose-100 py-3 rounded-xl">

    <div class="mb-6 p-2">
      <input 
        class="p-2 rounded-md w-1/2 h-12 border border-[#333] focus:bg-yellow-100 focus:ring-[#333]" 
        type="text" v-model="newAnimalInfo.name" placeholder="お名前">
    </div>

    <div class="mb-10">
      <p class="mb-3" v-if="!imageFileInfo.imgName">※サムネイルとなるペットの画像を選択してください</p>
      <p class="mb-3" v-else>画像が選択されました: {{ imageFileInfo.imgName }}</p>
      <label class="block w-1/3 m-auto p-2 border border-[#333] rounded-md bg-white text-[#333] hover:bg-yellow-100">
        <input type="file" accept=".jpg, .png, .jpeg" 
          @change="getImageFile" class="hidden">ファイルを選択
      </label>
    </div>

    <div class="flex justify-center">
      <select 
        class="w-1/4 h-11 p-2 rounded-tl-md border-r-2 border-b-2 focus:bg-yellow-100" 
        list="gender" v-model="newAnimalInfo.gender" required>
        <option value="">性別</option>
        <option value="male">オス</option>
        <option value="female">メス</option>
      </select>

      <select 
        class="w-1/4 h-11 p-2 rounded-tr-md border-b-2 focus:bg-yellow-100" 
        list="species" v-model="newAnimalInfo.species" required>
        <option value="">種別</option>
        <option value="cat">ネコ</option>
        <option value="dog">イヌ</option>
      </select>
    </div>

    <div class="mb-7 flex justify-center">
      <select 
        class="w-1/4 h-11 p-2 rounded-bl-md border-r-2 focus:bg-yellow-100" 
        list="age" v-model="newAnimalInfo.age" required>
        <option value="">年齢</option>
        <option value="0">0才</option>
        <option value="1">1才</option>
        <option value="2">2才</option>
        <option value="3">3才</option>
        <option value="4">4才</option>
        <option value="5">5才</option>
        <option value="6">6才</option>
        <option value="7">7才</option>
        <option value="8">8才</option>
        <option value="9">9才</option>
        <option value="10">10才</option>
        <option value="11">11才</option>
        <option value="12">12才</option>
        <option value="13">13才</option>
        <option value="14">14才</option>
        <option value="15">15才</option>
      </select>

      <select 
        class="w-1/4 h-11 p-2 rounded-br-md focus:bg-yellow-100"  
        list="place" v-model="newAnimalInfo.place">
        <option value="">飼育地域</option>
        <option value="北海道">北海道</option>
        <option value="東北">東北</option>
        <option value="関東">関東</option>
        <option value="中部">中部</option>
        <option value="近畿">近畿</option>
        <option value="中国・四国">中国・四国</option>
        <option value="九州">九州</option>
      </select>
    </div>

    <div class="mb-4">
      <label for="textlabel" class="block mb-2">詳細</label>
      <textarea  
        class="p-2 rounded-md w-1/2 border border-[#333] focus:bg-yellow-100 focus:ring-2 focus:ring-[#333]" 
        id="textlabel" v-model="newAnimalInfo.remarks" rows="4" cols="10" placeholder="例) 活発で甘えん坊だけどお利口さん！"></textarea>
    </div>

    <div class="mb-7">
      <label for="charalabel" class="block mb-2">性格</label>
      <input 
        class="p-2 rounded-md w-1/2 border border-[#333]" 
        type="text" v-model="newAnimalInfo.chara" id="charalabel">
    </div>

    <the-normal-btn @click="addAnimal">
      ペットを登録する
    </the-normal-btn>

  </div>

</template>

<script setup>
  import { onMounted, ref  } from "vue";
  import { uuid4 } from "uuid4";
  import { useStore } from "vuex";
  import { useRoute, useRouter } from "vue-router";
  import TheNormalBtn from "../parts/TheNormalBtn.vue";


  /**
   * firebase imports
   */
  import { getStorage, deleteObject, ref as fsRef, uploadBytes } from "firebase/storage";
  import { collection, doc, addDoc, getDoc, updateDoc } from "firebase/firestore";
  import { db } from "../firebase";

  /**
   * firebase ref
   */
  const storage = getStorage()
  const animalCollectionRef = collection(db, 'animals')
  

  const store = useStore()
  const route = useRoute()  
  const router = useRouter()

  // 登録情報を格納
  let newAnimalInfo = ref({
    name: "",
    species: "",
    age: "",
    gender: "",
    place: "",
    chara: ["活発", "好奇心旺盛", "甘えん坊"],
    remarks: "",
    editor: ""
  })


  /**
   *  Editする場合, 既存のデータを反映
   *  選択されたドキュメントを編集
   * 
   * route.params.id  AnimalListで選択されたドキュメントid
   */

  onMounted( () => {
    if ( route.params.id ) {
      getDoc(doc(db, 'animals', route.params.id))
        .then( data => {
          newAnimalInfo.value = {
            name: data.data().name,
            species: data.data().species,
            age: data.data().age,
            gender: data.data().gender,
            place: data.data().place,
            chara: ["活発", "好奇心旺盛", "甘えん坊"],
            remarks: data.data().remarks,
            editor: data.data().editor
          }
          
          imageFileInfo.value = {
            imgName: "画像を変える場合は, 再選択してください",
            imgURL_copy: data.data().imgURL,
          }

          console.log(imageFileInfo.value);

        }).catch(() => {
          alert('データの取得に失敗しました')
          router.push('/list')
        })
    }
  })


  /**
   * FireStoreに情報を登録
   */
  
  const addAnimal = async () => {
    // Editの場合と, 新規登録の場合とで分岐

    // 新規登録の場合, 動物の情報と画像を登録
    if ( !newAnimalInfo.value.editor ) {

      const addDocAwait = 
        await addDoc(animalCollectionRef, {
          name: newAnimalInfo.value.name,
          species: newAnimalInfo.value.species,
          age: Number(newAnimalInfo.value.age),
          gender: newAnimalInfo.value.gender,
          place: newAnimalInfo.value.place,
          chara: newAnimalInfo.value.chara,
          remarks: newAnimalInfo.value.remarks,
          isPresent: true,
          imgURL: imageFileInfo.value.imgURL,
          editor: store.state.user.uid,
          date: Date.now()
        });
      
      const addImgAwait = 
        await uploadBytes(imageFileInfo.value.storageRef, imageFileInfo.value.file).then((snapshot) => {
          console.log("画像をアップロード", snapshot)
        })

      Promise.all( [ addDocAwait, addImgAwait ] ).then( () => {
          router.push('/list')
        }).catch ( () => {
          alert("アイテムの送信に失敗しました。再度やり直してください")
        })

    // Editの場合, 動物の情報をアップデート
    // 画像を変更した場合元の画像を削除&新しい画像をアップロード
    } else {

      let promiseAry = []

      const updateDocAwait = 
        await updateDoc(doc(db, 'animals', route.params.id), {
          name: newAnimalInfo.value.name,
          species: newAnimalInfo.value.species,
          age: parseInt(newAnimalInfo.value.age),
          gender: newAnimalInfo.value.gender,
          place: newAnimalInfo.value.place,
          chara: newAnimalInfo.value.chara,
          remarks: newAnimalInfo.value.remarks,
          isPresent: true
        })

      // 画像を変更した場合
      if ( imageFileInfo.value.imgURL !== imageFileInfo.value.imgURL_copy ) {

        const deleteImageAwait = 
          await deleteObject(fsRef(storage, imageFileInfo.value.imgURL_copy))

        const updateDocAwait =  
          await updateDoc(doc(db, 'animals', route.params.id), {
            imgURL: imageFileInfo.value.imgURL
          })

        const uploadImageAwait = 
          await uploadBytes(imageFileInfo.value.storageRef, imageFileInfo.value.file).then((snapshot) => {
            console.log("画像をアップロード", snapshot)
          })

          promiseAry = [ deleteImageAwait, updateDocAwait, uploadImageAwait ]
      }

      Promise.all( [ updateDocAwait, ...promiseAry ] )
        .then( () => {
          router.push('/list')
        }).catch( () => {
          alert('送信に失敗しました。再度お試しください。')
        })
    }
  }


  /**
   * 選択された画像の情報を保存
   */

  let imageFileInfo = ref({
    file: {},
    storageRef: {},
    imgURL: "",
    imgURL_copy: "",
    imgName: ""
  })

  const FOLDER_NAME = "images"

  // inputで画像を選択した時に発火し, 画像情報を修得
  const getImageFile = props => {
    const file = props.target.files[0]
    imageFileInfo.value.file = file
    // 画像が選択された事を表示する
    imageFileInfo.value.imgName = file.name
    // storage内のフォルダ名/ファイル名
    imageFileInfo.value.imgURL = `${FOLDER_NAME}/${String(uuid4()).substring(0,8)}.${file.type.substring(6)}`

    imageFileInfo.value.storageRef = fsRef(storage, imageFileInfo.value.imgURL);
  } 

</script>
