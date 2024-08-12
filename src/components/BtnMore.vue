<template>
  <div class="my-3">
    <v-btn color="#FF0000" @click="details(props.movieId)">More Info</v-btn>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from "vue"
import { useRouter } from "vue-router"

const props = defineProps<{
  movieId: string
}>()
const router = useRouter()

const details = (id: string) => {
  router.push("/movie/" + id)
}
</script>
<style></style>
