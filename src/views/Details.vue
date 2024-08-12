<template>
  <Loading v-if="loading" />
  <v-container v-else>
    <Parallax v-if="movie && trailer" :movie="movie" :trailer="trailer" />

    <div :class="$vuetify.display.smAndUp ? 'd-flex' : 'd-block'">
      <div :class="$vuetify.display.smAndUp ? 'w-75' : 'w-100'">
        <Cast :cast="cast" />
        <Reviews :reviews="limitReview" :length="limitReview.length" />
      </div>
      <div class="my-10" v-if="$vuetify.display.smAndUp">
        <Status v-if="movie" :movie="movie" />
      </div>
    </div>

    <Media
      v-if="media"
      :media="media"
      :backdropsLength="backdropsLength"
      :postersLength="postersLength"
    />
  </v-container>
</template>

<script setup lang="ts">
import getMovies from "../composable/Movies"
import Parallax from "../components/parallax/Parallax.vue"
import Reviews from "../components/reviews/Reviews.vue"
import Cast from "../components/cast/Cast.vue"
import Status from "../components/Status.vue"
import Media from "../components/media/Media.vue"
import Loading from "../components/Loading.vue"

import { ref, onMounted, computed } from "vue"
import { useRoute } from "vue-router"
import { useHead } from "@vueuse/head"
import {
  MovieType,
  CastType,
  VideosType,
  MediaResultsType,
  ReviewsType,
} from "../types/"

const route = useRoute()

const id = ref(route.params.id)

const { getDetails, getCharacter, getReviews, getVideos, getMovieMedia } =
  getMovies()

const movie = ref<MovieType>()
const title = ref("")
const cast = ref<CastType[]>([])

const reviews = ref<ReviewsType[]>([])
const videos = ref<VideosType[]>([])
const trailer = ref<VideosType>()
const media = ref<MediaResultsType>()
const backdropsLength = ref(0)
const postersLength = ref(0)

const loading = ref<boolean>(true)

const fetchDetails = async () => {
  try {
    const data = await getDetails(id.value)
    if (!data) {
      return `${id.value} not found`
    }
    movie.value = data
    title.value = data.original_title
  } catch (error) {
    console.log(error)
  }
}
const fetchCharacter = async () => {
  try {
    const data = await getCharacter(id.value)
    if (!data) {
      return "Character not found"
    }
    cast.value = data.cast
  } catch (error) {
    console.log(error)
  }
}

const fetchVideos = async () => {
  try {
    const data = await getVideos(id.value)
    if (!data) {
      return "Videos not found"
    }

    videos.value = data.results.filter(
      (video: VideosType) =>
        video.site === "YouTube" && video.type === "Trailer"
    )

    trailer.value = videos.value[0]
  } catch (error) {
    console.log(error)
  }
}

const fetchReviews = async () => {
  try {
    const data = await getReviews(id.value)
    if (!data) {
      return "Reviews not found"
    }
    reviews.value = data.results
  } catch (error) {
    console.log(error)
  }
}
const fetchMedia = async () => {
  try {
    const data = await getMovieMedia(id.value)
    if (!data) {
      return "Media not Found"
    }
    media.value = data
    backdropsLength.value = data.backdrops.length
    postersLength.value = data.posters.length
  } catch (error) {
    console.log(error)
  }
}

const limitReview = computed(() => {
  return reviews.value.slice(0, 4)
})

onMounted(async () => {
  await fetchDetails()
  await fetchCharacter()
  await fetchReviews()
  await fetchVideos()
  await fetchMedia()

  setTimeout(() => {
    loading.value = false
  }, 1300)

  useHead({
    title: `Muvie - ${movie.value!.title || "Wait"}`,
    meta: [
      {
        name: `description`,
        content: `This is ${movie.value!.title} movie`,
      },
    ],
  })
})
</script>
<style scoped>
.char {
  font-size: 14px;
}
</style>
