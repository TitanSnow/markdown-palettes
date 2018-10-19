import unified from 'unified'
import remarkParser from 'remark-parse'
import remarkVdom from './remark-vdom'
import DiffMatchPatch from 'diff-match-patch'
import diff from '../vdom/diff'
import VNode from '../vdom/vnode/vnode'
import VText from '../vdom/vnode/vtext'
import fromPairs from 'lodash.frompairs'

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
    const table = ['strong', 'emphasis', ['heading', 'depth'], 'link', 'image']
    const list = table.map(item => (Array.isArray(item) ? item[0] : item))
    const src = this.source
    const createNode = (tag, attrs, start, end) => ({
      tag,
      attrs,
      start,
      end,
      children: [],
    })
    const root = createNode('div', {}, 0, src.length)
    let cur = root
    const visit = node => {
      const { type, children = [] } = node
      const hit = list.includes(type)
      let bk
      if (hit) {
        const {
          position: {
            start: { offset: start },
            end: { offset: end },
          },
        } = node
        const tableItem = table[list.indexOf(type)]
        const keepKeys = Array.isArray(tableItem) ? tableItem.slice(1) : []
        cur = (bk = cur).children[
          cur.children.push(
            createNode(
              'span',
              {
                className: 'md-' + type,
                dataset: fromPairs(keepKeys.map(k => [k, node[k]])),
              },
              start,
              end
            )
          ) - 1
        ]
      }
      for (const child of children) visit(child)
      if (hit) {
        cur = bk
      }
    }
    visit(ast)
    const build = node => {
      const { tag, attrs, children } = node
      return new VNode(tag, attrs, [
        ...children.flatMap((child, idx) => {
          const elem = build(child)
          const preText = new VText(
            src.slice(
              idx === 0 ? node.start : children[idx - 1].end,
              child.start
            )
          )
          return [preText, elem]
        }),
        new VText(
          children.length
            ? src.slice(children[children.length - 1].end, node.end)
            : src.slice(node.start, node.end)
        ),
      ])
    }
    return build(root)
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
