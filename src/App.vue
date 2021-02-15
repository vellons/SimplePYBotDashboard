<template>
  <ServomotorsGroup :config="servomotorsConfig"/>
</template>

<script>
import ServomotorsGroup from '@/components/ServomotorsGroup.vue'

export default {
  name: 'App',
  components: {
    ServomotorsGroup
  },
  data: () => ({
    servomotorsConfig: {
      "head_z": {
        "id": "Head",
        "offset": 0.0,
        "type": "virtual-servo",
        "angle_limit": [
          -75,
          75
        ],
        "orientation": "direct"
      },
      "l_elbow_y": {
        "id": "Left_Hand",
        "offset": 0.0,
        "type": "virtual-servo",
        "angle_limit": [
          -10,
          125
        ],
        "orientation": "direct"
      },
      "r_elbow_y": {
        "id": "Right_Hand",
        "offset": 0.0,
        "type": "virtual-servo",
        "angle_limit": [
          -10,
          125
        ],
        "orientation": "indirect"
      }
    }
  })
}
</script>

<style>

</style>
