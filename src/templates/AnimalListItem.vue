<template>
  <!-- @click.prevent="showDetailItem(props.animal.id) -->
  <a class="block cursor-pointer" @click.stop="emits('change-detail', props.animal.id)">
    <div class="shadow-under hover:shadow-natural relative p-2 border-2 rounded-3xl border-gray-400 bg-lime-50 transition hover:translate-y-[1px]">
      <figure class="flex gap-x-10">
        <img 
          class="w-[120px] h-[150px] ml-32 border-2 border-gray-400 rounded-md"
          :src="`${props.animal.imgURL}`" :alt="props.animal.name">
        <figcaption> 
          <p class="my-1 text-3xl font-bold">
            {{ props.animal.name }}
            <the-fav-btn @click.stop="emits('toggle-fav', props.animal.id)" :isFav="props.animal.isFav" />
          </p>
          <p class="my-3 text-2xl font-bold">
            <span class="text-blue-500" git
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
      <img src="../assets/images/arrow_circle.png" alt="arrow" class="absolute top-1/3 right-5 w-[50px] h-auto">
    </div>
  </a>
</template>

<script setup>
  import TheFavBtn from "../parts/TheFavBtn.vue";

  const props = defineProps({
    animal: Object
  })

  const emits = defineEmits([ 'change-detail', 'toggle-fav' ])
  
</script>
