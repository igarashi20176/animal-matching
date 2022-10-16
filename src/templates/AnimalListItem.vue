<template>

  <a v-if="isFilter"
    class="block cursor-pointer shadow-under hover:shadow-natural relative p-2 border-2 rounded-3xl border-gray-400 bg-lime-50 transition hover:translate-y-[1px]"
    @click.stop="emits('change-detail', props.animal.id)">

    <!-- Edit・Deleteボタン -->
    <div class="absolute right-[3%] flex" v-if="props.isEditor">
      <!-- 選択されたデータの編集を行う -->
      <button @click.stop="router.push({ name: 'add', params: { id: props.animal.id } })"
        class="block w-[40px] mr-2 pb-1 h-auto hover:border-b-2 hover:border-gray-500 transition">
        <img src="../assets/images/editIcon.png" alt="">
      </button>
      <button @click.stop="emits('delete-doc', props.animal.id)"
        class="w-[40px] mr-2 pb-1 h-auto hover:border-b-2 hover:border-gray-500 transition">
        <img src="../assets/images/deleteIcon.png" alt="">
      </button>
    </div>

    <figure class="flex gap-x-10">
      <img 
        class="w-[120px] h-[150px] ml-32 border-2 border-gray-400 rounded-md"
        :src="`${props.animal.imgURL}`" :alt="props.animal.name">
      <figcaption> 
        <p class="my-1 text-3xl font-bold">
          {{ props.animal.name }}
          <the-fav-btn v-if="props.isFav !== null" 
            @click.stop="emits('toggle-fav', props.animal.id, props.isFav)" 
            :is-fav="props.isFav" />
        </p>
        <p class="my-3 text-2xl font-bold">
          <span class="text-blue-500"
            v-if="props.animal.gender === 'male'">♂オス </span> <span class="text-red-500" v-else>♀メス
          </span>
          <span class="text-xl">{{ props.animal.age }}歳 / {{ props.animal.place }}</span>
        </p>
        <p class="mt-5 text-xl font-bold">{{ props.animal.chara.join(` `) }}</p>
      </figcaption>     
    </figure>
    <img 
      class="absolute top-0 left-0 w-[70px] h-[70px]"
      src="../assets/images/dog_silhouette.png" alt="dog" v-if="props.animal.species === 'dog'">
    <img
      class="absolute top-0 left-0 w-[70px] h-[70px]"
      src="../assets/images/cat_silhouette.png" alt="dog" v-if="props.animal.species === 'cat'">
    
  </a>

</template>

<script setup>
  import { computed } from "vue";
  import TheFavBtn from "../parts/TheFavBtn.vue";
  import { useRouter } from "vue-router";

  const props = defineProps({
    animal: Object,
    isFav: [ Boolean, null ],
    isFavFilter: { type: Boolean, default: false },
    isEditor: { type: Boolean, default: false }
  })

  const router = useRouter()

  
  const isFilter = computed( () => {
    // お気に入りのみの絞り込みであるとき, 表示/非表示を判定
    if ( props.isFavFilter ) {
      return props.isFav
    } else {
      // お気に入りの絞り込みではないとき, すべて表示
      return true
    }
  })

  const emits = defineEmits([ 'change-detail', 'toggle-fav', 'delete-doc' ])
</script>
