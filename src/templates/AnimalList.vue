<template>
  <h2 v-if="route.params.filter"
    class="font-bold text-center text-2xl width-[2px] py-3 border-b-2 border-gray-400">
    お気に入り
  </h2>
  <h2 v-else
    class="font-bold text-center text-2xl width-[2px] py-3 border-b-2 border-gray-400">
    一覧
  </h2>
  <p class="text-right m-5">フィルター機能</p>

  <ul v-for="(list, idx) in lists">
    <li :key="list.id">
      <AnimalListItem :list="list"  />
    </li>
  </ul>
</template>

<script setup>
  import { computed } from "vue"
  import { useRoute } from "vue-router"
  import { useStore } from "vuex"
  import AnimalListItem from "../parts/AnimalListItem.vue";
  
  const route = useRoute()
  const store = useStore()
  
  const lists = computed( () => {
    if ( route.params.filter ) {
      return store.getters.getAnimalByFav
    } else {
      return store.getters.getAll
    }
  })

</script>