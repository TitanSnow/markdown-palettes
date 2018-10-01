import Base from './Base'
import { toVue } from '../utils/render'

export default {
  extends: Base,
  render(h) {
    const rendered = this.s.state.preview.rendered
    return h(
      'div',
      { staticClass: 'preview' },
      rendered ? toVue(rendered, h) : []
    )
  },
}
