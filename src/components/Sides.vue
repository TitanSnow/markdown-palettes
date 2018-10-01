<template>
  <div class="sides">
    <editor 
      :style="{
        width: s.getters['sides/leftSizeCSS']
      }"
    />
    <preview 
      :style="{
        width: s.getters['sides/rightSizeCSS']
      }"
    />
  </div>
</template>

<script>
import Base from './Base'
import Editor from './Editor'
import Preview from './Preview'

export default {
  components: { Editor, Preview },
  extends: Base,
}
</script>
