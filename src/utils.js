export function microTick() {
  return Promise.resolve()
}

const global = Function('return this')()

export function marcoTick() {
  if (global.setImmediate) {
    return new Promise(resolve => global.setImmediate(() => resolve()))
  } else if (global.MessageChannel) {
    const chan = new global.MessageChannel()
    const p = new Promise(resolve => (chan.port1.onmessage = () => resolve()))
    chan.port2.postMessage(1)
    return p
  } else {
    return new Promise(resolve => setTimeout(() => resolve(), 0))
  }
}
