<template>
  <Container />
</template>

<script>
import Container from './Container'
import {
  default as defaultThemeClassName,
  name as defaultThemeName,
} from '../themes'
import { parse, render } from '../utils/md'

export default {
  name: 'MarkdownPalettes',
  components: { Container },
  props: {
    value: {
      type: String,
      default: '',
    },
    theme: {
      validator: themeObj =>
        themeObj.hasOwnProperty('name') && themeObj.hasOwnProperty('className'),
      default: () => ({
        name: defaultThemeName,
        className: defaultThemeClassName,
      }),
    },
  },
  data() {
    return {
      splitAllocation: 0.5,
      source: this.value,
    }
  },
  watch: {
    source(val) {
      if (val !== this.value) this.$emit('input', val)
    },
    value(val) {
      this.source = val
    },
  },
  asyncComputed: {
    ast() {
      return parse(this.source)
    },
    rendered() {
      return render(this.ast)
    },
  },
  provide() {
    return {
      s: this,
    }
  },
}
</script>
