<template>
  <div
    ref="root"
    style="height: 100%"
  >
    <Container style="height: 100%" />
  </div>
</template>

<script>
import DiffMatchPatch from 'diff-match-patch'
import Container from './Container'
import {
  default as defaultThemeClassName,
  name as defaultThemeName,
  container as styleContainer,
} from '../themes'
import Renderer from '../render/Renderer'

const dmp = new DiffMatchPatch()

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
    renderPort: {
      validator: port => !!port.postMessage,
      default: () => {
        const chan = new MessageChannel()
        new Renderer(chan.port1)
        return chan.port2
      },
    },
  },
  data() {
    return {
      splitAllocation: 0.5,
      source: this.value,
    }
  },
  watch: {
    source(val, oldVal) {
      if (val !== this.value) this.$emit('input', val)
      const patches = dmp.patch_make(oldVal, val)
      this.renderPort.postMessage({ event: 'change', data: patches })
    },
    value(val) {
      this.source = val
    },
    renderPort: {
      immediate: true,
      handler(newPort, oldPort) {
        if (oldPort) oldPort.onmessage = null
        newPort.onmessage = ({ data: { event, data } }) =>
          void this.renderEvents.dispatchEvent(
            new CustomEvent(event, { detail: data })
          )
      },
    },
  },
  provide() {
    return {
      s: this,
    }
  },
  created() {
    this.renderEvents = new EventTarget()
  },
  mounted() {
    this.$refs.root.appendChild(styleContainer.cloneNode(true))
  },
}
</script>
