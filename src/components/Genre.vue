<template>
  <div class="d-flex flex-wrap">
    <v-chip v-for="genre in genresName" class="mx-1 my-1">
      {{ genre.name }}
    </v-chip>
  </div>
</template>
<script setup lang="ts">
import { defineProps, onMounted, ref } from "vue"
import getMovies from "../composable/Movies"
import { GenresType } from "../types/"

const props = defineProps<{
  genre: number[]
}>()

const { getGenre } = getMovies()
const genresName = ref<GenresType[]>([])
const maxGenre = 2
const displayedGenre = ref<GenresType[]>([])

const fetchGenre = async () => {
  try {
    const res = await getGenre()

    if (!res) {
      return "Genre not found"
    }

    genresName.value = props.genre
      .map((genreId) => res.find((genre) => genre.id === genreId))
      .filter((genre): genre is GenresType => genre !== undefined)
  } catch (error) {
    console.error("Error fetching movies:", error)
  }
}

onMounted(async () => {
  await fetchGenre()
  displayedGenre.value = genresName.value.slice(0, maxGenre)
})
</script>
<style>
.c {
  border: 1px solid white;
  position: relative;
  bottom: 0;
}
</style>
