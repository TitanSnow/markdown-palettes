<template>
  <div class="editor">
    <pre
      ref="view"
      class="editor-view"
    />
    <textarea
      v-model="s.source"
      class="editor-input"
      @scroll.passive="syncScroll({scrollTop: $event.target.scrollTop, scrollLeft: $event.target.scrollLeft})"
    />
  </div>
</template>

<script>
import Base from './Base'
import patch from '../vdom/patch'

export default {
  name: 'Editor',
  extends: Base,
  data: () => ({
    scrollTop: 0,
    scrollLeft: 0,
  }),
  mounted() {
    const viewElem = this.$refs.view
    this.s.renderEvents.addEventListener('diffHl', ({ detail: patches }) => {
      patch(viewElem, patches)
      this.syncScroll()
    })
  },
  methods: {
    syncScroll(pos) {
      const viewElem = this.$refs.view
      pos = pos || this
      viewElem.scrollTop = this.scrollTop = pos.scrollTop
      viewElem.scrollLeft = this.scrollLeft = pos.scrollLeft
    },
  },
}
</script>
