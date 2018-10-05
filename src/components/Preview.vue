<template>
  <div 
    class="preview" 
    v-html="s.rendered"
  />
</template>

<script>
import Base from './Base'
export default {
  name: 'Preview',
  extends: Base,
}
</script>
