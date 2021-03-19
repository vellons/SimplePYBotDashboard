<template>
  <div class="sdk-toolbar">
    <div class="toolbar-item" v-if="robotConfig.name"><b>{{ robotConfig.name }}</b></div>
    <div class="toolbar-item speed">
      <label for="speed-range" class="speed-lbl"> {{ rangeSpeed }} </label>
      <input
          id="speed-range" class="speed-range" v-model="rangeSpeed" :disabled="pending"
          type="range" min="0.1" max="5" step="0.1" @change="rangeSpeedChanged"
          @focusin="rangeSpeedDrag = true" @focusout="rangeSpeedDrag = false">
    </div>
    <div class="toolbar-item system">
      <span v-if="robotStatus.system?.temperature">{{ robotStatus.system?.temperature + '°C - ' }}</span>
      <span v-if="robotStatus.system?.timestamp">(Delay:{{ statusDelay }} sec) - {{ formattedDate }}</span>
      <span v-else>Connect with websocket to receive realtime data</span>
      <span v-if="version"><i>{{ ' - ' + version }}</i></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "SdkManagement",
  props: {
    webServerUrl: {
      type: String,
      required: true
    },
    robotConfig: {
      type: Object,
      required: true
    },
    robotStatus: {
      type: Object,
      required: true
    },
    version: {
      type: String,
      default: ""
    }
  },
  data: () => ({
    currentSpeed: 1,
    rangeSpeed: 1,
    rangeSpeedDrag: false,
    pending: false,
    formattedDate: "",
    statusDelay: 0
  }),
  mounted() {
    this.currentSpeed = this.robotStatus.sdk?.robot_speed
    this.rangeSpeed = this.currentSpeed ? this.currentSpeed : 1
  },
  methods: {
    rangeSpeedChanged: function () {
      this.pending = true
      let data = {
        "robot_speed": parseFloat(this.rangeSpeed)
      }
      this.axios.patch(this.webServerUrl + "/sdk/", data).then((response) => {
        if (response.status !== 200) {
          this.$toast.error("Failed to change speed to " + this.rangeSpeed + ". Bad response")
          this.rangeSpeed = this.currentSpeed
        }
        this.pending = false
      }).catch(() => {
        this.$toast.error("Failed to change speed to " + this.rangeSpeed)
        this.rangeSpeed = this.currentSpeed
        this.pending = false
      })
    },
  },
  watch: {
    robotStatus: function () {
      this.currentSpeed = this.robotStatus.sdk?.robot_speed
      if (this.currentSpeed && !this.rangeSpeedDrag) {
        this.rangeSpeed = parseFloat(this.currentSpeed)
      }
      if (this.robotStatus?.system?.timestamp) {
        let timestamp = new Date(this.robotStatus.system.timestamp)
        this.statusDelay = ((Date.now() - timestamp) / 1000).toFixed(3)
        this.formattedDate = timestamp.getHours() + ":" + timestamp.getMinutes() + ":" + timestamp.getSeconds() + ":"
            + (timestamp.getMilliseconds() + "000").substr(0, 3)
      }
    }
  }
}
</script>

<style scoped>
.sdk-toolbar {
  display: flex;
  flex-wrap: wrap;
}

.toolbar-item {
  flex: 0 33%;
}

@media only screen and (max-width: 700px) {
  .toolbar-item {
    flex: 0 100%;
  }
}

.toolbar-item.speed {
  text-align: center;
  display: flex;
  justify-content: center;
}

.toolbar-item.system {
  text-align: right;
}

.speed-range {
  width: 250px;
  outline: none;
}

.speed-lbl {
  width: 50px;
}
</style>
