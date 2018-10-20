<template>
  <div class="editor">
    <pre
      ref="view"
      class="editor-view"
    />
    <textarea
      ref="input"
      v-model="s.source"
      class="editor-input"
      @scroll.passive="syncScroll"
    />
  </div>
</template>

<script>
import Base from './Base'
import patch from '../vdom/patch'

export default {
  name: 'Editor',
  extends: Base,
  mounted() {
    const viewElem = this.$refs.view
    this.s.renderEvents.addEventListener('diffHl', ({ detail: patches }) => {
      patch(viewElem, patches)
      requestAnimationFrame(() => this.syncScroll())
    })
  },
  methods: {
    syncScroll() {
      const { view: viewElem, input: inputElem } = this.$refs
      viewElem.scrollTop = inputElem.scrollTop
      viewElem.scrollLeft = inputElem.scrollLeft
    },
  },
}
</script>
