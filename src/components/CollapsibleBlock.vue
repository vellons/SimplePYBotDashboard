<template>
  <div class="collapsible-block">
    <input :id="id" class="toggle" type="checkbox" :checked="checked">
    <label v-if="type === 'lbl-toggle-text'" :for="id" class="lbl-toggle" :class="[type, classes]"> {{ toggleText }} </label>
    <label v-if="type === 'left-toggle'" :for="id" class="lbl-toggle" :class="[type, classes]">
      <slot name="header"/>
    </label>
    <div class="collapsible-content">
      <div class="content-inner">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CollapsibleBlock",
  props: {
    id: {
      type: String,
      required: true
    },
    checked: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: "lbl-toggle-text"
    },
    toggleText: {
      type: String,
      default: "Toggle"
    },
    classes: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>

input[type='checkbox'] {
  display: none;
}

.lbl-toggle-text {
  display: block;
  background: #FAE042;
  padding: 7px;
  cursor: pointer;
  border-radius: 7px;
  transition: all 0.25s ease-out;
  min-height: 20px;

  font-weight: bold;
  font-family: monospace;
  font-size: 16px;
  text-transform: uppercase;
  text-align: center;
  color: #A77B0E;
}

.left-toggle {
  display: block;
  background: #FAE042;
  padding: 10px 0 10px 7px;
  border-radius: 7px;
  transition: all 0.25s ease-out;
  min-height: 20px;

  font-weight: bold;
  font-family: monospace;
  font-size: 16px;
  color: #A77B0E;
}

.top-radius-zero {
  border-radius: 0;
}

.lbl-toggle:hover {
  color: #7C5A0B;
}

.lbl-toggle-text::before {
  content: ' ';
  display: inline-block;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 5px solid currentColor;
  vertical-align: middle;
  margin-right: 8px;
  position: relative;
  transform: translateY(-2px);
  transition: transform .2s ease-out;
}

.left-toggle::before {
  content: ' ';
  display: inline-block;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 5px solid currentColor;
  margin-left: 3px;
  position: absolute;
  top: 16px;
  transform: translateY(-2px);
  transition: transform .2s ease-out;
}

.toggle:checked + .lbl-toggle::before {
  transform: rotate(90deg) translateX(-3px);
}

.collapsible-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height .25s ease-in-out;
}

.toggle:checked + .lbl-toggle + .collapsible-content {
  max-height: 2000px;
}

.toggle:checked + .lbl-toggle {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.collapsible-content .content-inner {
  background: rgba(250, 224, 66, 0.12);
  border-bottom: 1px solid rgba(250, 224, 66, .45);
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
  padding: 8px 16px;
}
</style>
