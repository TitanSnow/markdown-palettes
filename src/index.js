import wrap from '@vue/web-component-wrapper'
import Vue from 'vue'
import MarkdownPalettes from './components/Root'

MarkdownPalettes.install = Vue =>
  void Vue.component('MarkdownPalettes', MarkdownPalettes)

export default MarkdownPalettes

if (window && window.customElements && Element.prototype.attachShadow) {
  window.customElements.define('markdown-palettes', wrap(Vue, MarkdownPalettes))
}
