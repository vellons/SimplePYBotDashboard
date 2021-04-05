<template>
  <div class="robot-actions">

    <div v-if="robotConfig.poses" class="robot-actions-item robot-poses">
      <div class="robot-actions-item-title">Poses:</div>
      <label>
        <select v-model="selectedPose">
          <option disabled value="">Poses</option>
          <option v-for="(pose, name) in robotConfig.poses" :key="name" :value="name">{{ name }}</option>
        </select>
      </label>
      <label>
        <input v-if="selectedPose !== ''" v-model="poseSeconds" class="robot-actions-input"
               type="number" min="0" max="120" placeholder="seconds"/>
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
      <label>
        <input v-if="pointToPointMotors !== ''" v-model="pointToPointSeconds" class="robot-actions-input"
               type="number" min="0" max="120" placeholder="seconds"/>
      </label>
      <button v-if="pointToPointMotors !== ''" @click="movePointToPoint" style="height: 22px" :disabled="pending">
        Move point to point in {{ pointToPointSeconds }} seconds
      </button>
      <button @click="copyCurrentPosition" style="height: 22px" :disabled="pending">
        Copy current position
      </button>
    </div>

  </div>
</template>

<script>
import {toRaw} from "@vue/reactivity"

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
    selectedPose: '',
    poseSeconds: 0,
    pointToPointMotors: '',
    pointToPointSeconds: 0,
    textAreaRows: 4,
    pending: false
  }),
  methods: {
    goToPose: function () {
      if (this.poseSeconds === '') this.poseSeconds = 0
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
      if (this.pointToPointSeconds === '') this.pointToPointSeconds = 0
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

.robot-actions-input {
  width: 50px;
}

.motors-text-area {
  min-width: 250px;
  min-height: 40px;
}

button {
  cursor: pointer;
}
</style>
