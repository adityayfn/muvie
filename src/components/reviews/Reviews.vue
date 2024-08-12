<template>
  <v-container>
    <div class="my-2 d-flex align-center">
      <h1>Reviews</h1>
      <p class="mx-1 mt-1">({{ props.length }})</p>
    </div>
    <v-card
      :width="$vuetify.display.smAndUp ? 'auto' : 330"
      class="my-0 mx-auto py-4"
    >
      <div class="d-flex flex-wrap" v-for="review in props.reviews">
        <div v-if="props.length >= 1">
          <div class="d-flex mx-5 height">
            <v-avatar color="info">
              <v-img
                :src="
                  'https://image.tmdb.org/t/p/w500' +
                  review.author_details.avatar_path
                "
                alt="avatar"
              ></v-img>
            </v-avatar>

            <v-card-title>{{ review.author }} </v-card-title>
          </div>
          <v-card-subtitle class="text my-2">
            {{ truncate(review.content, 300) }}
          </v-card-subtitle>
        </div>
      </div>
      <div v-if="props.length <= 1" class="mx-4">
        <h2>No comment</h2>
      </div>
    </v-card>
  </v-container>
</template>
<script setup lang="ts">
import { defineProps } from "vue"
import { ReviewsType } from "../../types/"

const props = defineProps<{
  reviews: ReviewsType[]
  length: number
}>()

const truncate = (text: string, maxLength: number): string => {
  return text.length > maxLength ? text.slice(0, maxLength) : text
}
</script>
<style scoped>
.text {
  word-wrap: break-word;
  white-space: normal;
  width: 320px;
}
.height {
  height: 50px;
}
</style>
