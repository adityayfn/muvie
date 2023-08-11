<template>
  <v-container v-if="$vuetify.display.xs">
    <v-card class="d-flex">
      <h2>
        <v-icon color="red" class="ml-1 mt-2" icon="mdi-home"></v-icon>
      </h2>
      <h1 class="ml-2">Discover</h1>
    </v-card>
    <CardXs :movies="movies" />

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

  <v-container v-if="$vuetify.display.smAndUp">
    <v-card class="d-flex">
      <h2>
        <v-icon
          color="red"
          class="ml-2 mt-2"
          icon="mdi-home"
          size="x-large"
        ></v-icon>
      </h2>
      <h1 class="ml-5 h1-md">Discover</h1>
    </v-card>

    <CardSmUp :movies="movies" />

    <div class="text-center my-0 mx-auto">
      <v-pagination
        v-if="totalPages > 1"
        v-model="currentPage"
        :length="20"
        :total-visible="9"
        @input="fetchMoviesData"
        prev-icon="mdi-chevron-left"
        next-icon="mdi-chevron-right"
      ></v-pagination>
    </div>
  </v-container>
</template>
<script setup>
import getMovies from "../composable/Movies"
import CardXs from "../components/card/CardXs.vue"
import CardSmUp from "../components/card/CardSmUp.vue"
import { ref, watch, onMounted } from "vue"
import { useHead } from "@vueuse/head"

const { getDiscover } = getMovies()

const movies = ref([])
const currentPage = ref(1)
const totalPages = ref(0)

const fetchMoviesData = async () => {
  try {
    const data = await getDiscover(currentPage.value)

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
