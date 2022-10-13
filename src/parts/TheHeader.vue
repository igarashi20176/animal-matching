<template>
  <header class="relative w-full flex justify-center items-center bg-[rgb(255,255,255)] p-4 shadow-md">
    <h2 class="font-bold text-xl">{{ title }}</h2>
    <div class="absolute right-3">
      <router-link class="mr-1" to="/sign-in" v-if="!isLoggedIn">
        <TheNormalBtn>
          ログイン
        </TheNormalBtn>
      </router-link>
      <the-normal-btn class="mr-2"
        @click="handleSignOut" v-if="isLoggedIn">
        サインアウト
      </the-normal-btn>
      <router-link to="/register">
        <the-normal-btn>
          新規登録
        </the-normal-btn>
      </router-link>
    </div>
  </header>
  
</template>

<script setup>
  import { onMounted, ref } from "vue";
  import TheNormalBtn from "../parts/TheNormalBtn.vue";
  import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
  import { useRouter } from "vue-router";

  const router = useRouter()

  defineProps({
    title: String
  })

  let isLoggedIn = ref(false)

  let auth
  onMounted( () => {
    auth = getAuth()
    onAuthStateChanged(auth, user => {
      if ( user ) {
        isLoggedIn.value  = true 
      } else {
        isLoggedIn.value = false
      }
    })
  })

  const handleSignOut = () => {
    signOut(auth).then( () => {
      router.push("/list")
    })
  }
</script>