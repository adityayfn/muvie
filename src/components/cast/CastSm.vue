<template>
  <div class="my-10">
    <div class="my-2">
      <h1>Top Cast</h1>
    </div>

    <swiper
      :modules="[Navigation, Pagination, Scrollbar, A11y, Virtual]"
      :slides-per-view="3"
      :navigation="{ clickable: true }"
      grab-cursor
      virtual
      class=""
    >
      <swiper-slide v-for="char in props.cast">
        <div class="">
          <div class="card mt-10 shadow-xl mx-5">
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
              <h4 class="card-title">
                {{ char.name }}
              </h4>
              <p class="char">{{ char.character }}</p>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script setup>
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

const props = defineProps(["cast"])
</script>
<style></style>
