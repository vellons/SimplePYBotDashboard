<template>
  <div class="robot-actions">
    <div v-if="robotConfig.poses">
      <label>
        <select v-model="selectedPose">
          <option disabled value="">Poses</option>
          <option v-for="(pose, name) in robotConfig.poses" :key="name" :value="name">{{ name }}</option>
        </select>
      </label>
      <button v-if="selectedPose !== ''" @click="goToPose">Go to {{ selectedPose }}</button>
    </div>
  </div>

</template>

<script>
import {simplePYBotSDK} from "@/mixins/SimplePYBotSDK"

export default {
  name: "RobotActions",
  mixins: [simplePYBotSDK],
  props: {
    robotConfig: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    selectedPose: ''
  }),
  methods: {
    goToPose: function () {
      let pose = this.selectedPose
      this.selectedPose = ""
      this.axios.patch(this.getWebServerUrl() + "/go-to-pose/" + pose + "/").then((response) => {
        if (response.status !== 200) {
          this.$toast.error("Failed to go to pose " + pose + ". Bad response")
        }
      }).catch(() => {
        this.rangeSpeed = this.currentSpeed
        this.$toast.error("Failed to go to pose " + pose)
      })
    }
  }
}
</script>

<style scoped>
.robot-actions {
  padding: 15px;
}
</style>