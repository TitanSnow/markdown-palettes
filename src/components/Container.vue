<template>
  <div :class="s.theme.className">
    <Toolbar />
    <Split>
      <Editor slot="left" />
      <Preview slot="right" />
    </Split>
  </div>
</template>

<script>
import Base from './Base'
import Toolbar from './Toolbar'
import Split from './Split'
import Editor from './Editor'
import Preview from './Preview'

export default {
  name: 'Container',
  components: { Toolbar, Split, Editor, Preview },
  extends: Base,
}
</script>
