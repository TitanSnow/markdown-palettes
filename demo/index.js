import Vue from 'vue'
import MarkdownPalettes from '../esm'

// eslint-disable-next-line
const app = new Vue({
  el: '#demo',
  render: h => h(MarkdownPalettes, { domProps: { id: 'demo' } }),
})
