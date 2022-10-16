<template>
  <h2 class="font-bold text-3xl border-b-2 border-gray-400 pb-2 text-center my-4">アカウント作成</h2>
  <div class="w-3/4 h-3/4 flex flex-col items-center gap-y-5 m-auto p-5 rounded-lg bg-gray-200">
    <p><input type="text" class="mt-8 h-9 rounded-md p-1 border border-[#333] focus:bg-yellow-100" placeholder="Email" v-model="email"></p>
    <p><input type="password" class="h-9 rounded-md p-1 border border-[#333] focus:bg-yellow-100" placeholder="Password" v-model="password"></p>
    <the-normal-btn class="inline" @click="register">
      登録する
    </the-normal-btn>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
  import { useRouter } from "vue-router";
  import TheNormalBtn from "../parts/TheNormalBtn.vue";
  
  import { doc, setDoc,
  } from "firebase/firestore";
  import { db } from "../firebase";

  const router = useRouter()

  let email = ref("")
  let password = ref("")

  
  const register = () => {
    createUserWithEmailAndPassword(getAuth(), email.value, password.value)
      .then (data => {
        console.log("Successfully registered!", data.user.uid);
        
        const uid = data.user.uid
        setDoc( doc(db, 'users', uid ), {
          chara: "",
          favList: []
        })
        router.push("/list")
      })
      .catch (error => {
        console.log(error.code);
        alert(error.message)
      })
  }
</script>