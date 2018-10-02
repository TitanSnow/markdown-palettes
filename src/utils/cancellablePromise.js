export default class CancellablePromise extends Promise {
  constructor(callback) {
    let handler = () => {}
    const onCancel = f => void (handler = f)
    super((resolve, reject) => callback(resolve, reject, onCancel))
    this.cancel = () => void handler()
  }
}
