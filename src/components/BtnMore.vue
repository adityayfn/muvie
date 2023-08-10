<template>
  <div class="my-3">
    <v-btn color="#FF0000" @click="details(props.movieId)">More Info</v-btn>
  </div>
</template>
<script setup>
import { defineProps } from "vue"
import { useRouter } from "vue-router"

const props = defineProps(["movieId"])
const router = useRouter()

const details = (id) => {
  router.push("/movie/" + id)
}
</script>
<style></style>
