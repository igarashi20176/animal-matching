<template>
  <h2 v-if="route.params.filter"
    class="font-bold text-center text-3xl width-[2px] py-3 border-b-2 border-gray-400">
    お気に入り
  </h2>
  <h2 v-else
    class="font-bold text-center text-3xl width-[2px] py-3 border-b-2 border-gray-400">
    一覧
  </h2>
  <p class="text-right m-5">フィルター機能</p>
<<<<<<< HEAD:src/templates/AnimalList.vue

  <ul v-for="list in lists">
    <li :key="list.id">
      <AnimalListItem :list="list" />
=======
  <ul v-for="list in lists">
    <li>
      <AnimalListItem :list="list"  />
>>>>>>> 5474ccfe80450524a2ab9f150652682d16fa12ed:src/views/AnimalList.vue
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