<template>
  <div class="robot-actions">

    <div v-if="motionConfig.poses" class="robot-actions-item robot-poses">
      <div class="robot-actions-item-title">Poses:</div>
      <label>
        <select @change="changePtoPValues" v-model="selectedPose" style="min-width: 220px">
          <option disabled value="__no_pose">Poses</option>
          <option v-for="(pose, name) in motionConfig.poses" :key="name" :value="name">{{ name }}</option>
          <option value="__new_pose">--- new pose ---</option>
        </select>
      </label>

      <label style="margin-top: 2px">
        <input
            v-if="selectedPose !== '' && selectedPose !== '__new_pose'"
            v-model="poseSeconds" class="robot-actions-input" type="number" min="0"
            max="30" placeholder="seconds"/>
      </label>
      <button
          v-if="selectedPose !== '' && selectedPose !== '__new_pose'"
          @click="goToPose" :disabled="pending">
        Go to {{ selectedPose }} in {{ poseSeconds }} seconds
      </button>
      <button
          v-if="selectedPose !== '' && selectedPose !== '__new_pose'"
          @click="deletePose(selectedPose)">Delete pose
      </button>
    </div>

    <div class="robot-actions-item" v-if="selectedPose === '__new_pose'">
      <div class="robot-actions-item-title">Point to point:</div>
      <label>
        <div v-for="(motor, key) in robotConfig.motors" :key="key">
          <span class="ptp-value">{{ pointToPointMotors[key] !== undefined ? pointToPointMotors[key] : '-' }}</span>
          <input type="checkbox" :id="key" v-model="enabledMotors[key]"/>
          <label :for="key">{{ key }}</label>
        </div>
        <button @click="enableAllMotors">Select all</button>
        <button @click="disableAllMotors">Unselect all</button>
      </label>

      <div>
        <label>
          <input
              v-if="selectedPose === '__new_pose'" type="text" v-model="newPoseName"
              placeholder="New pose name"/>
        </label>
        <button @click="copyCurrentPosition" :disabled="pending">
          Copy current position
        </button>
        <button v-if="pointToPointMotors !== '' && selectedPose !== ''" @click="saveCurrentPosition"
                :disabled="pending || newPoseName === ''">
          Save current position
        </button>

        <br>

        <label>
          <input v-if="pointToPointMotors !== ''" v-model="pointToPointSeconds" class="robot-actions-input"
                 type="number" min="0" max="30" placeholder="seconds"/>
        </label>
        <button v-if="pointToPointMotors !== ''" @click="movePointToPoint" :disabled="pending">
          Move point to point in {{ pointToPointSeconds }} seconds
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
    newPoseName: "",
    enabledMotors: {},
    poseSeconds: 1,
    pointToPointMotors: "",
    pointToPointSeconds: 1,
    pending: false
  }),
  mounted() {
    this.getMotionInfo()
    this.enableAllMotors()
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
      this.pending = true
      let data = {
        "seconds": parseFloat(this.poseSeconds)
      }
      this.axios.post(this.webServerUrl + "/go-to-pose/" + pose + "/", data).then((response) => {
        if (response.status !== 200) {
          this.$toast.error("Failed to go to pose " + pose + ". Bad response")
        }
        this.selectedPose = ""
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
      for (let [key] of Object.entries(motors)) {
        if (status["motors"] && status["motors"].find(x => x.key === key).goal_angle) {
          result[key] = status["motors"].find(x => x.key === key).goal_angle
        } else {
          result[key] = 0
        }
      }
      this.pointToPointMotors = result
    },
    saveCurrentPosition: function () {
      let data = {}
      try {
        //Select from point to point motors only the enabled motors
        for (let [key, value] of Object.entries(this.pointToPointMotors)) {
          if (this.enabledMotors[key]) {
            data[key] = value
          }
        }
      } catch (e) {
        this.$toast.warning("Insert a valid JSON")
        return
      }

      if (Object.entries(data).length === 0) {
        this.$toast.warning("Insert at least 1 servo")
        return
      }

      let name = this.newPoseName

      if (name === "") {
        this.$toast.warning("Insert a valid name")
        return
      }
      this.pending = true
      this.axios.post(this.webServerUrl + "/poses/" + name + "/", data).then((response) => {
        if (response.status !== 200) {
          this.$toast.error("Failed to save current position. Bad response")
        } else {
          this.$toast.success("Saved current position")
          this.selectedPose = name
          this.newPoseName = ""
        }
        this.pending = false
        this.getMotionInfo()
      }).catch(() => {
        this.$toast.error("Failed to save current position")
        this.pending = false
      })
    },
    changePtoPValues: function () {
      if (this.selectedPose === "" || this.selectedPose !== "__new_pose") return
      this.copyCurrentPosition()
    },
    deletePose: function () {
      let pose = this.selectedPose
      if (!confirm('Are you sure to delete the pose ' + pose + '?')) {
        return
      }
      this.pending = true
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
    enableAllMotors: function () {
      for (let [key] of Object.entries(this.robotConfig.motors)) {
        this.enabledMotors[key] = true
      }
    },
    disableAllMotors: function () {
      for (let [key] of Object.entries(this.robotConfig.motors)) {
        this.enabledMotors[key] = false
      }
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

.ptp-value {
  padding: 0 5px;
  min-width: 35px;
  display: inline-block;
  text-align: end;
}

input, select {
  margin: 2px;
}

button {
  cursor: pointer;
  margin: 2px;
}
</style>
