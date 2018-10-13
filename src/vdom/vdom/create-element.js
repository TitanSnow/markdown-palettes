import _vnodeHandleThunkJs from '../vnode/handle-thunk.js'
import _vnodeIsWidgetJs from '../vnode/is-widget.js'
import _vnodeIsVtextJs from '../vnode/is-vtext.js'
import _vnodeIsVnodeJs from '../vnode/is-vnode.js'
import _applyProperties from './apply-properties'
import _globalDocument from 'global/document'
var module = {
  exports: {},
}
var exports = module.exports
var document = _globalDocument
var applyProperties = _applyProperties
var isVNode = _vnodeIsVnodeJs
var isVText = _vnodeIsVtextJs
var isWidget = _vnodeIsWidgetJs
var handleThunk = _vnodeHandleThunkJs
module.exports = createElement

function createElement(vnode, opts) {
  var doc = opts ? opts.document || document : document
  var warn = opts ? opts.warn : null
  vnode = handleThunk(vnode).a

  if (isWidget(vnode)) {
    return vnode.init()
  } else if (isVText(vnode)) {
    return doc.createTextNode(vnode.text)
  } else if (!isVNode(vnode)) {
    if (warn) {
      warn('Item is not a valid virtual dom node', vnode)
    }

    return null
  }

  var node =
    vnode.namespace === null
      ? doc.createElement(vnode.tagName)
      : doc.createElementNS(vnode.namespace, vnode.tagName)
  var props = vnode.properties
  applyProperties(node, props)
  var children = vnode.children

  for (var i = 0; i < children.length; i++) {
    var childNode = createElement(children[i], opts)

    if (childNode) {
      node.appendChild(childNode)
    }
  }

  return node
}

export default module.exports
