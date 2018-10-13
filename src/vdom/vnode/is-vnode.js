import _version from './version'
var module = {
  exports: {},
}
var exports = module.exports
var version = _version
module.exports = isVirtualNode

function isVirtualNode(x) {
  return x && x.type === 'VirtualNode' && x.version === version
}

export default module.exports
