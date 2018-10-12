<template>
  <Container />
</template>

<script>
import EventEmitter from 'events'
import DiffMatchPatch from 'diff-match-patch'
import Container from './Container'
import {
  default as defaultThemeClassName,
  name as defaultThemeName,
} from '../themes'
import SyncServer from '../render/SyncServer'

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
    renderServer: {
      validator: server => !!server.postMessage,
      default: () => new SyncServer(),
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
      this.renderServer.postMessage({ event: 'change', data: patches })
    },
    value(val) {
      this.source = val
    },
  },
  provide() {
    return {
      s: this,
    }
  },
  created() {
    this.renderServerEvents = new EventEmitter()
    this.renderServer.onmessage = ({ data: { event, data } }) =>
      void this.renderServerEvents.emit(event, data)
  },
}
</script>
