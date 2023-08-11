<template>
  <div class="mt-4">
    <h1 class="mx-4">Media</h1>

    <v-container class="d-flex flex-wrap">
      <v-tabs v-model="tab" bg-color="#212121" centered>
        <v-tab @click=";(backdrops = true), (posters = false), (logos = false)"
          >backdrops ({{ props.backdropsLength }})
        </v-tab>
        <v-tab @click=";(posters = true), (backdrops = false), (logos = false)"
          >posters ({{ props.postersLength }})
        </v-tab>
      </v-tabs>
    </v-container>

    <v-container>
      <swiper
        :modules="[Navigation, Pagination, Scrollbar, A11y, Virtual]"
        :slides-per-view="2"
        :navigation="{ clickable: true }"
        grab-cursor
        virtual
        class=""
        v-if="backdrops"
      >
        <swiper-slide v-for="backdrop in props.media.backdrops" class="mx-1">
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
        :modules="[Navigation, Pagination, Scrollbar, A11y, Virtual]"
        :slides-per-view="5"
        :navigation="{ clickable: true }"
        grab-cursor
        virtual
        class=""
        v-if="posters"
      >
        <swiper-slide v-for="backdrop in props.media.posters" class="mx-1">
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
<script setup>
import { defineProps, ref, watch } from "vue"
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

const props = defineProps(["media", "backdropsLength", "postersLength"])

const tab = ref(null)
const backdrops = ref(true)
const posters = ref(false)
</script>
<style scoped>
.swp {
  height: 200px;
}
</style>
