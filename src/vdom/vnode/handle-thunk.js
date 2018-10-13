import _isThunk from './is-thunk'
import _isWidget from './is-widget'
import _isVtext from './is-vtext'
import _isVnode from './is-vnode'
var module = {
  exports: {},
}
var exports = module.exports
var isVNode = _isVnode
var isVText = _isVtext
var isWidget = _isWidget
var isThunk = _isThunk
module.exports = handleThunk

function handleThunk(a, b) {
  var renderedA = a
  var renderedB = b

  if (isThunk(b)) {
    renderedB = renderThunk(b, a)
  }

  if (isThunk(a)) {
    renderedA = renderThunk(a, null)
  }

  return {
    a: renderedA,
    b: renderedB,
  }
}

function renderThunk(thunk, previous) {
  var renderedThunk = thunk.vnode

  if (!renderedThunk) {
    renderedThunk = thunk.vnode = thunk.render(previous)
  }

  if (
    !(
      isVNode(renderedThunk) ||
      isVText(renderedThunk) ||
      isWidget(renderedThunk)
    )
  ) {
    throw new Error('thunk did not return a valid node')
  }

  return renderedThunk
}

export default module.exports
