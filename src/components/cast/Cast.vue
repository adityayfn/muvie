<template>
  <div class="my-10">
    <div class="my-2">
      <h1>Top Cast</h1>
    </div>

    <swiper
      :modules="[Navigation, Pagination, Scrollbar, A11y, Virtual]"
      :slides-per-view="1"
      :navigation="true"
      grab-cursor
      virtual
      :breakpoints="breakpoints"
    >
      <swiper-slide v-for="char in props.cast">
        <div class="">
          <div class="card mt-10 shadow-xl mx-14">
            <figure>
              <v-img
                cover
                :lazy-src="
                  'https://image.tmdb.org/t/p/w500' + char.profile_path
                "
                :src="'https://image.tmdb.org/t/p/w500' + char.profile_path"
                alt="character"
              >
              </v-img>
            </figure>
            <div class="card-body text-center mt-1">
              <h2 class="card-title">
                {{ char.name }}
              </h2>
              <p class="char">{{ char.character }}</p>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue"
import "swiper/css"
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
} from "swiper/modules"

import "swiper/css"
import "swiper/css/bundle"
import { defineProps } from "vue"
import { CastType } from "../../types/"

const props = defineProps<{
  cast: CastType[]
}>()

const breakpoints = {
  384: { slidesPerView: 1 },
  768: { slidesPerView: 2 },
  960: { slidesPerView: 3 },
}
</script>
<style></style>
