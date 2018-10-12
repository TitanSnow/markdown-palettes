import BaseServer from './BaseServer'

export default class SyncServer extends BaseServer {
  constructor() {
    super()
    async function dispatch(event, data) {
      await Promise.resolve()
      if (this.onmessage) this.onmessage({ data: { event: event, data: data } })
    }
    this.on('didParse', dispatch.bind(this, 'didParse'))
    this.on('didDiffHighlight', dispatch.bind(this, 'didDiffHighlight'))
    this.on('didDiffPreview', dispatch.bind(this, 'didDiffPreview'))
  }
}
