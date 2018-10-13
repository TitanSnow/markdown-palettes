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
    this.s.renderServerEvents.on('didDiffPreview', async function(patches) {
      await Promise.resolve()
      patch(previewElem, patches)
    })
  },
}
</script>
