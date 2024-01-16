<template>
  <v-parallax
    :lazy-src="
      $vuetify.display.smAndUp
        ? 'https://image.tmdb.org/t/p/w500' + props.movie.backdrop_path
        : 'https://image.tmdb.org/t/p/w500' + props.movie.poster_path
    "
    :src="
      $vuetify.display.smAndUp
        ? 'https://image.tmdb.org/t/p/w500' + props.movie.backdrop_path
        : 'https://image.tmdb.org/t/p/w500' + props.movie.poster_path
    "
    :width="$vuetify.display.smAndUp ? 1000 : 400"
    :height="$vuetify.display.smAndUp ? 400 : auto"
    class="my-0 mx-auto"
    alt="background"
  >
    <div class="overlay">
      <div
        class="d-flex px-4"
        :class="$vuetify.display.smAndUp ? 'flex-row' : 'flex-column'"
      >
        <img
          :src="'https://image.tmdb.org/t/p/w500' + props.movie.poster_path"
          alt="poster"
          :height="$vuetify.display.smAndUp ? 300 : 400"
          class="mx-4 my-12"
        />
        <div class="d-flex flex-column my-5">
          <h1>{{ props.movie.title }}</h1>
          <p>{{ formatDate(movie.release_date) }}</p>
          <div class="d-flex flex-wrap">
            <v-chip v-for="genre in props.movie.genres" class="mx-1 my-1">
              {{ genre.name }}
            </v-chip>
          </div>
          <p class="gray">{{ movie.overview }}</p>
          <v-row justify="space-around my-4">
            <v-col cols="">
              <v-dialog transition="dialog-bottom-transition" width="auto">
                <template v-slot:activator="{ props }">
                  <v-btn v-bind="props" color="#ff0000">
                    <v-icon icon="mdi-play"></v-icon>
                    Trailer
                  </v-btn>
                </template>
                <template v-slot:default="{ isActive }">
                  <v-card width="350" height="500">
                    <v-toolbar
                      color="#ff0000"
                      :title="props.movie.title"
                    ></v-toolbar>

                    <div class="">
                      <iframe
                        :src="getTrailerUrl(props.trailer.key)"
                        frameborder="0"
                        allowfullscreen
                        class="frame"
                      ></iframe>
                    </div>

                    <v-card-actions class="justify-end">
                      <v-btn variant="text" @click="isActive.value = false"
                        >Close</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
            </v-col>
          </v-row>
        </div>
        <v-card-text class="rating-container">
          <v-progress-circular
            :model-value="props.movie.vote_average * 10"
            :color="rating(props.movie.vote_average * 10)"
            :size="50"
            :width="7"
            class="rating"
            >{{
              formatVoteAverage(props.movie.vote_average)
            }}</v-progress-circular
          >
        </v-card-text>
      </div>
    </div>
  </v-parallax>
</template>
<script setup>
import { defineProps, ref } from "vue"

const props = defineProps(["movie", "trailer"])

const formatDate = (isoDate) => {
  const date = new Date(isoDate)
  const options = { year: "numeric", month: "long", day: "numeric" }
  return date.toLocaleDateString("en-US", options)
}

const formatVoteAverage = (voteAverage) => {
  const percentage = Math.round(voteAverage * 10)
  return percentage + "%"
}

const colors = ref("")

const rating = (percent) => {
  if (percent >= 70) return (colors.value = "green")
  else if (percent < 40) return (colors.value = "red")
  else return (colors.value = "yellow")
}

const getTrailerUrl = (key) => `https://www.youtube.com/embed/${key}`
</script>
<style scoped>
.overlay {
  position: relative;
  background-color: rgba(0, 0, 0, 0.8); /* Warna merah dengan opacity */
  width: 100%;
  height: 100%;
}

.text-container {
  position: absolute;
}

.text {
  color: white;
  font-size: 36px;
  margin-bottom: 10px;
}

.description {
  color: white;
  font-size: 18px;
}
.char {
  font-weight: bold;
}
.gray {
  color: lightgray;
}
.frame {
  width: 350px;
  height: 370px;
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
</style>
