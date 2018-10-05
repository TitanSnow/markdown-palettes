<template>
  <div class="split">
    <div :style="{
      width: leftWidthCSS
    }" class="split-item"><slot name="left" /></div>

    <div :style="{
      width: rightWidthCSS
    }" class="split-item"><slot name="right"/></div>
  </div>
</template>

<script>
import Base from './Base'

export default {
  name: 'Split',
  extends: Base,
  computed: {
    leftWidthCSS() {
      return this.s.splitAllocation * 100 + '%'
    },
    rightWidthCSS() {
      return (1 - this.s.splitAllocation) * 100 + '%'
    }
  }
}
</script>
