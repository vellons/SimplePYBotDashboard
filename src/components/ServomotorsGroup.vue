<template>
  <div class="servomotor-group-container">
    <ServoMotor
        class="servomotor" v-for="(motor, key) in config" :key="key"
        :config="motor" :motorKey="key"
        :socketGoalValue="motorStatus.find(x => x.key === key) ? motorStatus.find(x => x.key === key).goal_angle : 0"
        :socketCurrentValue="motorStatus.find(x => x.key === key) ? motorStatus.find(x => x.key === key).current_angle : 0"/>
  </div>
</template>

<script>
import ServoMotor from "@/components/global/ServoMotor.vue"
import {simplePYBotSDK} from "@/mixins/SimplePYBotSDK"

export default {
  name: "ServomotorsGroup",
  mixins: [simplePYBotSDK],
  components: {
    ServoMotor
  },
  props: {
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
}

.servomotor {
  flex: 0 50%;
}

.servomotor:nth-of-type(1) {
  flex: 0 100%;
}
</style>
