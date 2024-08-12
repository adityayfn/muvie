<template>
  <v-container>
    <v-card class="d-flex">
      <h2>
        <v-icon color="green" class="ml-1 mt-2" icon="mdi-chart-line"></v-icon>
      </h2>
      <h1 class="ml-2">Trending</h1>
    </v-card>

    <v-container class="d-flex flex-wrap">
      <v-tabs>
        <v-tab @click="changeTab('Day')">Day</v-tab>
        <v-tab @click="changeTab('Week')">Week</v-tab>
      </v-tabs>

      <Card :movies="getDay" v-if="tabActive == 'Day'" />

      <Card :movies="getWeek" v-if="tabActive == 'Week'" />
    </v-container>
  </v-container>
</template>
<script setup lang="ts">
import getMovies from "../composable/Movies"

import Card from "../components/card/Card.vue"
import { ref, onMounted } from "vue"
import { useHead } from "@vueuse/head"
import { MoviesType } from "../types/"

const { getTrendingDay, getTrendingWeek } = getMovies()

const tabActive = ref<string>("Day")

const getDay = ref<MoviesType[]>([])
const getWeek = ref<MoviesType[]>([])

const changeTab = (tab: string) => {
  tabActive.value = tab
}

const fetchDay = async () => {
  try {
    const dataDay = await getTrendingDay()
    const dataWeek = await getTrendingWeek()

    if (!dataDay || !dataWeek) {
      return "Data not Found"
    }

    getDay.value = dataDay
    getWeek.value = dataWeek

    window.scrollTo({ top: 0, behavior: "smooth" })
  } catch (error) {
    console.error("Error fetching movies:", error)
  }
}

onMounted(async () => {
  await fetchDay()
})

useHead({
  title: "Muvie - Trending",
  meta: [
    {
      name: `description`,
      content: "This is trending collection ",
    },
  ],
})
</script>
<style scoped></style>
