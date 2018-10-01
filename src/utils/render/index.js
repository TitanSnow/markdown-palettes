import { createElementVueFactory } from './markdown-it-v/cross-create-element'
import { Node } from './markdown-it-v/stream-dom'

export default source => {
  return new Promise((resolve, reject) => {
    const w = new Worker('./worker.js')
    w.postMessage(source)
    w.onmessage = ({ data }) => resolve(data)
    w.onerror = reject
  })
}

export const toVue = (rendered, createElement) =>
  Node.prototype.renderToVDOM.call(
    rendered,
    createElementVueFactory(createElement)
  )
