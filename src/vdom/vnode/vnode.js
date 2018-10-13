import _isVhook from './is-vhook'
import _isThunk from './is-thunk'
import _isWidget from './is-widget'
import _isVnode from './is-vnode'
import _version from './version'
var module = {
  exports: {},
}
var exports = module.exports
var version = _version
var isVNode = _isVnode
var isWidget = _isWidget
var isThunk = _isThunk
var isVHook = _isVhook
module.exports = VirtualNode
var noProperties = {}
var noChildren = []

function VirtualNode(tagName, properties, children, key, namespace) {
  const that = Object.create(null)
  that.version = version
  that.type = 'VirtualNode'

  that.tagName = tagName
  that.properties = properties || noProperties
  that.children = children || noChildren
  that.key = key != null ? String(key) : undefined
  that.namespace = typeof namespace === 'string' ? namespace : null
  var count = (children && children.length) || 0
  var descendants = 0
  var hasWidgets = false
  var hasThunks = false
  var descendantHooks = false
  var hooks

  for (var propName in properties) {
    if (properties.hasOwnProperty(propName)) {
      var property = properties[propName]

      if (isVHook(property) && property.unhook) {
        if (!hooks) {
          hooks = {}
        }

        hooks[propName] = property
      }
    }
  }

  for (var i = 0; i < count; i++) {
    var child = children[i]

    if (isVNode(child)) {
      descendants += child.count || 0

      if (!hasWidgets && child.hasWidgets) {
        hasWidgets = true
      }

      if (!hasThunks && child.hasThunks) {
        hasThunks = true
      }

      if (!descendantHooks && (child.hooks || child.descendantHooks)) {
        descendantHooks = true
      }
    } else if (!hasWidgets && isWidget(child)) {
      if (typeof child.destroy === 'function') {
        hasWidgets = true
      }
    } else if (!hasThunks && isThunk(child)) {
      hasThunks = true
    }
  }

  that.count = count + descendants
  that.hasWidgets = hasWidgets
  that.hasThunks = hasThunks
  that.hooks = hooks
  that.descendantHooks = descendantHooks

  return that
}

export default module.exports
