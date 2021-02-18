<template>
  <div class="servomotor">
    <div class="infos">
      <span class="title">{{ motorKey }}</span> | {{ rangeGoalAngle }}
    </div>
    <div class="inputs-row">
      <div class="input-limit">{{ config.angle_limit[0] }}</div>
      <div class="inputs-wrap">
        <label class="sr-only" for="goal"></label>
        <input id="goal" class="goal-input" type="range" @change="rangeGoalChanged"
               :min="config.angle_limit[0]" v-model="rangeGoalAngle" :max="config.angle_limit[1]" :step="1"/>
        <label class="sr-only" for="current"></label>
        <input id="current" class="current-input" type="range" disabled
               :min="config.angle_limit[0]" v-model="rangeCurrentAngle" :max="config.angle_limit[1]" :step="1"/>
      </div>
      <div class="input-limit">{{ config.angle_limit[1] }}</div>
    </div>
  </div>
</template>

<script>
import {simplePYBotSDK} from "@/mixins/SimplePYBotSDK"

export default {
  name: "ServoMotor",
  mixins: [simplePYBotSDK],
  props: {
    config: {
      type: Object,
      required: true
    },
    motorKey: {
      required: true
    },
    socketGoalValue: {
      default: 0
    },
    socketCurrentValue: {
      default: 0
    },
  },
  data: () => ({
    rangeCurrentAngle: 0,
    rangeGoalAngle: 0
  }),
  mounted() {
    this.rangeGoalAngle = this.socketGoalValue
    this.rangeCurrentAngle = this.socketCurrentValue
  },
  methods: {
    rangeGoalChanged: function () {
      console.log(this.motorKey, this.rangeGoalAngle)
      let data = {
        "goal_angle": this.rangeGoalAngle
      }
      this.axios.patch(this.getWebServerUrl() + "/motors/" + this.motorKey + "/", data).then((response) => {
        if (response.status !== 200) {
          this.$toast.error("Failed to move " + this.motorKey + " to " + this.rangeGoalAngle + ". Bad response")
        }
      }).catch(() => {
        this.$toast.error("Failed to move " + this.motorKey + " to " + this.rangeGoalAngle)
      })
    }
  },
  watch: {
    socketGoalValue: function () {
      this.rangeGoalAngle = this.socketGoalValue
    },
    socketCurrentValue: function () {
      this.rangeCurrentAngle = this.socketCurrentValue
    }
  }
}
</script>

<style scoped>

.servomotor {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid orange;
}

.infos {
  width: 100%;
  text-align: center;
  margin-bottom: 3px;
}

.title {
  font-weight: bold;
}

.inputs-row {
  display: flex;
  align-items: center;
  width: 100%;
}

.input-limit {
  min-width: 35px;
  text-align: center;
}

.inputs-wrap {
  display: grid;
  grid-template-rows: max-content 1em;
  overflow: hidden;
  position: relative;
  width: 100%;
  background: linear-gradient(0deg, #b03131 1em, transparent 0);
}

.sr-only {
  position: absolute;
  clip-path: inset(50%);
}

input[type=range] {
  grid-column: 1;
  grid-row: 2;
  margin: 0;
  background: none;
  font: inherit;
  pointer-events: none;
}

.goal-input {
  color: black;
}

.current-input {
  color: yellow;
}

input[type=range]::-webkit-slider-runnable-track, input[type=range]::-webkit-slider-thumb, input[type=range] {
  -webkit-appearance: none;
}

input[type=range]::-webkit-slider-runnable-track, input[type=range]::-moz-range-track {
  width: 100%;
  height: 100%;
  background: none;
}

input[type=range]::-webkit-slider-thumb {
  border: none;
  border-radius: 3px;
  background: currentcolor;
  pointer-events: auto;
}

input[type=range]::-moz-range-thumb {
  border: none;
  border-radius: 3px;
  background: currentcolor;
  pointer-events: auto;
}

input[type=range]:focus, input[type=range]:focus {
  color: blue;
  outline: none;
}

.goal-input::-webkit-slider-thumb {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.goal-input::-moz-range-thumb {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.current-input::-webkit-slider-thumb {
  width: 2px;
  height: 16px;
}

.current-input::-moz-range-thumb {
  width: 2px;
  height: 16px;
}
</style>
