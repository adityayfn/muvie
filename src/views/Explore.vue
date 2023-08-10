<template>
  <v-container>
    <v-text-field v-model="query" label="Search Movies"></v-text-field>

    <div v-if="searchResults.length > 0">
      <CardXs :movies="searchResults" v-if="$vuetify.display.xs" />
      <CardSmUp :movies="searchResults" v-if="$vuetify.display.smAndUp" />
      <div class="text-center my-0 mx-auto" v-if="$vuetify.display.xs">
        <v-pagination
          v-if="totalPages > 1"
          v-model="currentPage"
          :length="20"
          :total-visible="4"
          prev-icon="mdi-chevron-left"
          next-icon="mdi-chevron-right"
        ></v-pagination>
      </div>
      <div class="text-center my-0 mx-auto" v-if="$vuetify.display.smAndUp">
        <v-pagination
          v-if="totalPages > 1"
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
<script setup>
import getMovies from "../composable/Movies"
import CardSmUp from "../components/card/CardSmUp.vue"
import CardXs from "../components/card/CardXs.vue"
import { ref, watch } from "vue"
const { getSearch } = getMovies()

const query = ref("")
const currentPage = ref(1)
const searchResults = ref([])
const totalPages = ref(null)

const searchMovies = async () => {
  try {
    const data = await getSearch(query.value, currentPage.value)
    searchResults.value = data.results
    totalPages.value = data.total_pages
    console.log(data.results)

    window.scrollTo({ top: 0, behavior: "smooth" })
  } catch (error) {
    console.log(error)
  }
}

watch(async () => {
  await searchMovies()
})
</script>
<style></style>
