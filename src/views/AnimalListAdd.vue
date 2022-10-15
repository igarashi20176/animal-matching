<template>

  <h2
    class="font-bold text-center text-3xl py-3 mb-10 border-b-2 border-gray-400">
    登録フォーム
  </h2>

  <div class="w-4/5 text-center m-auto bg-gray-300 py-3 rounded-xl">

    <div class="mb-6 p-2">
      <input 
        class="p-2 rounded-md w-1/2 h-12 focus:bg-yellow-100 focus:ring-[#333]" 
        type="text" v-model="newAnimalInfo.name" placeholder="お名前">
    </div>

    <div class="mb-10">
      <p class="mb-3" v-if="!newAnimalInfo.imgName">※サムネイルとなるペットの画像を選択してください</p>
      <p class="mb-3" v-else>画像が選択されました: {{ newAnimalInfo.imgName }}</p>
      <label class="block w-1/3 m-auto p-2 rounded-md bg-white text-[#333] hover:bg-yellow-100">
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
        <option value="car">ネコ</option>
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
        class="p-2 rounded-md w-1/2 focus:bg-yellow-100 focus:ring-2 focus:ring-[#333]" 
        id="textlabel" v-model="newAnimalInfo.remarks" rows="4" cols="10" placeholder="例) 活発で甘えん坊だけどお利口さん！"></textarea>
    </div>

    <div class="mb-7">
      <label for="charalabel" class="block mb-2">性格</label>
      <input 
        class="p-2 rounded-md w-1/2" 
        type="text" v-model="newAnimalInfo.chara" id="charalabel">
    </div>

    <the-normal-btn @click="addAnimal">
      ペットを登録する
    </the-normal-btn>

  </div>

</template>

<script setup>
  import { ref } from "vue";
  import { uuid4 } from "uuid4";
  import TheNormalBtn from "../parts/TheNormalBtn.vue";
  import { useStore } from "vuex";

  /**
   * firebase imports
   */
  import { getStorage, ref as fsRef, uploadBytes } from "firebase/storage";
  import { collection, addDoc } from "firebase/firestore";
  import { db } from "../firebase";

  const storage = getStorage()
  const animalCollectionRef = collection(db, 'animals')


  const store = useStore()
  // 登録情報を格納
  let newAnimalInfo = ref({
    name: "",
    species: "",
    age: "",
    gender: "",
    place: "",
    chara: ["活発", "好奇心旺盛", "甘えん坊"],
    remarks: "",
    imgUrl: "",
    imgName: ""
  })


  /**
   * Firebaseに情報を登録
   */
  const addAnimal = async () => {
    uploadImageFile()
  
    addDoc(animalCollectionRef, {
      name: newAnimalInfo.value.name,
      species: newAnimalInfo.value.species,
      age: Number(newAnimalInfo.value.age),
      gender: newAnimalInfo.value.gender,
      place: newAnimalInfo.value.place,
      chara: newAnimalInfo.value.chara,
      remarks: newAnimalInfo.value.remarks,
      isFav: false,
      isPresent: true,
      imgURL: newAnimalInfo.value.imgUrl,
      editor: store.state.userId,
      date: Date.now()
  });
    newAnimalInfo.value.name = ""
    newAnimalInfo.value.species = ""
    newAnimalInfo.value.age = ""
    newAnimalInfo.value.gender = ""
    newAnimalInfo.value.place = ""
    newAnimalInfo.value.remarks = ""
  }


  /**
   * イメージ画像を取得・アップロード
   */
  let imageFileInfo = ref({
    file: {},
    uuidFileName: ""
  })

  // inputで画像を選択した時に発火
  const FOLDER_NAME = "images"
  
  const getImageFile = props => {
    const file = props.target.files[0]
    imageFileInfo.value.file = file
    // 画像が選択された事を表示する
    newAnimalInfo.value.imgName = file.name
    // storage内のフォルダ/ファイル名
    imageFileInfo.value.uuidFileName = `${FOLDER_NAME}/${String(uuid4()).substring(0,8)}.${file.type.substring(6)}`
  } 

  const uploadImageFile = () => {
    const storageRef = fsRef(storage, imageFileInfo.value.uuidFileName);

    // firestoreの情報にstorageの画像のURLを結びつける
    newAnimalInfo.value.imgUrl = `gs://${storageRef.bucket}/${imageFileInfo.value.uuidFileName}`;

    // Firebaseにデータを適切に送るために必要なコード
    uploadBytes(storageRef, imageFileInfo.value.file).then((snapshot) => {
      console.log("画像をアップロード", snapshot);
    });
  }

</script>
