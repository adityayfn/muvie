<template>
  <v-card-subtitle>Status</v-card-subtitle>
  <v-card-title>{{ props.movie.status }}</v-card-title>

  <v-card-subtitle>Original Language</v-card-subtitle>
  <v-card-title>{{
    props.movie.original_language === "en" ? "English" : "Unknown"
  }}</v-card-title>

  <v-card-subtitle>Budget</v-card-subtitle>
  <v-card-title>{{ formatCurrency(props.movie.budget) }}</v-card-title>

  <v-card-subtitle>Revenue</v-card-subtitle>
  <v-card-title>{{ formatCurrency(props.movie.revenue) }}</v-card-title>
</template>
<script setup lang="ts">
import { defineProps } from "vue"
import { MovieType } from "../types/"
import { formatCurrency } from "../utils/helper"

const props = defineProps<{
  movie: MovieType
}>()
</script>
<style></style>
