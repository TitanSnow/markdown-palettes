import _flatten from 'lodash/flatten'
import _fromPairs from 'lodash/fromPairs'

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    })
  } else {
    obj[key] = value
  }
  return obj
}

export const voidTag = '#void'
export class Node {
  constructor(tagName, attrs = {}, parent = null, ...children) {
    var _Object$entries$filte

    this.tagName = tagName
    this.attrs = ((_Object$entries$filte = Object.entries(attrs).filter(
      ([key, value]) => key !== '__html'
    )),
    _fromPairs(_Object$entries$filte))
    this.innerHTML = attrs.__html
    this.parent = parent
    this.children = children
  }

  renderInnerVDOM(h) {
    var _this$children$map

    return (
      (_this$children$map = this.children.map(
        child =>
          typeof child === 'string'
            ? child
            : Node.prototype.renderToVDOM.call(child, h)
      )),
      _flatten(_this$children$map)
    )
  }

  renderToVDOM(h) {
    if (this.tagName === voidTag) {
      if (this.innerHTML != null) {
        throw new Error('`void` tag cannot contain innerHTML')
      }

      return Node.prototype.renderInnerVDOM.call(this, h)
    } else {
      return h(
        this.tagName,
        this.attrs,
        this.innerHTML,
        Node.prototype.renderInnerVDOM.call(this, h)
      )
    }
  }
}

export default class StreamDom {
  constructor() {
    _defineProperty(this, 'currentNode', new Node(voidTag))

    _defineProperty(this, 'xhtmlOut', false)
  }

  openTag(tagName, attrs) {
    const newNode = new Node(tagName, attrs, this.currentNode)
    this.currentNode.children.push(newNode)
    this.currentNode = newNode
  }

  closeTag() {
    this.currentNode = this.currentNode.parent
  }

  appendText(text) {
    this.currentNode.children.push(text)
  }
}
