<template>
  <div class="servomotor-group-container">
    <ServoMotor
        class="servomotor" :class="{'servomotor-big': index === 0 && (Object.keys(config).length % 2) === 1}"
        v-for="(motor, key, index) in config" :key="key"
        :config="motor" :motorKey="key"
        :socketGoalValue="motorStatus.find(x => x.key === key) ? motorStatus.find(x => x.key === key).goal_angle : 0"
        :socketCurrentValue="motorStatus.find(x => x.key === key) ? motorStatus.find(x => x.key === key).current_angle : null"/>
  </div>
</template>

<script>
import ServoMotor from "@/components/ServoMotor.vue"
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

@media only screen and (max-width: 700px) {
  .servomotor {
    flex: 0 100%;
  }
}

.servomotor-big {
  flex: 0 100%;
}
</style>
