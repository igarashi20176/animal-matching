<template>
  <a class="block cursor-pointer" @click.prevent="showDetailItem(list.id)">
    <div class="relative m-6 p-2 border-2 rounded-2xl border-gray-400 bg-[#f9fafb] shadow-[5px_3px_5px_1px_rgba(0,0,0,0.3)] hover:shadow-[0_0_8px_3px_rgba(0,0,0,0.3)] transition hover:translate-y-[-2px]">
      <figure class="flex">
        <img 
          class="w-[110px] h-[150px] ml-28 mr-10 border-2 border-gray-400 rounded-[9999px]"
          :src="`/src/assets/images/${list.img}.jpg`" :alt="list.img">
        <div> 
          <p class="my-1 text-3xl font-bold">
            {{ list.name }}
          <TheFavBtn @click.stop="clickFav(list.id)" :isFav="list.isFav" />
          </p>
          <p class="my-3 text-2xl font-bold">
            <span class="text-blue-500" 
              v-if="list.gender === 'male'">♂オス </span> <span class="text-red-500" v-else>♀メス
            </span>
            <span class="text-xl">{{ list.age }}歳 / {{ list.place }}</span>
          </p>
          <p class="mt-5 text-xl font-bold">性格: {{ list.chara.join(", ") }}</p>
        </div>        
      </figure>
      <img 
        class="absolute top-0 left-0 w-[70px] h-[70px] bg-[]"
        src="../assets/images/dog_silhouette.png" alt="dog" v-if="list.species === 'dog'">
      <img
        class="absolute top-0 left-0 w-[70px] h-[70px]"
        src="../assets/images/cat_silhouette.png" alt="dog" v-if="list.species === 'cat'">
      <img src="../assets/images/arrow.png" alt="arrow" class="absolute top-1/3 right-5 w-[50px] h-auto rotate-90">
    </div>
  </a>
</template>

<script setup>
  import store from "../store/store";
  import { useRouter } from "vue-router";
  import TheFavBtn from "./TheFavBtn.vue";

  const router = useRouter()
  defineProps({
    list: Object
  })

  const clickFav = id => {
    store.commit('toggleFav', id)
  }

  const showDetailItem = id => {
    router.push({ name: 'detail', params: { id: id } })
  }
</script>