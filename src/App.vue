<template>
  <div>

    <SdkManagement
        class="home-item"
        v-if="!loadingRobotConfig && robotConfigAvailable"
        :robotConfig="robotConfig" :robotStatus="lastWebSocketResponse ? lastWebSocketResponse : {}"
        :version="sdkVersion" :webServerUrl="webServerUrl"/>
    <ServomotorsGroup
        class="home-item"
        v-if="!loadingRobotConfig && robotConfigAvailable && robotConfig.motors" :config="robotConfig.motors"
        :motorStatus="lastWebSocketResponse.motors ? lastWebSocketResponse.motors : []" :webServerUrl="webServerUrl"/>
    <SensorsGroup
        class="home-item"
        v-if="!loadingRobotConfig && robotConfigAvailable && robotConfig.sensors" :config="robotConfig.sensors"
        :sensorsStatus="lastWebSocketResponse.sensors ? lastWebSocketResponse.sensors : []"/>
    <RobotActions
        class="home-item"
        v-if="!loadingRobotConfig && robotConfigAvailable" :webServerUrl="webServerUrl"
        :robotConfig="robotConfig" :robotStatus="lastWebSocketResponse ? lastWebSocketResponse : {}"/>

    <div class="home-item">
      <label for="web-server-url">Web server url: </label>
      <input type="text" id="web-server-url" v-model="webServerUrl" class="server-input"
             placeholder="Insert your robot web server address" :disabled="robotConfigAvailable"/>
      <button v-if="!robotConfigAvailable" @click="connectToWebServer" :disabled="webServerUrl === ''">
        Connect to web server
      </button>
      <button v-else @click="closeDashboard">
        Close dashboard
      </button>
      <br/>
      <label for="web-socket-url">Websocket url: </label>
      <input type="text" id="web-socket-url" v-model="webSocketUrl" class="server-input"
             placeholder="Insert your robot websocket address" :disabled="webSocket !== null"/>
      <button v-if="webSocket === null" @click="connectToWebSocket" :disabled="webSocketUrl === ''">
        Connect to websocket
      </button>
      <button v-else @click="closeWebSocket">
        Close websocket
      </button>
    </div>

    <div class="home-item" v-if="webSocket !== null">
      {{ lastWebSocketResponse }}
    </div>

    <br>
    <div class="home-item">
      Version: {{ appVersion }} <span v-if="commitSha" @click="setAllCommitSha">- {{ commitSha }}</span>
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
    webServerUrl: "",
    webSocketUrl: "",
    loadingRobotConfig: true,
    webSocket: null,
    robotConfig: {},
    robotConfigAvailable: false,
    sdkVersion: null,
    lastWebSocketResponse: {},
    appVersion: "0.2.0",
    commitSha: "",
  }),
  mounted() {
    if (process.env.VUE_APP_COMMIT_SHA) {
      this.commitSha = process.env.VUE_APP_COMMIT_SHA.substring(0, 7)
    }
    setTimeout(this.readQueryConf, 100)
  },
  methods: {
    connectToWebServer: async function () {
      this.loadingRobotConfig = true
      this.robotConfigAvailable = false
      this.lastWebSocketResponse = {}
      this.robotConfig = {}
      this.axios.get(this.webServerUrl + "/configuration/").then((response) => {
        if (response.status === 200) {
          this.robotConfig = response.data
          if (response.headers.simplepybotsdk) {
            this.sdkVersion = response.headers.simplepybotsdk
          }
          if (Object.keys(this.robotConfig).length > 0) {
            this.robotConfigAvailable = true
          }
          if (this.robotConfig.id) {
            this.loadingRobotConfig = false
            this.$toast.success(this.robotConfig.name + " ready")
          }
          localStorage.setItem('webServerUrl', this.webServerUrl)
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
      localStorage.setItem('webSocketUrl', this.webSocketUrl)
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
        this.webSocket = null
      }
      this.webSocket.onclose = () => {
        this.$toast.warning("Websocket connection closed")
        this.webSocket = null
      }
    },
    closeWebSocket: function () {
      this.webSocket.close()
      this.$toast.warning("Websocket connection closed")
      this.webSocket = null
      this.onWebSocketMessage({})
    },
    closeDashboard: function () {
      this.loadingRobotConfig = true
      this.robotConfigAvailable = false
      this.lastWebSocketResponse = {}
      this.robotConfig = {}
      this.loadingRobotConfig = false
      this.$toast.warning("Dashboard closed")
    },
    onWebSocketMessage: function (obj) {
      this.lastWebSocketResponse = obj
    },
    readQueryConf: function () {
      if (this.$route.query.webserverurl) {
        this.webServerUrl = this.$route.query.webserverurl
      } else if (localStorage.getItem("webServerUrl")) {
        this.webServerUrl = localStorage.getItem("webServerUrl")
      }

      if (this.$route.query.websocketurl) {
        this.webSocketUrl = this.$route.query.websocketurl
      } else if (localStorage.getItem('webSocketUrl')) {
        this.webSocketUrl = localStorage.getItem("webSocketUrl")
      }

      if (this.$route.query.autoconnect) {
        this.connectToWebServer()
      }
    },
    setAllCommitSha: function () {
      if (process.env.VUE_APP_COMMIT_SHA) {
        this.commitSha = process.env.VUE_APP_COMMIT_SHA
      }
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
