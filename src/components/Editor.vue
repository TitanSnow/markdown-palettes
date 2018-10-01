<template>
  <textarea
    :value="s.state.editor.value"
    class="editor"
    @input="s.dispatch('updateValue', $event.target.value)"
  />
</template>

<script>
import Base from './Base'

export default {
  name: 'Editor',
  extends: Base,
}
</script>
