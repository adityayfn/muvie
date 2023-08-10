<template>
  <v-container>
    <ParallaxSmUp
      :movie="movie"
      :trailer="trailer"
      v-if="$vuetify.display.smAndUp"
    />
    <ParallaxXs :movie="movie" :trailer="trailer" v-if="$vuetify.display.xs" />

    <div :class="$vuetify.display.smAndUp ? 'd-flex' : 'd-block'">
      <div :class="$vuetify.display.smAndUp ? 'w-75' : 'w-100'">
        <CastXs :cast="cast" v-if="$vuetify.display.xs" />
        <CastSm :cast="cast" v-if="$vuetify.display.sm" />
        <CastMd :cast="cast" v-if="$vuetify.display.mdAndUp" />
        <ReviewsXs
          :reviews="limitReview"
          :length="limitReview.length"
          v-if="$vuetify.display.xs"
        />
        <ReviewsSmUp
          :reviews="limitReview"
          :length="limitReview.length"
          v-if="$vuetify.display.smAndUp"
        />
      </div>
      <div class="my-10" v-if="$vuetify.display.smAndUp">
        <Status :movie="movie" />
      </div>
    </div>
    <MediaSmUp
      :media="media"
      :backdropsLength="backdropsLength"
      :postersLength="postersLength"
      v-if="$vuetify.display.smAndUp"
    />
    <MediaXs
      :media="media"
      :backdropsLength="backdropsLength"
      :postersLength="postersLength"
      v-if="$vuetify.display.xs"
    />
  </v-container>
</template>

<script setup>
import getMovies from "../composable/Movies"
import ParallaxSmUp from "../components/parallax/ParallaxSmUp.vue"
import ParallaxXs from "../components/parallax/ParallaxXs.vue"
import ReviewsSmUp from "../components/reviews/ReviewsSmUp.vue"
import ReviewsXs from "../components/reviews/ReviewsXs.vue"
import CastXs from "../components/cast/CastXs.vue"
import CastSm from "../components/cast/CastSm.vue"
import CastMd from "../components/cast/CastMd.vue"
import Status from "../components/Status.vue"
import MediaSmUp from "../components/media/MediaSmUp.vue"
import MediaXs from "../components/media/MediaXs.vue"
import { ref, onMounted, computed } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()

const id = ref(route.params.id)

const { getDetails, getCharacter, getReviews, getVideos, getImagesMovie } =
  getMovies()

const movie = ref([])
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
})
</script>
<style scoped>
.char {
  font-size: 14px;
}
</style>
