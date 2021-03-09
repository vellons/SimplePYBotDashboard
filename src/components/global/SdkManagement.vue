<template>
  <div class="sdk-toolbar">
    <div class="toolbar-item" v-if="robotConfig.name">{{ robotConfig.name }}</div>
    <div class="toolbar-item speed">
      <label for="speed-range" class="speed-lbl"> {{ rangeSpeed === currentSpeed ? currentSpeed : rangeSpeed }} </label>
      <input
          id="speed-range" class="speed-range" v-model="rangeSpeed"
          type="range" min="0.1" max="5" step="0.1" @change="rangeSpeedChanged">
    </div>
    <div v-if="robotStatus.system" class="toolbar-item system">
      <span v-if="robotStatus.system.temperature">{{ robotStatus.system.temperature + '°C - ' }}</span>
      <span v-if="robotStatus.system.timestamp">{{ robotStatus.system.timestamp }}</span>
    </div>
  </div>
</template>

<script>
import {simplePYBotSDK} from "@/mixins/SimplePYBotSDK"

export default {
  name: "SdkManagement",
  mixins: [simplePYBotSDK],
  props: {
    robotConfig: {
      type: Object,
      required: true
    },
    robotStatus: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    currentSpeed: 1,
    rangeSpeed: 1
  }),
  mounted() {
    this.currentSpeed = this.robotStatus.sdk?.robot_speed
    this.rangeSpeed = this.currentSpeed ? this.currentSpeed : 1
  },
  methods: {
    rangeSpeedChanged: function () {
      let data = {
        "robot_speed": parseFloat(this.rangeSpeed)
      }
      this.axios.patch(this.getWebServerUrl() + "/sdk/", data).then((response) => {
        if (response.status !== 200) {
          this.rangeSpeed = this.currentSpeed
          this.$toast.error("Failed to change speed to " + this.rangeSpeed + ". Bad response")
        }
      }).catch(() => {
        this.rangeSpeed = this.currentSpeed
        this.$toast.error("Failed to change speed to " + this.rangeSpeed + "")
      })
    },
  },
  watch: {
    robotStatus: function () {
      this.currentSpeed = this.robotStatus.sdk?.robot_speed
    }
  }
}
</script>

<style scoped>
.sdk-toolbar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 3px 15px 10px 15px;
}

.toolbar-item {
  flex-grow: 1;
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
}

.speed-lbl {
  width: 50px;
}
</style>
