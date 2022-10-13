<template>
  <h2 class="font-bold text-3xl border-b-2 border-gray-400 pb-2 text-center my-4">ログイン</h2>
  <div class="w-3/4 flex flex-col items-center gap-y-5 m-auto p-5 bg-gray-200">
    <p><input type="text" class="h-9 rounded-md p-1" placeholder="Email" v-model="email"></p>
    <p><input type="password" class="h-9 rounded-md p-1" placeholder="Password" v-model="password"></p>
    <the-normal-btn class="inline" @click="register">
      ログインする
    </the-normal-btn>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
  import { useRouter } from "vue-router";
  import TheNormalBtn from "../parts/TheNormalBtn.vue";
  
  const router = useRouter()

  let email = ref("")
  let password = ref("")
  let errMsg = ref("")

  const register = () => {
    signInWithEmailAndPassword(getAuth(), email.value, password.value)
      .then (data => {
        console.log("Successfully Signed in!");
        router.push("/list")
      })
      .catch (error => {
        console.log(error.code);
        switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "Invalid Email"
          break
        case "auth/wrong-password":
          errMsg.value = "Incorrect Password"
          break
        case "auth/user-not-found":
          errMsg.value = "No account with that email was found "
          break
        default:
          errMsg.value = "Email or Password was incorrect"
          break
        }
      })
  }
</script>