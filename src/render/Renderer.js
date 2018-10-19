import unified from 'unified'
import remarkParser from 'remark-parse'
import remarkVdom from './remark-vdom'
import DiffMatchPatch from 'diff-match-patch'
import diff from '../vdom/diff'
import VNode from '../vdom/vnode/vnode'
import VText from '../vdom/vnode/vtext'

const dmp = new DiffMatchPatch()
const parser = unified().use(remarkParser)
const vdomifier = unified().use(remarkVdom)

export default class Renderer {
  constructor(port) {
    this.source = ''
    this.hlTree = this.getInitialHlTree()
    this.pvTree = this.getInitialPvTree()
    ;(this.port = port).onmessage = this.onmessage.bind(this)
  }
  getInitialHlTree() {
    return new VNode('div', {}, [])
  }
  getInitialPvTree() {
    return new VNode('div', {}, [])
  }
  onmessage({ data: { event, data } }) {
    switch (event) {
      case 'change':
        this.source = dmp.patch_apply(data, this.source)[0]
        this.render()
        break
    }
  }
  parse(src) {
    return parser.parse(src)
  }
  diffTree(oldTree, newTree) {
    return diff(oldTree, newTree)
  }
  renderHlTree(ast) {
    return new VNode('div', {}, [new VText(this.source), new VText('\n')])
  }
  renderPvTree(ast) {
    return new VNode('div', {}, [vdomifier.stringify(ast)])
  }
  render() {
    const src = this.source
    const ast = this.parse(src)

    const newHlTree = this.renderHlTree(ast)
    const diffHl = this.diffTree(this.hlTree, newHlTree)
    this.hlTree = newHlTree
    this.port.postMessage({ event: 'diffHl', data: diffHl })

    const newPvTree = this.renderPvTree(ast)
    const diffPv = this.diffTree(this.pvTree, newPvTree)
    this.pvTree = newPvTree
    this.port.postMessage({ event: 'diffPv', data: diffPv })
  }
}
