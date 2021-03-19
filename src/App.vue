<template>
  <div>

    <SdkManagement
        class="home-item"
        v-if="!loadingRobotConfig"
        :robotConfig="robotConfig" :robotStatus="lastWebSocketResponse ? lastWebSocketResponse : {}"
        :version="sdkVersion" :webServerUrl="webServerUrl"/>
    <ServomotorsGroup
        class="home-item"
        v-if="!loadingRobotConfig && robotConfig.motors" :config="robotConfig.motors"
        :motorStatus="lastWebSocketResponse.motors ? lastWebSocketResponse.motors : []" :webServerUrl="webServerUrl"/>
    <SensorsGroup
        class="home-item"
        v-if="!loadingRobotConfig && robotConfig.sensors" :config="robotConfig.sensors"
        :sensorsStatus="lastWebSocketResponse.sensors ? lastWebSocketResponse.sensors : []"/>
    <RobotActions
        class="home-item"
        v-if="!loadingRobotConfig" :webServerUrl="webServerUrl"
        :robotConfig="robotConfig" :robotStatus="lastWebSocketResponse ? lastWebSocketResponse : {}"/>

    <div class="home-item">
      <label for="web-server-url">Web server url: </label>
      <input type="text" id="web-server-url" v-model="webServerUrl" class="server-input"
             placeholder="Insert your robot web server address"/>
      <button @click="connectToWebServer">Connect to web server</button>
      <br/>
      <label for="web-socket-url">Websocket url: </label>
      <input type="text" id="web-socket-url" v-model="webSocketUrl" class="server-input"
             placeholder="Insert your robot websocket address" :disabled="webSocket !== null"/>
      <button v-if="webSocket === null" @click="connectToWebSocket">Connect to websocket</button>
      <button v-else @click="closeWebSocket">Close websocket</button>
    </div>

    <div class="home-item" v-if="webSocket !== null">
      {{ lastWebSocketResponse }}
    </div>

  </div>
</template>

<script>
import SdkManagement from "@/components/SdkManagement"
import ServomotorsGroup from "@/components/ServomotorsGroup.vue"
import SensorsGroup from "@/components/SensorsGroup"
import RobotActions from "@/components/RobotActions"

export default {
  name: "App",
  components: {
    SdkManagement,
    ServomotorsGroup,
    SensorsGroup,
    RobotActions
  },
  data: () => ({
    webServerUrl: "/api/v1/robot",
    webSocketUrl: "ws://localhost:65432",
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
      this.axios.get(this.webServerUrl + "/configuration/").then((response) => {
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
          this.$toast.error("Bad response from " + this.webServerUrl + "/configuration/" +
              " code " + response.status)
        }
      }).catch(() => {
        this.$toast.error("Connection with " + this.webServerUrl + " failed")
      })
    },
    connectToWebSocket: function () {
      let _this = this
      this.lastWebSocketResponse = {}
      if (this.webSocket) {
        console.log("Close old connection")
        this.webSocket.close()
      }
      this.webSocket = new WebSocket(this.webSocketUrl + "/")
      this.webSocket.onmessage = (event) => {
        if (event.data instanceof Blob) {
          let reader = new FileReader()
          reader.onload = () => {
            _this.onWebSocketMessage(JSON.parse(String(reader.result)))
          }
          reader.readAsText(event.data)
        } else {
          this.onWebSocketMessage(JSON.parse(event.data))
        }
      }
      this.webSocket.onerror = () => {
        this.$toast.warning("Websocket connection error")
      }
      this.webSocket.onclose = () => {
        this.$toast.warning("Websocket connection closed")
      }
    },
    closeWebSocket: function () {
      this.webSocket.close()
      this.$toast.warning("Websocket connection closed")
      this.webSocket = null
      this.onWebSocketMessage({})
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
