<template>

  <h2
    class="font-bold text-center text-3xl py-3 mb-10 border-b-2 border-gray-400">
    登録フォーム
  </h2>

  <div class="w-4/5 text-center m-auto bg-gray-300 py-3 rounded-xl">

    <div class="mb-5 p-2">
      <input 
        class="p-2 rounded-md w-1/2 h-12 focus:bg-yellow-100 focus:ring-[#333]" 
        type="text" v-model="name" placeholder="名前">
    </div>

    <div class="flex justify-center">
      <select 
        class="w-1/4 h-11 p-2 rounded-tl-md border-r-2 border-b-2 focus:bg-yellow-100" 
        list="gender" v-model="gender" required>
        <option value="">性別</option>
        <option value="male">オス</option>
        <option value="female">メス</option>
      </select>

      <select 
        class="w-1/4 h-11 p-2 rounded-tr-md border-b-2 focus:bg-yellow-100" 
        list="species" v-model="species" required>
        <option value="">種別</option>
        <option value="dog">ネコ</option>
        <option value="cat">イヌ</option>
      </select>
    </div>

    <div class="mb-7 flex justify-center">
      <select 
        class="w-1/4 h-11 p-2 rounded-bl-md border-r-2 focus:bg-yellow-100" 
        list="age" v-model="age" required>
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
        list="place" v-model="place">
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
        id="textlabel" v-model="text" rows="4" cols="10" placeholder="例) 活発で甘えん坊だけどお利口さん！"></textarea>
    </div>

    <div class="mb-7">
      <label for="charalabel" class="block mb-2">性格</label>
      <input 
        class="p-2 rounded-md w-1/2" 
        type="text" v-model="name" id="charalabel">
    </div>

    <div @click="addAnimal">
      <button class="border-2 border-red-300 px-10 py-1 rounded-2xl hover:bg-red-200">送信</button>
    </div>  

  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { collection, addDoc } from "firebase/firestore";
  import { db } from "../firebase";

  const animalCollectionRef = collection(db, 'animals')

  
  let name = ref("")
  let species = ref("")
  let age = ref("")
  let gender = ref("")
  let place = ref("")
  let chara = ref(["活発", "好奇心旺盛", "甘えん坊"])
  let text = ref("")
  let remarks = ref("")

  const addAnimal = () => {
    addDoc(animalCollectionRef, {
      name: name.value,
      species: species.value,
      age: Number(age.value),
      gender: gender.value,
      place: place.value,
      remarks: remarks.value,
      imgURL: "",
      isFav: false,
      isPresent: true,
      chara: chara.value,
      date: Date.now()
  });
    name.value = ""
    species.value = ""
    age.value = 0
    gender.value = ""
    place.value = ""
    remarks.value = ""
  }

</script>
