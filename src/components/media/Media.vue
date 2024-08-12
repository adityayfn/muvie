<template>
  <div class="mt-4">
    <h1 class="mx-4">Media</h1>

    <v-container class="d-flex flex-wrap">
      <v-tabs v-model="tab" bg-color="#212121" centered>
        <v-tab @click=";(backdrops = true), (posters = false)"
          >backdrops ({{ props.backdropsLength }})
        </v-tab>
        <v-tab @click=";(posters = true), (backdrops = false)"
          >posters ({{ props.postersLength }})
        </v-tab>
      </v-tabs>
    </v-container>

    <v-container>
      <swiper
        :modules="[Navigation, Scrollbar, A11y, Virtual]"
        :slides-per-view="1"
        :navigation="true"
        grab-cursor
        virtual
        :breakpoints="breakpoints"
        v-if="backdrops"
      >
        <swiper-slide v-for="backdrop in props.media?.backdrops" class="">
          <v-img
            cover
            :lazy-src="
              'https://image.tmdb.org/t/p/original' + backdrop.file_path
            "
            :src="'https://image.tmdb.org/t/p/original' + backdrop.file_path"
            class="swp"
          >
          </v-img>
        </swiper-slide>
      </swiper>
      <swiper
        :modules="[Navigation, Scrollbar, A11y, Virtual]"
        :slides-per-view="3"
        :navigation="true"
        grab-cursor
        virtual
        :breakpoints="breakpoints"
        v-if="posters"
      >
        <swiper-slide v-for="backdrop in props.media?.posters" class="mx-1">
          <v-img
            cover
            :lazy-src="
              'https://image.tmdb.org/t/p/original' + backdrop.file_path
            "
            :src="'https://image.tmdb.org/t/p/original' + backdrop.file_path"
            class="swp"
            alt="media"
          >
          </v-img>
        </swiper-slide>
      </swiper>
    </v-container>
  </div>
</template>
<script setup lang="ts">
import { defineProps, ref } from "vue"
import { Swiper, SwiperSlide } from "swiper/vue"
import "swiper/css"
import { Navigation, Scrollbar, A11y, Virtual } from "swiper/modules"
import "swiper/css"
import "swiper/css/bundle"
import { MediaResultsType } from "../../types/"

const props = defineProps<{
  media: MediaResultsType
  backdropsLength: number
  postersLength: number
}>()
const tab = ref(null)
const backdrops = ref(true)
const posters = ref(false)

const breakpoints = {
  384: { slidesPerView: 1 },
  768: { slidesPerView: 2 },
  960: { slidesPerView: 3 },
}
</script>
<style scoped>
.swp {
  height: 200px;
}
</style>
