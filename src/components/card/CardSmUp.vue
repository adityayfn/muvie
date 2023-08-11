<template>
  <v-container class="d-flex flex-wrap">
    <v-card
      class="mx-auto my-5 card-container"
      width="300"
      max-width="340"
      v-for="data in props.movies"
    >
      <v-hover v-slot="{ isHovering, props }">
        <v-card
          class="mx-auto"
          color="grey-lighten-4"
          max-width="600"
          v-bind="props"
        >
          <v-img
            :aspect-ratio="12 / 16"
            cover
            :lazy-src="'https://image.tmdb.org/t/p/w780' + data.poster_path"
            :src="'https://image.tmdb.org/t/p/w780' + data.poster_path"
            alt="poster film"
          >
            <v-expand-transition>
              <div
                v-if="isHovering"
                class="d-flex transition-fast-in-fast-out bg-black v-card--reveal card-hover"
                style="height: 100%"
              >
                <v-card-item class="card-item-container">
                  <div class="d-flex flex-column">
                    <v-card-title class="my-card">
                      {{ data.title }}
                      <v-card-subtitle class="">
                        <span class="me-1">{{
                          formatDate(data.release_date)
                        }}</span>
                      </v-card-subtitle>
                    </v-card-title>

                    <v-divider class="mb-1"></v-divider>
                    <Genre :genre="data.genre_ids" class="" />
                    <BtnMore :movieId="data.id" />
                  </div>
                </v-card-item>
              </div>
            </v-expand-transition>
          </v-img>
        </v-card>
      </v-hover>
      <v-card-text class="rating-container">
        <v-progress-circular
          :model-value="data.vote_average * 10"
          :color="rating(data.vote_average * 10)"
          :size="50"
          :width="7"
          class="rating"
          >{{ formatVoteAverage(data.vote_average) }}</v-progress-circular
        >
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script setup>
import Genre from "../Genre.vue"
import { defineProps, ref } from "vue"
import BtnMore from "../BtnMore.vue"

const props = defineProps(["movies"])

const formatVoteAverage = (voteAverage) => {
  const percentage = Math.round(voteAverage * 10)
  return percentage + "%"
}

const formatDate = (isoDate) => {
  const date = new Date(isoDate)
  const options = { year: "numeric", month: "long", day: "numeric" }
  return date.toLocaleDateString("en-US", options)
}

const colors = ref("")

const rating = (percent) => {
  if (percent >= 70) return (colors.value = "green")
  else if (percent < 40) return (colors.value = "red")
  else return (colors.value = "yellow")
}
</script>
<style scoped>
.my-card {
  word-wrap: break-word;
  white-space: normal;
}
.card-container {
  position: relative;
}

.card-item-container {
  width: 300px;
}

.rating-container {
  position: absolute;
  top: -16px;
  right: -16px;
}
.rating {
  background-color: black;
  border-radius: 50%;
}
.h1-md {
  font-size: 2.7rem;
}
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.9;
  position: absolute;
  width: 100%;
}
</style>
