<template>
  <div class="d-flex flex-wrap">
    <v-chip v-for="genre in genresName" class="mx-1 my-1">
      {{ genre }}
    </v-chip>
  </div>
</template>
<script setup>
import { defineProps, onMounted, ref } from "vue"
const genreIds = defineProps(["genre"])
import getMovies from "../composable/Movies"

const { getGenre } = getMovies()
const genresName = ref([])
const maxGenre = 2
const displayedGenre = ref([])

const fetchGenre = async () => {
  try {
    const res = await getGenre()

    genresName.value = genreIds.genre.map((genreId) => {
      return res.genres.find((genre) => genre.id === genreId)?.name || "Unknown"
    })
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
