import _version from './version'
var module = {
  exports: {},
}
var exports = module.exports
var version = _version
module.exports = isVirtualText

function isVirtualText(x) {
  return x && x.type === 'VirtualText' && x.version === version
}

export default module.exports
