import {createApp} from "vue"
import App from "./App.vue"

import axios from "axios"
import VueAxios from "vue-axios"
import Toaster from "@meforma/vue-toaster"

const app = createApp(App)

app.use(VueAxios, axios)
app.use(Toaster, {
    position: 'top-right'
})

app.mount("#app")
