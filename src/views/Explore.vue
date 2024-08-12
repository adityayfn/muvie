<template>
  <v-container>
    <v-text-field v-model="query" label="Search Movies"></v-text-field>

    <div v-if="searchResults.length > 0">
      <Card :movies="searchResults" />
      <div class="text-center my-0 mx-auto">
        <v-pagination
          v-if="totalPages! > 1"
          v-model="currentPage"
          :length="20"
          :total-visible="4"
          prev-icon="mdi-chevron-left"
          next-icon="mdi-chevron-right"
        ></v-pagination>
      </div>
      <div class="text-center my-0 mx-auto">
        <v-pagination
          v-if="totalPages! > 1"
          v-model="currentPage"
          :length="20"
          :total-visible="8"
          prev-icon="mdi-chevron-left"
          next-icon="mdi-chevron-right"
        ></v-pagination>
      </div>
    </div>
    <div v-else-if="query.length <= 0">
      <h1>Please Fill Input Column</h1>
    </div>
    <div v-else-if="searchResults.length <= 0">
      <h1>No Results Found</h1>
    </div>
  </v-container>
</template>
<script setup lang="ts">
import getMovies from "../composable/Movies"
import Card from "../components/card/Card.vue"
import { ref, watch } from "vue"
import { MoviesType } from "../types/"

const { getSearch } = getMovies()

const query = ref<string>("")
const currentPage = ref<number>(1)
const searchResults = ref<MoviesType[]>([])
const totalPages = ref<number | null>(null)

const searchMovies = async () => {
  try {
    const data = await getSearch(query.value, currentPage.value)

    if (!data) {
      return "Data not Found"
    }
    searchResults.value = data.results
    totalPages.value = data.total_pages

    window.scrollTo({ top: 0, behavior: "smooth" })
  } catch (error) {
    console.log(error)
  }
}

watch(query, () => {
  setTimeout(async () => {
    await searchMovies()
  }, 1000)
})
</script>
<style></style>
