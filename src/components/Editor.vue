<template>
  <textarea
    :value="s.state.editor.value"
    @input="s.commit('editor/setValue', $event.target.value)"
  />
</template>

<script>
import Base from './Base'

export default {
  extends: Base,
}
</script>
