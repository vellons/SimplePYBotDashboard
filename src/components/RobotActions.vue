<template>
  <div class="robot-actions">

    <div v-if="motionConfig.poses" class="robot-actions-item robot-poses">
      <div class="robot-actions-item-title">Poses:</div>
      <label>
        <select @change="changePtoPValues"  v-model="selectedPose" style="min-width: 200px">
          <option disabled value="no_pose">Poses</option>
          <option value="new_pose">--- New Pose ---</option>"
          <option v-for="(pose, name) in motionConfig.poses" :key="name" :value="name">{{ name }}</option>
        </select>
      </label>
      <label>
        <input v-if="selectedPose === 'new_pose'" type="text" v-model="newPoseName" placeholder="New Pose Name" />
      </label>
      <button v-if="selectedPose !== 'new_pose' && selectedPose !== 'no_pose' && selectedPose !== ''" @click="deletePose(selectedPose)">Delete</button>
    </div>

    <div class="robot-actions-item">
      <div class="robot-actions-item-title">Point to point:</div>
      <label>
        <div v-for="(motor, key) in robotConfig.motors" :key="key">
          <span>{{(pointToPointMotors[key]) ? pointToPointMotors[key] : 0}}</span>
          <input type="checkbox" :id="key" v-model="motor.enabled" />
          <label :for="key">{{ motor.id }}</label>
        </div>
      </label>
      <div>
        <label>
          <input v-if="pointToPointMotors !== ''" v-model="pointToPointSeconds" class="robot-actions-input"
            type="number" min="0" max="120" placeholder="seconds" />
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
    pointToPointSeconds: 0,
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
      this.pending = true
      let data = {
        "seconds": parseFloat(this.pointToPointSeconds),
        ...JSON.parse(JSON.stringify(this.pointToPointMotors, null, 2))
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
      // this.pointToPointMotors = JSON.stringify(result, null, 2)
      this.pointToPointMotors = result
    },
    saveCurrentPosition: function () {
      let data = {}
      try {
        data = JSON.parse(JSON.stringify(this.pointToPointMotors, null, 2))
      } catch (e) {
        this.$toast.warning("Insert a valid JSON")
        return
      }
      // Name from v-model newPoseName value
      let name = this.newPoseName

      if (name === "") {
        this.$toast.warning("Insert a valid name")
        return
      }
      this.axios.post(this.webServerUrl + "/poses/" + name + "/", data).then((response) => {
        if (response.status !== 200) {
          this.$toast.error("Failed to save current position. Bad response")
        } else {
          this.$toast.success("Saved current position")
          this.selectedPose = name

        }
        this.pending = false
        this.getMotionInfo()
      }).catch(() => {
        this.$toast.error("Failed to save current position")
        this.pending = false
      })
    },
    changePtoPValues: function () {
      //Get motors values from selected position
      if(this.selectedPose === "" || this.selectedPose === "new_pose") return
      let pose = this.selectedPose
      let motors = this.motionConfig.poses[pose]
      this.pointToPointMotors = motors

      //Set motors values to pointToPointMotors
      for (let [key] of Object.entries(motors)) {
        this.pointToPointMotors[key] = motors[key]
      }
    },
    deletePose: function () {
      let pose = this.selectedPose
      this.axios.delete(this.webServerUrl + "/poses/" + pose + "/").then((response) => {
        if (response.status !== 200) {
          this.$toast.error("Failed to delete pose " + pose + ". Bad response")
        } else {
          this.$toast.success("Deleted pose " + pose)
        }
        this.pending = false
        this.getMotionInfo()
        this.selectedPose = ""
      }).catch(() => {
        this.$toast.error("Failed to delete pose " + pose)
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
