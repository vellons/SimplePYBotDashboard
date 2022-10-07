import {createApp, ref} from "vue"
import App from "./App.vue"

import axios from "axios"
import VueAxios from "vue-axios"
import {createWebHistory, createRouter} from "vue-router"
import Toaster from "@meforma/vue-toaster"

const app = createApp(App)

app.use(VueAxios, axios)

const routes = [
    {
        path: "/SimplePYBotDashboard/",
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

// $robotConfig global
app.use({
    // Global variable - https://jsfiddle.net/ej29zxmf/1/
    install(app) {
        let config = ref(null)
        app.config.globalProperties.$robotConfig = {
            value: config,
            set(newValue) {
                config.value = newValue
            },
            get() {
                return config.value
            }
        };
    }
})

// $webSocket global
app.use({
    install(app) {
        let ws = ref(null)
        app.config.globalProperties.$webSocket = {
            value: ws,
            init(url) {
                ws.value = new WebSocket(url)
            },
            close() {
                if (ws.value === null) return
                ws.value.close()
                ws.value = null
            },
            isOpen() {
                if (ws.value === null) return false
                return ws.value.readyState === WebSocket.OPEN
            },
            getInstance() {
                return ws.value
            },
            async send(message) {
                if (!this.isOpen()) {
                    console.warn("Websocket is closed")
                    return
                }
                await ws.value.send(new TextEncoder().encode(JSON.stringify(message)))
            }
        };
    }
})

// $robotStatus global
app.use({
    install(app) {
        let status = ref(null)
        app.config.globalProperties.$robotStatus = {
            value: status,
            set(newValue) {
                status.value = newValue
            },
            get() {
                return status.value
            }
        };
    }
})

app.mount("#app")
