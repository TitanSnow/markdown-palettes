<template>
  <div :class="s.state.theme.className">
    <toolbar />
    <sides />
  </div>
</template>

<script>
import Base from './Base'
import Toolbar from './Toolbar'
import Sides from './Sides'

export default {
  name: 'Container',
  components: { Toolbar, Sides },
  extends: Base,
}
</script>
