<template>
  <header class="relative w-full flex justify-center items-center bg-[rgb(255,255,255)] p-4 shadow-md">
    <h2 class="font-bold text-xl">{{ title }}</h2>
    <div class="absolute right-3">
      <router-link class="mr-1" :to="{ name: 'sign-in' }" v-if="!isLogin">
        <TheNormalBtn>
          ログイン
        </TheNormalBtn>
      </router-link>
      <the-normal-btn class="mr-2"
        @click="handleSignOut" v-if="isLogin">
        サインアウト
      </the-normal-btn>
      <router-link to="/register" v-if="!isLogin">
        <the-normal-btn>
          新規登録
        </the-normal-btn>
      </router-link>
    </div>
  </header>
  
</template>

<script setup>
  import { computed } from "vue";
  import TheNormalBtn from "../parts/TheNormalBtn.vue";
  import { getAuth, signOut } from "firebase/auth";
  import { useRouter } from "vue-router";
  import { useStore } from "vuex";

  const router = useRouter()
  const store = useStore()

  defineProps({
    title: String
  })

  const isLogin = computed( () => store.state.isLogin )

  
  /**
   * Headerが再読み込みされない
   */

  const handleSignOut = () => {
    signOut(getAuth()).then( () => {
      store.dispatch('signOut')
      router.push("/list")
    })
  }

</script>