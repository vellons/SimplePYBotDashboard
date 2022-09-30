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
    pending: false
  }),
  methods: {
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
          "z": 0.0
        }
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
  padding: 22px 0;
}

.axis-label {
  font-weight: bold;
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
