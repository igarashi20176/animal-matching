<template>
  <div class="w-[80%] border-2 border-solid m-auto bg-gray-200 py-3 rounded-xl">
    <div class="text-center mb-7">
      <label for="namelabel" class="block mb-2">名前</label>
      <input class="p-2 rounded-md w-[50%] h-10" type="text" v-model="name" id="namelabel" placeholder="例）タマ">
    </div>
    <div class="text-center mb-7 flex justify-center">
      <div class="mr-10">
        <label for="agelabel" class="block p-1 mb-2">年齢(推定)</label>
        <select class="p-2 rounded-md h-10 mr-5" type="number" list="age" v-model="age" id="agelabel" placeholder="" min="0">
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
      </div>
      <div>
        <label for="weeklabel" class="block p-1 mb-2">飼育地域</label>
        <select class="p-2 rounded-md h-10 mr-5" type="number" list="age" v-model="age" id="agelabel" placeholder="" min="0">
          <option value="北海道">北海道</option>
          <option value="東北">東北</option>
          <option value="関東">関東</option>
          <option value="中部">中部</option>
          <option value="近畿">近畿</option>
          <option value="中国">中国</option>
          <option value="四国">四国</option>
          <option value="九州">九州</option>
        </select>
      </div>
    </div>
    <div class="text-center mb-4">
      <label for="ikenlabel" class="block mb-2">ご意見</label>
      <textarea  class="p-2 rounded-md w-[50%]" id="iken" v-model="text" rows="4" max="40" placeholder="活発で甘えん坊だけどお利口さん！"></textarea>
    </div>
    <div class="text-center mb-7">
      <label for="charalabel" class="block mb-2">性格</label>
      <input class="p-2 rounded-md w-[50%] h-10" type="text" v-model="name" id="charalabel" placeholder="例）タマ">
    </div>
    <div class="text-center">
      <button class="border-2 border-red-300 px-10 py-1 rounded-2xl hover:bg-red-200">送信</button>
    </div>  
  </div>
</template>

<script setup>
  import { ref } from "vue";

  let name = ref("")
  let age = ref("")
  let week = ref("")
  let text = ref("")
</script>
