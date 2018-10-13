'use strict'

var module = {
  exports: {},
}
var exports = module.exports
module.exports = SoftSetHook

function SoftSetHook(value) {
  if (!(this instanceof SoftSetHook)) {
    return new SoftSetHook(value)
  }

  this.value = value
}

SoftSetHook.prototype.hook = function(node, propertyName) {
  if (node[propertyName] !== this.value) {
    node[propertyName] = this.value
  }
}

export default module.exports
