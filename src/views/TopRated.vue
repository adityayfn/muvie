<template>
  <v-container>
    <v-card class="d-flex">
      <h2>
        <v-icon color="yellow" class="ml-1 mt-2" icon="mdi-star"></v-icon>
      </h2>
      <h1 class="ml-2">Top Rated</h1>
    </v-card>

    <Card :movies="movies" />
    <div class="text-center">
      <v-pagination
        v-if="totalPages > 1"
        v-model="currentPage"
        :length="20"
        :total-visible="4"
        prev-icon="mdi-chevron-left"
        next-icon="mdi-chevron-right"
      ></v-pagination>
    </div>
  </v-container>
</template>
<script setup lang="ts">
import getMovies from "../composable/Movies"

import Card from "../components/card/Card.vue"
import { ref, watch, onMounted } from "vue"
import { useHead } from "@vueuse/head"
import { MoviesType } from "../types/"

const { getTopRated } = getMovies()

const movies = ref<MoviesType[]>([])
const currentPage = ref<number>(1)
const totalPages = ref<number>(0)

const fetchMoviesData = async () => {
  try {
    const data = await getTopRated(currentPage.value)

    if (!data) {
      return "Data not found"
    }

    movies.value = data.results
    totalPages.value = data.total_pages

    window.scrollTo({ top: 0, behavior: "smooth" })
  } catch (error) {
    console.error("Error fetching movies:", error)
  }
}
onMounted(async () => {
  await fetchMoviesData()
})
watch(currentPage, () => {
  fetchMoviesData()
})

useHead({
  title: "Muvie - Top Rated",
  meta: [
    {
      name: `description`,
      content: "This is top rated collection ",
    },
  ],
})
</script>
<style scoped></style>
