<template>
  <div class="motor-group-container">
    <ServoMotor class="servomotor" v-for="(motor, key) in config" :key="key"
                :config="motor" :motorKey="key" :socketValue="socketValue"/>
    <div>
      <input type="range" :min="-10" v-model="socketValue" :max="90" :step="1"/>
    </div>
  </div>
</template>

<script>
import ServoMotor from '@/components/global/ServoMotor.vue'

export default {
  name: 'ServomotorsGroup',
  components: {
    ServoMotor
  },
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    socketValue: 0,
  }),
}
</script>

<style scoped>
.motor-group-container {
  display: flex;
  flex-direction: row;
}

.servomotor {
  width: 33%;
}
</style>
