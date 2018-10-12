<template>
  <div class="editor">
    <pre
      ref="view"
      class="editor-view"
    />
    <textarea
      v-model="s.source"
      class="editor-input"
      @scroll.passive="scrollTop = $event.target.scrollTop, scrollLeft = $event.target.scrollLeft"
    />
  </div>
</template>

<script>
import Base from './Base'
import patch from 'virtual-dom/patch'

export default {
  name: 'Editor',
  extends: Base,
  data: () => ({
    scrollTop: 0,
    scrollLeft: 0,
  }),
  watch: {
    scrollTop: 'syncScroll',
    scrollLeft: 'syncScroll',
  },
  mounted() {
    const viewElem = this.$refs.view
    this.s.renderServerEvents.on('didDiffHighlight', async function(patches) {
      await Promise.resolve()
      patch(viewElem, patches)
    })
  },
  methods: {
    syncScroll() {
      const viewElem = this.$refs.view
      viewElem.scrollTop = this.scrollTop
      viewElem.scrollLeft = this.scrollLeft
    },
  },
}
</script>
