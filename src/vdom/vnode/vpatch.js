import _version from './version'
var module = {
  exports: {},
}
var exports = module.exports
var version = _version
VirtualPatch.NONE = 0
VirtualPatch.VTEXT = 1
VirtualPatch.VNODE = 2
VirtualPatch.WIDGET = 3
VirtualPatch.PROPS = 4
VirtualPatch.ORDER = 5
VirtualPatch.INSERT = 6
VirtualPatch.REMOVE = 7
VirtualPatch.THUNK = 8
module.exports = VirtualPatch

function VirtualPatch(type, vNode, patch) {
  const that = Object.create(null)
  that.version = version
  that.type = 'VirtualPatch'

  that.type = Number(type)
  that.vNode = vNode
  that.patch = patch

  return that
}

export default module.exports
