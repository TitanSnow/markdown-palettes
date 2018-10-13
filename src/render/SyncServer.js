import BaseServer from './BaseServer'

export default class SyncServer extends BaseServer {
  constructor() {
    super()
    async function dispatch(event, data) {
      await Promise.resolve()
      if (this.onmessage) this.onmessage({ data: { event: event, data: data } })
    }
    this.on('didDiffHighlight', dispatch.bind(this, 'didDiffHighlight'))
    this.on('didDiffPreview', dispatch.bind(this, 'didDiffPreview'))
  }

  postMessage({ event, data }) {
    this.emit(event, data)
  }

  nextTick() {
    const rq = window.requestIdleCallback || window.requestAnimationFrame
    return new Promise(resolve => {
      rq(() => resolve())
    })
  }
}
