<template>
  <div>

    <CollapsibleBlock
        v-if="!loadingRobotConfig && robotConfigAvailable"
        id="motorsGroup" type="left-toggle" class="home-collapse">
      <template #header>
        <SdkManagement
            style="margin-left: 15px"
            v-if="!loadingRobotConfig && robotConfigAvailable"
            :robotConfig="robotConfig" :robotStatus="lastWebSocketStatus ? lastWebSocketStatus : {}"
            :version="sdkVersion" :webServerUrl="webServerUrl"/>
      </template>
      <template #default>
        <ServomotorsGroup
            v-if="!loadingRobotConfig && robotConfigAvailable && robotConfig.motors" :config="robotConfig.motors"
            :motorStatus="lastWebSocketStatus.motors ? lastWebSocketStatus.motors : []"
            :webServerUrl="webServerUrl"/>
      </template>
    </CollapsibleBlock>

    <CollapsibleBlock
        v-if="!loadingRobotConfig && robotConfigAvailable"
        id="robotActions" toggle-text="Actions and Motion" class="home-collapse">
      <RobotActions
          v-if="!loadingRobotConfig && robotConfigAvailable" :webServerUrl="webServerUrl"
          :robotConfig="robotConfig" :robotStatus="lastWebSocketStatus ? lastWebSocketStatus : {}"/>
    </CollapsibleBlock>

    <CollapsibleBlock
        v-if="!loadingRobotConfig && robotConfigAvailable && robotConfig.enable_twist_controller === true"
        id="movements" toggle-text="Ground movements" class="home-collapse">
      <GroundMovements
          v-if="!loadingRobotConfig && robotConfigAvailable && robotConfig.enable_twist_controller === true"
          :config="{}" :twistStatus="lastWebSocketStatus.twist ? lastWebSocketStatus.twist : {}"
          :webServerUrl="webServerUrl"/>
    </CollapsibleBlock>

    <CollapsibleBlock
        v-if="!loadingRobotConfig && robotConfigAvailable && robotConfig.sensors"
        id="sensors" toggle-text="Sensors" class="home-collapse">
      <SensorsGroup
          v-if="!loadingRobotConfig && robotConfigAvailable && robotConfig.sensors" :config="robotConfig.sensors"
          :sensorsStatus="lastWebSocketStatus.sensors ? lastWebSocketStatus.sensors : []"/>
    </CollapsibleBlock>

    <CollapsibleBlock
        id="configurations" class="home-collapse"
        :toggle-text="(!loadingRobotConfig && robotConfigAvailable) ? 'Configurations' : 'Dashboard for Simple Python Robot SDK'">
      <div>
        <label for="web-server-url" class="server-label">Web server url:</label>
        <input type="text" id="web-server-url" v-model="webServerUrl" class="server-input"
               placeholder="Insert your robot web server address" :disabled="robotConfigAvailable"/>
        <button v-if="!robotConfigAvailable" @click="connectToWebServer" :disabled="webServerUrl === ''"
                class="main-button">
          Connect to web server
        </button>
        <button v-else @click="closeDashboard" class="main-button">
          Close dashboard
        </button>
        <br/>
        <label for="web-socket-url" class="server-label" @click="webSocketLabelClick">
          Websocket url:
        </label>
        <input type="text" id="web-socket-url" v-model="webSocketUrl" class="server-input"
               placeholder="Insert your robot websocket address" :disabled="webSocket !== null"/>
        <button v-if="webSocket === null" @click="connectToWebSocket" :disabled="webSocketUrl === ''"
                class="main-button">
          Connect to websocket
        </button>
        <button v-else @click="closeWebSocket" class="main-button">
          Close websocket
        </button>
      </div>

      <div v-if="!hideLastWebSocketStatus && webSocket !== null">
        {{ lastWebSocketStatus }}
      </div>

      <br>
      <div class="version-label">
        Dashboard version: {{ appVersion }} <span v-if="commitSha" @click="setAllCommitSha">- {{ commitSha }}</span>
      </div>
      <br>
      <div v-if="sdkVersion" class="version-label">
        SDK version: {{ sdkVersion }}
      </div>
    </CollapsibleBlock>

  </div>
</template>

<script>
import SdkManagement from "@/components/SdkManagement"
import ServomotorsGroup from "@/components/ServomotorsGroup.vue"
import SensorsGroup from "@/components/SensorsGroup"
import RobotActions from "@/components/RobotActions"
import CollapsibleBlock from "@/components/CollapsibleBlock"
import GroundMovements from "@/components/movements/GroundMovements"

export default {
  name: "App",
  components: {
    CollapsibleBlock,
    SdkManagement,
    ServomotorsGroup,
    SensorsGroup,
    RobotActions,
    GroundMovements
  },
  data: () => ({
    webServerUrl: "",
    webSocketUrl: "",
    loadingRobotConfig: true,
    webSocket: null,
    robotConfig: {},
    robotConfigAvailable: false,
    sdkVersion: null,
    lastWebSocketStatus: {},
    hideLastWebSocketStatus: true,
    appVersion: "0.6.1",
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
      this.lastWebSocketStatus = {}
      this.robotConfig = {}
      this.$robotConfig.set({})
      this.axios.get(this.webServerUrl + "/configuration/").then((response) => {
        if (response.status === 200) {
          this.robotConfig = response.data
          this.$robotConfig.set(this.robotConfig)
          if (response.headers.simplepybotsdk) {
            this.sdkVersion = response.headers.simplepybotsdk
          }
          if (Object.keys(this.robotConfig).length > 0) {
            this.robotConfigAvailable = true
          }
          if (this.robotConfig.id && this.robotConfig.name) {
            this.loadingRobotConfig = false
            this.$toast.success(this.robotConfig.name + " ready")
          } else {
            this.$toast.warning("Bad robot configuration")
          }
          this.$router.replace({query: {...this.$route.query, webserverurl: this.webServerUrl}})
          localStorage.setItem("webServerUrl", this.webServerUrl)
          if (this.$route.query.autoconnect) {
              setTimeout(() => {
              this.connectToWebSocket()
            }, 100)
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
      this.lastWebSocketStatus = {}
      if (this.webSocket) {
        console.log("Close old connection")
        this.$webSocket.close()
        this.webSocket = null
      }
      this.$webSocket.init(this.webSocketUrl + "/") // $webSocket defined in main.js
      localStorage.setItem("webSocketUrl", this.webSocketUrl)
      this.webSocket = this.$webSocket.getInstance()
      console.log("Web socket initialized")
      this.$router.replace({query: {...this.$route.query, websocketurl: this.webSocketUrl}})
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
        this.$webSocket.close()
        this.$toast.warning("Websocket connection error")
        this.webSocket = null
      }
      this.webSocket.onclose = () => {
        this.$webSocket.close()
        this.$toast.warning("Websocket connection closed")
        this.webSocket = null
      }
    },
    closeWebSocket: function () {
      this.$webSocket.close()
      this.$toast.warning("Websocket connection closed")
      this.webSocket = null
      this.onWebSocketMessage({})
    },
    closeDashboard: function () {
      this.loadingRobotConfig = true
      this.robotConfigAvailable = false
      this.lastWebSocketStatus = {}
      this.robotConfig = {}
      this.$robotConfig.set({})
      this.loadingRobotConfig = false
      this.$toast.warning("Dashboard closed")
    },
    onWebSocketMessage: function (obj) {
      if (obj.type === "R2C" && obj.data && obj.data.area === "status" && obj.data.action === "live_status" && obj.data.value) {
        obj = obj.data.value
      }
      if (!obj.format) {
        console.warn("Socket message not a robot status")
        return
      }
      this.lastWebSocketStatus = obj
      this.$robotStatus.set(JSON.parse(JSON.stringify(this.lastWebSocketStatus))) // $robotStatus defined in main.js to access everywhere
    },
    readQueryConf: function () {
      if (this.$route.query.webserverurl) {
        this.webServerUrl = this.$route.query.webserverurl
      } else if (localStorage.getItem("webServerUrl")) {
        this.webServerUrl = localStorage.getItem("webServerUrl")
      }

      if (this.$route.query.websocketurl) {
        this.webSocketUrl = this.$route.query.websocketurl
      } else if (localStorage.getItem("webSocketUrl")) {
        this.webSocketUrl = localStorage.getItem("webSocketUrl")
      }

      if (localStorage.getItem("hideLastWebSocketStatus")) {
        this.hideLastWebSocketStatus = localStorage.getItem("hideLastWebSocketStatus") === 'true'
      }

      if (this.$route.query.autoconnect) {
        this.connectToWebServer()
      }
    },
    setAllCommitSha: function () {
      if (process.env.VUE_APP_COMMIT_SHA) {
        this.commitSha = process.env.VUE_APP_COMMIT_SHA
      }
    },
    webSocketLabelClick: function () {
      this.hideLastWebSocketStatus = !this.hideLastWebSocketStatus
      localStorage.setItem("hideLastWebSocketStatus", this.hideLastWebSocketStatus)
    }
  }
}
</script>

<style scoped>
.home-collapse {
  margin-bottom: 12px;
}

.server-label {
  min-width: 110px;
  display: inline-block;
  font-weight: bold;
}

.server-input {
  min-width: 300px;
  margin: 5px 2px;
}

.main-button {
  cursor: pointer;
  margin: 2px;
}

.version-label {
  font-size: 14px;
  font-style: italic;
}
</style>
