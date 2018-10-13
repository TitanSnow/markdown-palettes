import _vnodeIsWidgetJs from '../vnode/is-widget.js'
var module = {
  exports: {},
}
var exports = module.exports
var isWidget = _vnodeIsWidgetJs
module.exports = updateWidget

function updateWidget(a, b) {
  if (isWidget(a) && isWidget(b)) {
    if ('name' in a && 'name' in b) {
      return a.id === b.id
    } else {
      return a.init === b.init
    }
  }

  return false
}

export default module.exports
