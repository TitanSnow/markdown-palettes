import _vnodeVtextJs from './vnode/vtext.js'
import _vnodeVnodeJs from './vnode/vnode.js'
import _createElementJs from './create-element.js'
import _hJs from './h.js'
import _patchJs from './patch.js'
import _diffJs from './diff.js'
var module = {
  exports: {},
}
var exports = module.exports
var diff = _diffJs
var patch = _patchJs
var h = _hJs
var create = _createElementJs
var VNode = _vnodeVnodeJs
var VText = _vnodeVtextJs
module.exports = {
  diff: diff,
  patch: patch,
  h: h,
  create: create,
  VNode: VNode,
  VText: VText,
}
export default module.exports
