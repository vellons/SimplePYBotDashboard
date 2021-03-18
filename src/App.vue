<template>
  <div>

    <SdkManagement
        class="home-item"
        v-if="!loadingRobotConfig"
        :robotConfig="robotConfig" :robotStatus="lastWebSocketResponse ? lastWebSocketResponse : {}"
        :version="sdkVersion"/>
    <ServomotorsGroup
        class="home-item"
        v-if="!loadingRobotConfig && robotConfig.motors" :config="robotConfig.motors"
        :motorStatus="lastWebSocketResponse.motors ? lastWebSocketResponse.motors : []"/>
    <SensorsGroup
        class="home-item"
        v-if="!loadingRobotConfig && robotConfig.sensors" :config="robotConfig.sensors"
        :sensorsStatus="lastWebSocketResponse.sensors ? lastWebSocketResponse.sensors : []"/>
    <RobotActions
        class="home-item"
        v-if="!loadingRobotConfig"
        :robotConfig="robotConfig" :robotStatus="lastWebSocketResponse ? lastWebSocketResponse : {}"/>

    <div class="home-item">
      <label for="web-server-url">Web server url: </label>
      <input type="text" id="web-server-url" v-model="webServerUrl" class="server-input"/>
      <button @click="connectToWebServer">Connect to web server</button>
      <br/>
      <label for="web-socket-url">Web socket url: </label>
      <input type="text" id="web-socket-url" v-model="webSocketUrl" class="server-input"/>
      <button @click="connectToWebSocket">Connect to web socket</button>
    </div>

    <div class="home-item">
      {{ lastWebSocketResponse }}
    </div>

  </div>
</template>

<script>
import {simplePYBotSDK} from "@/mixins/SimplePYBotSDK"
import SdkManagement from "@/components/SdkManagement"
import ServomotorsGroup from "@/components/ServomotorsGroup.vue"
import SensorsGroup from "@/components/SensorsGroup"
import RobotActions from "@/components/RobotActions"

export default {
  name: "App",
  mixins: [simplePYBotSDK],
  components: {
    SdkManagement,
    ServomotorsGroup,
    SensorsGroup,
    RobotActions
  },
  data: () => ({
    loadingRobotConfig: true,
    webSocket: null,
    robotConfig: {},
    sdkVersion: null,
    lastWebSocketResponse: {},
  }),
  methods: {
    connectToWebServer: async function () {
      this.loadingRobotConfig = true
      this.lastWebSocketResponse = {}
      this.axios.get(this.getWebServerUrl() + "/configuration/").then((response) => {
        if (response.status === 200) {
          this.robotConfig = response.data
          if (response.headers.simplepybotsdk) {
            this.sdkVersion = response.headers.simplepybotsdk
          }
          if (this.robotConfig.id) {
            this.loadingRobotConfig = false
            this.$toast.success(this.robotConfig.name + " ready")
          }
        } else {
          this.$toast.error("Bad response from " + this.getWebServerUrl() + "/configuration/" +
              " code " + response.status)
        }
      }).catch((response) => {
        this.$toast.error("Connection with " + this.getWebServerUrl() + " failed. Code " + response.status)
      })
    },
    connectToWebSocket: function () {
      let _this = this
      this.lastWebSocketResponse = {}
      this.webSocket = new WebSocket(this.getWebSocketUrl() + "/")
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
      }
      this.webSocket.onerror = () => {
        this.$toast.warning("Web socket connection closed")
      }
    },
    onWebSocketMessage: function (obj) {
      this.lastWebSocketResponse = obj
    }
  }
}
</script>

<style scoped>
.home-item {
  margin: 10px 15px;
}

.server-input {
  min-width: 300px;
}
</style>
