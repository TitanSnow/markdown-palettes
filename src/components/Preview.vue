<template>
  <div
    ref="preview"
    class="preview"
  />
</template>

<script>
import Base from './Base'
import patch from '../vdom/patch'

export default {
  name: 'Preview',
  extends: Base,
  mounted() {
    const previewElem = this.$refs.preview
    this.s.renderEvents.addEventListener('diffPv', ({ detail: patches }) => {
      patch(previewElem, patches)
    })
  },
}
</script>
