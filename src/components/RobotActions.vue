<template>
  <div class="robot-actions">

    <div v-if="motionConfig.poses" class="robot-actions-item robot-poses">
      <div class="robot-actions-item-title">Poses:</div>
      <label>
        <select v-model="selectedPose" style="min-width: 200px">
          <option disabled value="">Poses</option>
          <option v-for="(pose, name) in motionConfig.poses" :key="name" :value="name">{{ name }}</option>
        </select>
      </label>
      <label>
        <input v-if="selectedPose !== ''" v-model="poseSeconds" class="robot-actions-input" type="number" min="0"
          max="120" placeholder="seconds" />
      </label>
      <button v-if="selectedPose !== ''" @click="goToPose" :disabled="pending">
        Go to {{ selectedPose }} in {{ poseSeconds }} seconds
      </button>
    </div>

    <div class="robot-actions-item">
      <div class="robot-actions-item-title">Point to point:</div>
      <label>
        <textarea v-model="pointToPointMotors" :rows="textAreaRows" cols="40" class="motors-text-area"></textarea>
      </label>
      <div>
        <label>
          <input v-if="pointToPointMotors !== ''" v-model="pointToPointSeconds" class="robot-actions-input"
            type="number" min="0" max="30" placeholder="seconds" />
        </label>
        <button v-if="pointToPointMotors !== ''" @click="movePointToPoint" :disabled="pending">
          Move point to point in {{ pointToPointSeconds }} seconds
        </button>
        <button @click="copyCurrentPosition" :disabled="pending">
          Copy current position
        </button>
        <button v-if="pointToPointMotors !== ''" @click="saveCurrentPosition" :disabled="pending">
          Save current position
        </button>
      </div>
    </div>

    <div class="robot-actions-item custom-buttons">
      <button @click="sendCustom(1)" :disabled="pending">
        Custom1
      </button>
      <button @click="sendCustom(2)" :disabled="pending">
        Custom2
      </button>
      <button @click="sendCustom(3)" :disabled="pending">
        Custom3
      </button>
      <button @click="sendCustom(4)" :disabled="pending">
        Custom4
      </button>
      <button @click="sendCustom(5)" :disabled="pending">
        Custom5
      </button>
    </div>

  </div>
</template>

<script>
import { toRaw } from "@vue/reactivity"

export default {
  name: "RobotActions",
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
    }
  },
  data: () => ({
    motionConfig: {},
    selectedPose: "",
    poseSeconds: 0,
    pointToPointMotors: "",
    pointToPointSeconds: 1,
    textAreaRows: 4,
    pending: false
  }),
  mounted() {
    this.getMotionInfo()
  },
  methods: {
    getMotionInfo: function () {
      if (this.robotConfig.poses) {
        this.motionConfig.poses = this.robotConfig.poses // For old sdk versions
      }
      this.axios.get(this.webServerUrl + "/motion/").then((response) => {
        if (response.status === 200) {
          this.motionConfig = response.data
        } else {
          this.$toast.error("Bad response from " + this.webServerUrl + "/motion/. Code " + response.status)
        }
      }).catch(() => {
      })
    },
    sendCustom: function (number) {
      this.pending = true
      let data = {
        "command": "custom" + number.toString()
      }
      this.axios.post(this.webServerUrl + "/custom/", data).then((response) => {
        if (response.status !== 200) {
          this.$toast.error("Failed to send custom" + number.toString())
        }
        this.pending = false
      }).catch(() => {
        this.$toast.error("Failed to send custom" + number.toString())
        this.pending = false
      })
    },
    goToPose: function () {
      if (this.poseSeconds === "") this.poseSeconds = 0
      let pose = this.selectedPose
      this.selectedPose = ""
      this.pending = true
      let data = {
        "seconds": parseFloat(this.poseSeconds)
      }
      this.axios.post(this.webServerUrl + "/go-to-pose/" + pose + "/", data).then((response) => {
        if (response.status !== 200) {
          this.$toast.error("Failed to go to pose " + pose + ". Bad response")
        }
        this.pending = false
      }).catch(() => {
        this.$toast.error("Failed to go to pose " + pose)
        this.pending = false
      })
    },
    movePointToPoint: function () {
      if (this.pointToPointSeconds === "") this.pointToPointSeconds = 0
      if (!this.isJsonString(this.pointToPointMotors)) {
        this.$toast.warning("Insert a valid JSON")
        return
      }
      this.pending = true
      let data = {
        "seconds": parseFloat(this.pointToPointSeconds),
        ...JSON.parse(this.pointToPointMotors)
      }
      this.axios.post(this.webServerUrl + "/move-point-to-point/", data).then((response) => {
        if (response.status !== 200) {
          this.$toast.error("Failed to move point to point. Bad response")
        }
        this.pending = false
      }).catch(() => {
        this.$toast.error("Failed to go to move point to point")
        this.pending = false
      })
    },
    copyCurrentPosition: function () {
      let status = toRaw(this.robotStatus)
      let motors = toRaw(this.robotConfig)["motors"]
      let result = {}
      this.textAreaRows = 2
      for (let [key] of Object.entries(motors)) {
        if (status["motors"] && status["motors"].find(x => x.key === key).goal_angle) {
          result[key] = status["motors"].find(x => x.key === key).goal_angle
        } else {
          result[key] = 0
        }
        this.textAreaRows++
      }
      this.pointToPointMotors = JSON.stringify(result, null, 2)
    },
    saveCurrentPosition: function () {
      let data = {}
      try {
        data = JSON.parse(this.pointToPointMotors)
      } catch (e) {
        this.$toast.warning("Insert a valid JSON")
        return
      }
      let name = prompt("Please enter the name of the position", "position")
      if (name === null || name === "") {
        return
      }
      this.axios.post(this.webServerUrl + "/poses/" + name + "/", data).then((response) => {
        if (response.status !== 200) {
          this.$toast.error("Failed to save current position. Bad response")
        } else {
          this.$toast.success("Saved current position")
        }
        this.pending = false
        this.getMotionInfo()
      }).catch(() => {
        this.$toast.error("Failed to save current position")
        this.pending = false
      })
    },
    isJsonString: function (str) {
      try {
        JSON.parse(str)
      } catch (e) {
        return false
      }
      return true
    }
  }
}
</script>

<style scoped>
.robot-actions-item {
  display: flex;
}

.robot-actions-item-title {
  font-weight: bold;
  padding-right: 10px;
}

.robot-poses {
  min-width: 120px;
  margin-bottom: 10px;
}

.custom-buttons {
  margin-top: 10px;
}

.robot-actions-input {
  width: 50px;
  margin: 0 2px;
}

.motors-text-area {
  min-width: 250px;
  min-height: 40px;
  margin: 0 2px;
}

button {
  cursor: pointer;
  margin: 0 2px;
}
</style>
