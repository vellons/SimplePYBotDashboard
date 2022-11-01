<template>
  <div class="servomotor">

    <div class="infos no-select">
      <button :disabled="pending || parseInt(config.angle_limit[0]) > parseInt(rangeGoalAngle) - stepValue"
              @click="removeStep(stepValue)">-{{ stepValue }}
      </button>
      <button :disabled="pending || parseInt(config.angle_limit[0]) > parseInt(rangeGoalAngle) - stepValueSmall"
              @click="removeStep(stepValueSmall)">-{{ stepValueSmall }}
      </button>
      <span class="info-title allow-select tooltip">
        {{ config.display_key ? config.display_key : motorKey }}
        <span v-if="config.label" class="tooltip-text">{{ config.label ? config.label : '' }}</span>
      </span> | <span class="info-angle">{{ rangeGoalAngle }}</span>
      <button v-if="config.angle_limit[0] <= 0 && config.angle_limit[1] >= 0"
              :disabled="pending || parseInt(rangeGoalAngle) === 0" @click="goToZero">0
      </button>
      <button :disabled="pending || parseInt(config.angle_limit[1]) < parseInt(rangeGoalAngle) + stepValueSmall"
              @click="addStep(stepValueSmall)">+{{ stepValueSmall }}
      </button>
      <button :disabled="pending || parseInt(config.angle_limit[1]) < parseInt(rangeGoalAngle) + stepValue"
              @click="addStep(stepValue)">+{{ stepValue }}
      </button>
    </div>

    <div class="inputs-row no-select">
      <div class="input-limit" @click="goToMin">{{ config.angle_limit[0] }}</div>
      <div class="inputs-wrap">
        <label class="sr-only" for="goal"></label>
        <input id="goal" class="goal-input" type="range" @change="rangeGoalChanged"
               :min="config.angle_limit[0]" v-model="rangeGoalAngle" :max="config.angle_limit[1]" :step="1"/>
        <label class="sr-only" for="current"></label>
        <input v-if="socketCurrentValue != null" id="current" class="current-input" type="range" disabled
               :min="config.angle_limit[0]" v-model="rangeCurrentAngle" :max="config.angle_limit[1]" :step="1"/>
      </div>
      <div class="input-limit" @click="goToMax">{{ config.angle_limit[1] }}</div>
    </div>

  </div>
</template>

<script>
export default {
  name: "ServoMotor",
  props: {
    webServerUrl: {
      type: String,
      required: true
    },
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
    rangeGoalAngle: 0,
    stepValueSmall: 1,
    stepValue: 5,
    pending: false
  }),
  mounted() {
    this.rangeGoalAngle = this.socketGoalValue
    this.rangeCurrentAngle = this.socketCurrentValue
  },
  methods: {
    rangeGoalChanged: function () {
      this.pending = true
      let newAngle = parseInt(this.rangeGoalAngle)
      console.log(this.motorKey, newAngle)

      // Send trow websocket if parser is supported
      if (this.$robotConfig.get()["enable_parser_json_commands"] && this.$webSocket.isOpen()) {
        let socketBody = {
          "type": "C2R",  // Client to Robot
          "data": {
            "area": "motors",
            "commands": [
              {
                "key": this.motorKey,
                "action": "set_goal_angle",
                "goal_angle": newAngle
              }
            ]
          }
        }
        this.$webSocket.send(socketBody)
        this.pending = false
        return
      }

      let data = {
        "goal_angle": newAngle
      }
      this.axios.patch(this.webServerUrl + "/motors/" + this.motorKey + "/", data).then((response) => {
        if (response.status !== 200) {
          this.$toast.error("Failed to move " + this.motorKey + " to " + newAngle + ". Bad response")
        }
        this.pending = false
      }).catch(() => {
        this.$toast.error("Failed to move " + this.motorKey + " to " + newAngle)
        this.pending = false
      })
    },
    goToZero: function () {
      this.rangeGoalAngle = 0
      this.rangeGoalChanged()
    },
    removeStep: function (value) {
      this.rangeGoalAngle = parseInt(this.rangeGoalAngle) - value
      this.rangeGoalChanged()
    },
    addStep: function (value) {
      this.rangeGoalAngle = parseInt(this.rangeGoalAngle) + value
      this.rangeGoalChanged()
    },
    goToMin: function () {
      if (this.pending || this.rangeGoalAngle === this.config.angle_limit[0]) return
      this.rangeGoalAngle = this.config.angle_limit[0]
      this.rangeGoalChanged()
    },
    goToMax: function () {
      if (this.pending || this.rangeGoalAngle === this.config.angle_limit[1]) return
      this.rangeGoalAngle = this.config.angle_limit[1]
      this.rangeGoalChanged()
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
}

button {
  cursor: pointer;
  margin: 0 2px;
}

.infos {
  width: 100%;
  text-align: center;
  margin-bottom: 3px;
  height: 20px;
}

.info-title {
  font-weight: bold;
  padding: 0 10px;
  min-width: 150px;
  display: inline-block;
}

.info-angle {
  font-weight: bold;
  padding: 0 5px;
  min-width: 40px;
  display: inline-block;
}

.inputs-row {
  display: flex;
  align-items: center;
  width: 100%;
}

.input-limit {
  min-width: 35px;
  text-align: center;
  cursor: pointer;
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
  color: lightskyblue;
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

.no-select {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently */
}

.allow-select {
  -webkit-touch-callout: default; /* iOS Safari */
  -webkit-user-select: text; /* Safari */
  -moz-user-select: text; /* Old versions of Firefox */
  -ms-user-select: text; /* Internet Explorer/Edge */
  user-select: text; /* Non-prefixed version, currently */
}

.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltip-text {
  visibility: hidden;
  opacity: 0;
  background-color: #000000AA;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  position: absolute;
  width: 140px;
  bottom: 100%;
  left: 50%;
  margin-left: -70px;
  z-index: 1;
  transition: visibility 0.3s linear, opacity 0.3s linear;
}

.tooltip:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}
</style>
