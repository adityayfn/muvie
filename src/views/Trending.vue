<template>
  <v-container v-if="$vuetify.display.xs">
    <v-card class="d-flex">
      <h2>
        <v-icon color="green" class="ml-1 mt-2" icon="mdi-chart-line"></v-icon>
      </h2>
      <h1 class="ml-2">Trending</h1>
    </v-card>

    <v-container class="d-flex flex-wrap">
      <v-tabs v-model="tab" bg-color="#212121" centered>
        <v-tab @click=";(day = true), (week = false)">Day</v-tab>
        <v-tab @click=";(week = true), (day = false)">Week</v-tab>
      </v-tabs>

      <CardXs :movies="getDay" v-if="day" />

      <CardXs :movies="getWeek" v-if="week" />
    </v-container>
  </v-container>

  <v-container v-if="$vuetify.display.smAndUp">
    <v-card class="d-flex">
      <h2>
        <v-icon
          color="green"
          class="ml-2 mt-2"
          icon="mdi-chart-line"
          size="x-large"
        ></v-icon>
      </h2>
      <h1 class="ml-5 h1-md">Trending</h1>
    </v-card>

    <v-container class="d-flex flex-wrap">
      <v-tabs v-model="tab" bg-color="#212121" centered>
        <v-tab @click=";(day = true), (week = false)">Day</v-tab>
        <v-tab @click=";(week = true), (day = false)">Week</v-tab>
      </v-tabs>

      <CardSmUp :movies="getDay" v-if="day" />

      <CardSmUp :movies="getWeek" v-if="week" />
    </v-container>
  </v-container>
</template>
<script setup>
import getMovies from "../composable/Movies"

import CardSmUp from "../components/card/CardSmUp.vue"
import CardXs from "../components/card/CardXs.vue"
import { ref, onMounted } from "vue"
const { getTrendingDay, getTrendingWeek } = getMovies()

const day = ref(true)
const week = ref(false)

const getDay = ref([])
const getWeek = ref([])

const fetchDay = async () => {
  try {
    const dataDay = await getTrendingDay()
    const dataWeek = await getTrendingWeek()
    console.log(dataDay)
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
</script>
<style scoped></style>
