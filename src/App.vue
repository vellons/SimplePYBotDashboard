<template>
  <ServomotorsGroup
      v-if="!loadingRobotConfig && robotConfig.motors" :config="robotConfig.motors"
      :motorStatus="lastWebSocketResponse.motors ? lastWebSocketResponse.motors : []"/>

  <br/>
  <br/>
  <label for="web-server-url">Web server url: </label>
  <input type="text" id="web-server-url" v-model="webServerUrl" style="min-width: 250px;"/>
  <button @click="connectToWebServer">Connect to web server</button>
  <br/>
  <label for="web-socket-url">Web socket url: </label>
  <input type="text" id="web-socket-url" v-model="webSocketUrl" style="min-width: 250px;"/>
  <button @click="connectToWebSocket">Connect to web socket</button>
  <br/>
  {{ lastWebSocketResponse }}
</template>

<script>
import ServomotorsGroup from "@/components/ServomotorsGroup.vue"
import {simplePYBotSDK} from "@/mixins/SimplePYBotSDK"

export default {
  name: "App",
  mixins: [simplePYBotSDK],
  components: {
    ServomotorsGroup
  },
  data: () => ({
    loadingRobotConfig: true,
    webSocket: null,
    robotConfig: {},
    lastWebSocketResponse: {},
  }),
  methods: {
    connectToWebServer: async function () {
      this.loadingRobotConfig = true
      this.axios.get(this.getWebServerUrl() + "/configuration/").then((response) => {
        if (response.status === 200) {
          this.robotConfig = response.data
          if (this.robotConfig.id) {
            this.loadingRobotConfig = false
            this.$toast.success(this.robotConfig.id + " ready")
          }
        } else {
          this.$toast.error("Bad response from " + this.getWebServerUrl() + "/configuration/" +
              " code " + response.status)
        }
      }).catch((response) => {
        this.$toast.error("Connection with " + this.getWebServerUrl() + " code " + response.status)
      })
    },
    connectToWebSocket: function () {
      console.log("connectToWebSocket", this.getWebSocketUrl())
      let _this = this
      this.webSocket = new WebSocket(this.getWebSocketUrl())
      this.webSocket.onmessage = (event) => {
        if (event.data instanceof Blob) {
          let reader = new FileReader()
          reader.onload = () => {
            _this.onWebSocketMessage(JSON.parse(String(reader.result)))
          };
          reader.readAsText(event.data)
        } else {
          this.onWebSocketMessage(JSON.parse(event.data))
        }
      };
    },
    onWebSocketMessage: function (obj) {
      this.lastWebSocketResponse = obj
    }
  }
}
</script>

<style>

</style>
