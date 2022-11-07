<template>
  <div class="servomotor-group-container">
    <ServoMotor
        class="servomotor" :class="{'servomotor-big': index === 0 && (Object.keys(config).length % 2) === 1}"
        v-for="(motor, key, index) in config" :key="key"
        :webServerUrl="webServerUrl"
        :config="motor" :motorKey="key"
        :socketGoalValue="motorStatus.find(x => x.key === key) ? motorStatus.find(x => x.key === key).goal_angle : 0"
        :socketCurrentValue="motorStatus.find(x => x.key === key) ? motorStatus.find(x => x.key === key).current_angle : null"/>
  </div>
</template>

<script>
import ServoMotor from "@/components/ServoMotor.vue"

export default {
  name: "ServomotorsGroup",
  components: {
    ServoMotor
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
    motorStatus: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.servomotor-group-container {
  display: flex;
  flex-wrap: wrap;
  margin: 10px 0 !important;
}

.servomotor {
  flex: 0 50%;
}

@media only screen and (max-width: 900px) {
  .servomotor {
    flex: 0 100%;
  }
}

.servomotor-big {
  flex: 0 100%;
}
</style>
