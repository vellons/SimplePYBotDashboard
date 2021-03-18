<template>
  <div class="sensors-group-container">
    <div class="sensors" v-for="(sensors, key) in config" :key="key">
      <b>{{ key }}</b>:
      {{ sensorsStatus.find(x => x.key === key) ? sensorsStatus.find(x => x.key === key).value : '-' }}
    </div>
  </div>
</template>

<script>
import {simplePYBotSDK} from "@/mixins/SimplePYBotSDK"

export default {
  name: "SensorsGroup",
  mixins: [simplePYBotSDK],
  props: {
    config: {
      type: Object,
      required: true
    },
    sensorsStatus: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.sensors-group-container {
  display: flex;
  flex-wrap: wrap;
}

.sensors {
  flex: 0 25%;
  padding: 10px 0;
}

@media only screen and (max-width: 700px) {
  .sensors {
    flex: 0 100%;
  }
}
</style>
