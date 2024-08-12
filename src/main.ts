import { createApp } from "vue"
import { createHead } from "@vueuse/head"

import App from "./App.vue"
import vuetify from "./vuetify"
import router from "./router"

const head = createHead()
const app = createApp(App)
app.use(head)
app.use(vuetify)
app.use(router)
app.mount("#app")
