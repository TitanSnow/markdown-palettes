<template>
  <div
    ref="preview"
    class="preview"
  />
</template>

<script>
import Base from './Base'
import diff from 'virtual-dom/diff'
import patch from 'virtual-dom/patch'
import VNode from 'virtual-dom/vnode/vnode'

export default {
  name: 'Preview',
  extends: Base,
  data: () => ({
    tree: new VNode('div', {}, []),
  }),
  computed: {
    newTree() {
      return new VNode('div', {}, this.s.rendered ? [this.s.rendered] : [])
    },
  },
  asyncComputed: {
    async patches() {
      if (this.tree !== this.newTree) return diff(this.tree, this.newTree)
    },
  },
  watch: {
    patches(patches) {
      if (patches) {
        patch(this.$refs.preview, patches)
        this.tree = this.newTree
      }
    },
  },
}
</script>
