import {createApp} from "vue"
import App from "./App.vue"

import axios from "axios"
import VueAxios from "vue-axios"
import {createWebHistory, createRouter} from "vue-router"
import Toaster from "@meforma/vue-toaster"

const app = createApp(App)

app.use(VueAxios, axios)

const routes = [
    {
        path: "/",
        name: "App",
        component: App,
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
app.use(router)

app.use(Toaster, {
    position: 'top-right'
})

app.mount("#app")
