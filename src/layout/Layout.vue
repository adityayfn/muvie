<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar>
      <BarItem />

      <v-card
        class="bar mx-2"
        v-show="$vuetify.display.smAndDown"
        elevation="0"
      >
        <v-app-bar-nav-icon
          variant="text"
          @click="drawer = !drawer"
        ></v-app-bar-nav-icon>
      </v-card>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" location="left" temporary>
      <v-list-item
        v-for="item in NavItems"
        :key="item.title"
        :to="item.route"
        link
      >
        <v-list-item-content class="d-flex my-3">
          <v-list-item-title class="d-flex">
            <h2>
              <v-icon>{{ item.icon }}</v-icon>
            </h2>
            <h2 class="mt-1 ml-4">
              {{ item.title }}
            </h2>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>

    <v-navigation-drawer class="pt-5">
      <v-list-item
        v-for="item in NavItems"
        :key="item.title"
        :to="item.route"
        link
      >
        <v-list-item-content class="d-flex my-3">
          <v-list-item-title class="d-flex">
            <h2>
              <v-icon :color="route.path == item.route ? 'red' : ''">{{
                item.icon
              }}</v-icon>
            </h2>
            <h2 class="mt-1 ml-4">
              {{ item.title }}
            </h2>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { ref } from "vue"
import BarItem from "../components/BarItem.vue"
import { NavItems } from "../constant/"
import { useRoute } from "vue-router"

const drawer = ref<boolean>(false)
const route = useRoute()
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Mitr:wght@300;400;700&display=swap");

h1 {
  font-family: "Libre Baskerville", serif;
  /* font-family: "Mitr", sans-serif; */
}
</style>
