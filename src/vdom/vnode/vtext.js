import _version from './version'
var module = {
  exports: {},
}
var exports = module.exports
var version = _version
module.exports = VirtualText

function VirtualText(text) {
  const that = Object.create(null)
  that.version = version
  that.type = 'VirtualText'

  that.text = String(text)

  return that
}

export default module.exports
