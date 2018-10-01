<template>
  <container />
</template>

<script>
import { Store as Vuex } from 'vuex'
import store from '../store'
import Container from './Container'

export default {
  name: 'MarkdownPalettes',
  provide: () => ({
    s: new Vuex(store),
  }),
  components: { Container },
}
</script>
