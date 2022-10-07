<template>
  <div class="movements">
    <div class="left-area">
      <div class="area-group">
        <div class="axis-label">Joystick X:</div>
        <div class="axis-value">{{ joystickValue.x ? joystickValue.x : 0 }}</div>
      </div>
      <div class="area-group">
        <div class="axis-label">Joystick Y:</div>
        <div class="axis-value">{{ joystickValue.y ? joystickValue.y : 0 }}</div>
      </div>
      <div class="area-group">
        <div class="axis-label">Orientation Z:</div>
        <div class="axis-value">{{ zValue }}</div>
      </div>
    </div>
    <Joystick class="joystick-container" idx="controller1" @change="change"/>
    <div class="right-area data-area">
      <div class="area-group">
        <div class="data-label">Linear:</div>
        <div class="data-value">{{ twistStatus.linear ? twistStatus.linear : '-' }}</div>
      </div>
      <div class="area-group data-area">
        <div class="data-label">Angular:</div>
        <div class="data-value">{{ twistStatus.angular ? twistStatus.angular : '-' }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Joystick from "@/components/movements/Joystick"

export default {
  name: "GroundMovements",
  components: {
    Joystick
  },
  props: {
    webServerUrl: {
      type: String,
      required: true
    },
    config: {
      type: Object,
      required: true
    },
    twistStatus: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    joystick1: null,
    joystickValue: {},
    zValue: 0,
    pending: false,
    keysDown: []
  }),
  mounted() {
    this.setKeyboardListener()
    this.syncControllers()
  },
  methods: {
    setKeyboardListener: function () {
      window.addEventListener("keydown", (e) => { // Save all key pressed
        let key = e.key.toLowerCase()
        if (key !== 'a' && key !== 's' && key !== 'd' && key !== 'w' && key !== 'z' && key !== 'x') return
        let index = this.keysDown.indexOf(key)
        if (index === -1) {
          this.keysDown.push(e.key.toLowerCase())
          this.calcJoystickWithKeys()
        }
      })
      window.addEventListener("keyup", (e) => { // Remove all key released
        let index = this.keysDown.indexOf(e.key.toLowerCase())
        if (index !== -1) {
          this.keysDown.splice(index, 1)
          this.calcJoystickWithKeys()
        }
      });
    },
    calcJoystickWithKeys: function () {
      let newJoystick = {x: 0, y: 0}
      this.keysDown.forEach((key) => {
        if (key === 'a') newJoystick.x = -1
        if (key === 's') newJoystick.y = -1
        if (key === 'd') newJoystick.x = 1
        if (key === 'w') newJoystick.y = 1
        if (key === 'z') this.zValue = (this.zValue - 1) % 360
        if (key === 'x') this.zValue = (this.zValue + 1) % 360
        if (this.zValue < 0) this.zValue = 360 + this.zValue
      })
      this.change(newJoystick)
    },
    change: function (val) {
      this.joystickValue = val
      this.pending = true
      let data = {
        "linear": {
          "x": this.joystickValue.x,
          "y": this.joystickValue.y,
          "z": 0.0
        },
        "angular": {
          "x": 0.0,
          "y": 0.0,
          "z": this.zValue
        }
      }

      // Send through websocket if parser is supported
      if (this.$robotConfig.get()["enable_parser_json_commands"] && this.$webSocket.isOpen()) {
        let socketBody = {
          "type": "C2R",  // Client to Robot
          "data": {
            "area": "twist",
            "go": data
          }
        }
        this.$webSocket.send(socketBody)
        this.pending = false
        return
      }

      this.axios.post(this.webServerUrl + "/twist/", data).then((response) => {
        if (response.status !== 200) {
          this.$toast.error("Failed to send twist. Bad response")
        }
        this.pending = false
      }).catch(() => {
        this.$toast.error("Failed to send twist")
        this.pending = false
      })
    },
    syncControllers: function () {
      if (this.twistStatus?.angular?.z && this.keysDown.length === 0) {
        this.zValue = this.twistStatus?.angular?.z
      }
    }
  },
  watch: {
    twistStatus: function () {
      this.syncControllers()
    }
  }
}
</script>

<style scoped>
.movements {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin-top: 15px;
}

.left-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
}

.joystick-container {
  min-height: 145px;
}

.area-group {
  display: flex;
  flex-direction: row;
  padding: 12px 0;
}

.axis-label {
  font-weight: bold;
  width: 100px;
}

.axis-value {
  width: 50px;
  text-align: end;
}

.right-area {
  width: 350px;
}

.data-area {
  width: 350px;
}

.data-label {
  font-weight: bold;
}

.data-value {
  width: 240px;
  text-align: end;
  margin-left: auto;
  margin-right: 0;
}
</style>
