<template>
  <div :id="'joystick_' + idx">
    <!--div style="color: red;">x={{ lastValue.x }} y={{ lastValue.y }}</div-->
    <div style="width: 128px; position: relative;">
      <img src="images/joystick-base.png" alt=""/>
      <div :id="idx + '_stick'" style="position: absolute; left:32px; top:32px;">
        <img src="images/joystick-red.png" alt=""/>
      </div>
    </div>
  </div>
</template>

<script>
class JoystickController {
  // stickID: ID of HTML element (representing joystick) that will be dragged
  // maxDistance: maximum amount joystick can move in any direction
  // deadZone: joystick must move at least this amount from origin to register value change
  constructor(stickID, maxDistance, deadZone) {
    this.id = stickID;
    let stick = document.getElementById(stickID);

    // location from which drag begins, used to calculate offsets
    this.dragStart = null;

    // track touch identifier in case multiple joysticks present
    this.touchId = null;

    this.active = false;
    this.value = {x: 0, y: 0};

    let self = this;

    function handleDown(event) {
      self.active = true;

      // all drag movements are instantaneous
      stick.style.transition = '0s';

      // touch event fired before mouse event; prevent redundant mouse event from firing
      event.preventDefault();

      if (event.changedTouches)
        self.dragStart = {x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY};
      else
        self.dragStart = {x: event.clientX, y: event.clientY};

      // if this is a touch event, keep track of which one
      if (event.changedTouches)
        self.touchId = event.changedTouches[0].identifier;
    }

    function handleMove(event) {
      if (!self.active) return;

      // if this is a touch event, make sure it is the right one
      // also handle multiple simultaneous touchmove events
      let touchmoveId = null;
      if (event.changedTouches) {
        for (let i = 0; i < event.changedTouches.length; i++) {
          if (self.touchId === event.changedTouches[i].identifier) {
            touchmoveId = i;
            event.clientX = event.changedTouches[i].clientX;
            event.clientY = event.changedTouches[i].clientY;
          }
        }

        if (touchmoveId == null) return;
      }

      const xDiff = event.clientX - self.dragStart.x;
      const yDiff = event.clientY - self.dragStart.y;
      const angle = Math.atan2(yDiff, xDiff);
      const distance = Math.min(maxDistance, Math.hypot(xDiff, yDiff));
      const xPosition = distance * Math.cos(angle);
      const yPosition = distance * Math.sin(angle);

      // move stick image to new position
      stick.style.transform = `translate3d(${xPosition}px, ${yPosition}px, 0px)`;

      // deadZone adjustment
      const distance2 = (distance < deadZone) ? 0 : maxDistance / (maxDistance - deadZone) * (distance - deadZone);
      const xPosition2 = distance2 * Math.cos(angle);
      const yPosition2 = distance2 * Math.sin(angle);
      const xPercent = parseFloat((xPosition2 / maxDistance).toFixed(3));
      const yPercent = parseFloat((yPosition2 / maxDistance).toFixed(3));

      self.value = {x: xPercent, y: -yPercent};
    }

    function handleUp(event) {
      if (!self.active) return;

      // if this is a touch event, make sure it is the right one
      if (event.changedTouches && self.touchId !== event.changedTouches[0].identifier) return;

      // transition the joystick position back to center
      stick.style.transition = '0.2s';
      stick.style.transform = `translate3d(0px, 0px, 0px)`;

      // reset everything
      self.value = {x: 0, y: 0};
      self.touchId = null;
      self.active = false;
    }

    stick.addEventListener('mousedown', handleDown);
    stick.addEventListener('touchstart', handleDown);
    document.addEventListener('mousemove', handleMove, {passive: false});
    document.addEventListener('touchmove', handleMove, {passive: false});
    document.addEventListener('mouseup', handleUp);
    document.addEventListener('touchend', handleUp);
  }
}

export default {
  name: "Joystick",
  props: {
    idx: {
      type: String,
      required: true
    },
    refreshInterval: {
      type: Number,
      default: 333
    }
  },
  data: () => ({
    joystick1: null,
    lastValue: {},
    value: {},
    lastChanged: new Date().valueOf() + 1000
  }),
  mounted() {
    console.log("Joystick " + this.idx + " mounted")
    this.joystick1 = new JoystickController(this.idx + "_stick", 52, 3)
    this.lastValue = this.joystick1.value
    this.value = this.lastValue
    this.joystickLoop()
  },
  methods: {
    update: function () {
      this.lastValue = this.joystick1.value
      if (this.lastValue !== this.value && this.lastChanged + this.refreshInterval < new Date().valueOf()) {
        this.lastChanged = new Date().valueOf()
        this.value = this.lastValue
        this.$emit("change", this.value)
      } else if (this.lastValue.x === 0 && this.lastValue.y === 0 && (this.value.x !== this.lastValue.x || this.value.y !== this.lastValue.y)) {
        this.lastChanged = new Date().valueOf()
        this.value = this.lastValue
        this.$emit("change", this.value)
      }
    },
    joystickLoop: function () {
      requestAnimationFrame(this.joystickLoop)
      this.update()
    }
  }
}
</script>
