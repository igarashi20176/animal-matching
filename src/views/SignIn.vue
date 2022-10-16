<template>
  <h2 class="font-bold text-3xl border-b-2 border-gray-400 pb-2 text-center my-4">ログイン</h2>
  <div class="w-3/4 h-3/4 flex flex-col items-center gap-y-5 m-auto p-5 rounded-lg bg-rose-100">
    <p class="text-red-500 text-md">{{ errMsg }}</p>
    <p><input type="text" class="h-9 rounded-md mt-8 p-1 border border-[#333] focus:bg-yellow-100" placeholder="Email" v-model="email"></p>
    <p><input type="password" class="h-9 rounded-md p-1 border border-[#333] focus:bg-yellow-100" placeholder="Password" v-model="password"></p>
    <the-normal-btn class="inline" @click="signIn">
      ログインする
    </the-normal-btn>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
  import { useRoute, useRouter } from "vue-router";
  import TheNormalBtn from "../parts/TheNormalBtn.vue";
  import { useStore } from "vuex";

  import { doc, getDoc,
  } from "firebase/firestore";
  import { db } from "../firebase";

  const userInfo = ref({})
  
  const route = useRoute()
  const router = useRouter()
  const store = useStore()

  let email = ref("")
  let password = ref("")
  let errMsg = ref("")

  if ( route.params.errMsg ) {
    errMsg.value = route.params.errMsg
  }

  const signIn = () => {
    signInWithEmailAndPassword(getAuth(), email.value, password.value)
      .then (data => {
        console.log("Successfully Signed in!");
        
        const uid = data.user.uid
        const userDocRef = doc(db, 'users', uid )
        
        getDoc( userDocRef )
          .then(data => {
            userInfo.value = data.data()
            userInfo.value.uid = uid
            store.dispatch("auth", userInfo.value)
    
            // vuexに, ログイン状態とuidを登録
            router.push("/list")
          })
        })
        .catch (error => {
          console.log(error.code);
          switch (error.code) {
          case "auth/invalid-email":
            errMsg.value = "Emailが無効です"
            break
          case "auth/wrong-password":
            errMsg.value = "パスワードが間違っています"
            break
          case "auth/user-not-found":
            errMsg.value = "Emailに紐づくユーザが見つかりませんでした"
            break
          default:
            errMsg.value = "Emailかパスワードが間違っています"
            break
          }
        })
    }
</script>