import { createElementVueFactory } from './markdown-it-v/cross-create-element'
import { Node } from './markdown-it-v/stream-dom'

export default source => {
  const w = new Worker('./worker.js')
  return {
    promise: new Promise((resolve, reject) => {
      w.postMessage(source)
      w.onmessage = ({ data }) => resolve(data)
      w.onerror = reject
    }),
    cancel: w.terminate.bind(w),
  }
}

export const toVue = (rendered, createElement) =>
  Node.prototype.renderToVDOM.call(
    rendered,
    createElementVueFactory(createElement)
  )
