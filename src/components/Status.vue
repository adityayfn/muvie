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
<script setup>
import { defineProps } from "vue"

const props = defineProps(["movie"])
const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-Us", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 3,
  }).format(value)
}
</script>
<style></style>
