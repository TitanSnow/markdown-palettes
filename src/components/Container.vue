<template>
  <div :class="s.state.theme.className">
    <editor />
  </div>
</template>

<script>
import Base from './Base'
import Editor from './Editor'

export default {
  components: { Editor },
  extends: Base,
}
</script>
