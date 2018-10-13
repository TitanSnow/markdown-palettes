import EventEmitter from 'events'
import DiffMatchPatch from 'diff-match-patch'
import diff from '../vdom/diff'
import VNode from '../vdom/vnode/vnode'
import VText from '../vdom/vnode/vtext'
import unified from 'unified'
import remarkParser from 'remark-parse'
import remarkVdom from './remark-vdom'

const dmp = new DiffMatchPatch()

const parser = unified().use(remarkParser)
const renderer = unified().use(remarkVdom)

export default class BaseServer extends EventEmitter {
  constructor() {
    super()

    this.source = ''
    this.session = null
    this.highlightTree = this.getInitialHighlightTree()
    this.previewTree = this.getInitialPreviewTree()

    this.on('change', async function(patches) {
      // update this.source from patches
      this.source = dmp.patch_apply(patches, this.source)[0]
      // start new session
      const session = (this.session = Symbol())
      await Promise.resolve()
      this.run(session)
    })
  }

  async run(session) {
    // parse
    if (session !== this.session) return
    const ast = await this.parse(this.source)
    if (session !== this.session) return
    this.emit('didParse', ast)
    await this.nextTick()
    // highlight
    if (session !== this.session) return
    const highlightPatches = await this.diffHighlight(ast)
    if (session !== this.session) return
    this.emit('didDiffHighlight', highlightPatches)
    await this.nextTick()
    // preview
    if (session !== this.session) return
    const previewPatches = await this.diffPreview(ast)
    if (session !== this.session) return
    this.emit('didDiffPreview', previewPatches)
  }

  getInitialHighlightTree() {
    return new VNode('div', {}, [])
  }

  getInitialPreviewTree() {
    return new VNode('div', {}, [])
  }

  async diffHighlight(ast) {
    const newTree = await this.renderHighlight(ast)
    const patches = await this.vdomDiff(this.highlightTree, newTree)
    this.highlightTree = newTree
    return patches
  }

  async diffPreview(ast) {
    const newTree = await this.renderPreview(ast)
    const patches = await this.vdomDiff(this.previewTree, newTree)
    this.previewTree = newTree
    return patches
  }

  async vdomDiff(oldTree, newTree) {
    return diff(oldTree, newTree)
  }

  async parse(src) {
    return parser.parse(src)
  }

  async renderPreview(ast) {
    return new VNode('div', {}, [renderer.stringify(ast)])
  }

  async renderHighlight(ast) {
    return new VNode('div', {}, [new VText(this.source), new VText('\n')])
  }
}
