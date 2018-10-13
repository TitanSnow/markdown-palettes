'use strict'

import _hooksAttributeHook from './hooks/attribute-hook'
import _svgAttributeNamespace from './svg-attribute-namespace'
import _indexJs from './index.js'
import _xIsArray from 'x-is-array'
var module = {
  exports: {},
}
var exports = module.exports
var isArray = _xIsArray
var h = _indexJs
var SVGAttributeNamespace = _svgAttributeNamespace
var attributeHook = _hooksAttributeHook
var SVG_NAMESPACE = 'http://www.w3.org/2000/svg'
module.exports = svg

function svg(tagName, properties, children) {
  if (!children && isChildren(properties)) {
    children = properties
    properties = {}
  }

  properties = properties || {} // set namespace for svg

  properties.namespace = SVG_NAMESPACE
  var attributes = properties.attributes || (properties.attributes = {})

  for (var key in properties) {
    if (!properties.hasOwnProperty(key)) {
      continue
    }

    var namespace = SVGAttributeNamespace(key)

    if (namespace === undefined) {
      // not a svg attribute
      continue
    }

    var value = properties[key]

    if (
      typeof value !== 'string' &&
      typeof value !== 'number' &&
      typeof value !== 'boolean'
    ) {
      continue
    }

    if (namespace !== null) {
      // namespaced attribute
      properties[key] = attributeHook(namespace, value)
      continue
    }

    attributes[key] = value
    properties[key] = undefined
  }

  return h(tagName, properties, children)
}

function isChildren(x) {
  return typeof x === 'string' || isArray(x)
}

export default module.exports
