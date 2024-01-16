<template>
  <v-container>
    <Parallax :movie="movie" :trailer="trailer" />

    <div :class="$vuetify.display.smAndUp ? 'd-flex' : 'd-block'">
      <div :class="$vuetify.display.smAndUp ? 'w-75' : 'w-100'">
        <Cast :cast="cast" />
        <Reviews :reviews="limitReview" :length="limitReview.length" />
      </div>
      <div class="my-10" v-if="$vuetify.display.smAndUp">
        <Status :movie="movie" />
      </div>
    </div>

    <Media
      :media="media"
      :backdropsLength="backdropsLength"
      :postersLength="postersLength"
    />
  </v-container>
</template>

<script setup>
import getMovies from "../composable/Movies"
import Parallax from "../components/parallax/Parallax.vue"
import Reviews from "../components/reviews/Reviews.vue"
import Cast from "../components/cast/Cast.vue"
import Status from "../components/Status.vue"
import Media from "../components/media/Media.vue"

import { ref, onMounted, computed } from "vue"
import { useRoute } from "vue-router"
import { useHead } from "@vueuse/head"

const route = useRoute()

const id = ref(route.params.id)

const { getDetails, getCharacter, getReviews, getVideos, getImagesMovie } =
  getMovies()

const movie = ref([])
const title = ref("")
const cast = ref([])

const reviews = ref([])
const videos = ref([])
const trailer = ref({})
const media = ref([])
const backdropsLength = ref(0)
const postersLength = ref(0)

const fetchDetails = async () => {
  try {
    const data = await getDetails(id.value)
    movie.value = data
    title.value = data.original_title
  } catch (error) {
    console.log(error)
  }
}
const fetchCharacter = async () => {
  try {
    const data = await getCharacter(id.value)
    cast.value = data.cast
  } catch (error) {
    console.log(error)
  }
}

const fetchVideos = async () => {
  try {
    const data = await getVideos(id.value)
    videos.value = data.results.filter(
      (video) => video.site === "YouTube" && video.type === "Trailer"
    )
    trailer.value = videos.value[0]
  } catch (error) {
    console.log(error)
  }
}

const fetchReviews = async () => {
  try {
    const data = await getReviews(id.value)
    reviews.value = data.results
  } catch (error) {
    console.log(error)
  }
}
const fetchImages = async () => {
  try {
    const data = await getImagesMovie(id.value)
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
  await fetchImages()
  useHead({
    title: `Muvie - ${movie.value.title || "Wait"}`,
    meta: [
      {
        name: `description`,
        content: `This is ${movie.value.title} movie`,
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
