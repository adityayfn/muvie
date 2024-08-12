<template>
  <v-container>
    <v-card class="d-flex">
      <h2>
        <v-icon color="red" class="ml-1 mt-2" icon="mdi-home"></v-icon>
      </h2>
      <h1 class="ml-2">Discover</h1>
    </v-card>
    <Card :movies="movies" />

    <div class="text-center">
      <v-pagination
        v-if="totalPages > 1"
        v-model="currentPage"
        :length="20"
        :total-visible="4"
        @input="fetchMoviesData"
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

const { getDiscover } = getMovies()

const movies = ref<MoviesType[]>([])
const currentPage = ref<number>(1)
const totalPages = ref<number>(0)

const fetchMoviesData = async () => {
  try {
    const data = await getDiscover(currentPage.value)

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
  title: "Muvie - Discover",
  meta: [
    {
      name: `description`,
      content: "This is discover collection ",
    },
  ],
})
</script>
<style scoped></style>
