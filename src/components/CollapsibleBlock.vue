<template>
  <div class="collapsible-block">
    <input :id="id" class="toggle" type="checkbox" checked>
    <label v-if="type === 'lbl-toggle-text'" :for="id" class="lbl-toggle" :class="[type]"> {{ toggleText }} </label>
    <label v-if="type === 'left-toggle'" :for="id" class="lbl-toggle" :class="[type]">
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
    type: {
      type: String,
      default: "lbl-toggle-text"
    },
    toggleText: {
      type: String,
      default: "Toggle"
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
  font-weight: bold;
  font-family: monospace;
  font-size: 1.0rem;
  text-transform: uppercase;
  text-align: center;
  color: #A77B0E;
  background: #FAE042;
  padding: 7px;
  cursor: pointer;
  border-radius: 7px;
  transition: all 0.25s ease-out;
  min-height: 20px;
}

.left-toggle {
  display: block;
  background: #FAE042;
  padding-left: 7px;
  border-radius: 7px;
  transition: all 0.25s ease-out;
  min-height: 20px;
}

.lbl-toggle-text:hover {
  color: #7C5A0B;
}

.lbl-toggle::before {
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

.toggle:checked + .lbl-toggle::before {
  transform: rotate(90deg) translateX(-3px);
}

.collapsible-content {
  max-height: 0;
  overflow: scroll;
  transition: max-height .25s ease-in-out;
}

.toggle:checked + .lbl-toggle + .collapsible-content {
  max-height: 100vh;
}

.toggle:checked + .lbl-toggle {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.collapsible-content .content-inner {
  background: rgba(250, 224, 66, .2);
  border-bottom: 1px solid rgba(250, 224, 66, .45);
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
  padding: 8px 16px;
}
</style>
