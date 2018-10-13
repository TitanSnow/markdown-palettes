import BaseServer from './BaseServer'

export default class WorkerServer extends BaseServer {
  constructor() {
    super()
    self.addEventListener(
      'message',
      ({ data: { event, data } }) => void this.emit(event, data)
    )
    function dispatch(event, data) {
      self.postMessage({ event, data })
    }
    this.on('didDiffHighlight', dispatch.bind(this, 'didDiffHighlight'))
    this.on('didDiffPreview', dispatch.bind(this, 'didDiffPreview'))
  }

  nextTick() {
    return new Promise(resolve => {
      const channel = new self.MessageChannel()
      const port = channel.port2
      channel.port1.onmessage = () => resolve()
      port.postMessage(1)
    })
  }
}
