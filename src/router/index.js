import { createWebHistory, createRouter } from "vue-router"
import Discover from "../views/Discover.vue"
import TopRated from "../views/TopRated.vue"
import Trending from "../views/Trending.vue"
import Popular from "../views/Popular.vue"
import Explore from "../views/Explore.vue"
import Details from "../views/Details.vue"

const routes = [
  {
    path: "/",
    name: "Discover",
    component: Discover,
  },
  {
    path: "/toprated",
    name: "TopRated",
    component: TopRated,
  },
  {
    path: "/trending",
    name: "Trending",
    component: Trending,
  },
  {
    path: "/popular",
    name: "Popular",
    component: Popular,
  },
  {
    path: "/explore",
    name: "Explore",
    component: Explore,
  },
  {
    path: "/movie/:id",
    name: "Details",
    component: Details,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  prefetch: true,
})

export default router
