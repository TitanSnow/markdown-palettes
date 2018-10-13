'use strict'

import _nextTick from 'next-tick'
import _globalDocument from 'global/document'
var module = {
  exports: {},
}
var exports = module.exports
var document = _globalDocument
var nextTick = _nextTick
module.exports = MutableFocusHook

function MutableFocusHook() {
  if (!(this instanceof MutableFocusHook)) {
    return new MutableFocusHook()
  }
}

MutableFocusHook.prototype.hook = function(node) {
  nextTick(function() {
    if (document.activeElement !== node) {
      node.focus()
    }
  })
}

export default module.exports
