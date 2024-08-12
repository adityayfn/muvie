import { ref } from "vue"
import { NavItemsType } from "../types"

export const NavItems = ref<NavItemsType[]>([
  {
    title: "Home",
    icon: "mdi-home",
    route: "/",
  },
  {
    title: "Top Rated",
    icon: "mdi-star",
    route: "/toprated",
  },
  {
    title: "Trending",
    icon: "mdi-chart-line",
    route: "/trending",
  },
  {
    title: "Popular",
    icon: "mdi-heart",
    route: "/popular",
  },
  {
    title: "Explore",
    icon: "mdi-magnify",
    route: "/explore",
  },
])
