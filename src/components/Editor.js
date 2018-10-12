import Base from './Base'

export default {
  name: 'Editor',
  extends: Base,
  data: () => ({
    scrollLeft: 0,
    scrollTop: 0,
  }),
  created() {
    this.onScroll = ({ target: { scrollTop, scrollLeft } }) =>
      void ((this.scrollLeft = scrollLeft), (this.scrollTop = scrollTop))
    this.onInput = ({ target: { value } }) => void (this.s.source = value)
  },
  render(h) {
    return h('div', { staticClass: 'editor' }, [
      // this.EditorView,
      this.EditorInput,
    ])
  },
  computed: {
    EditorInput() {
      const h = this.$createElement
      return h('textarea', {
        staticClass: 'editor-input',
        on: {
          input: this.onInput,
          scroll: this.onScroll,
        },
        domProps: {
          value: this.s.source,
        },
      })
    },
    // EditorViewInner() {
    //   const h = this.$createElement
    //   const src = this.s.source
    //   const parsed = this.s.ast
    //   let cds = []
    //   if (parsed) {
    //     const root = {
    //       type: 'void',
    //       start: 0,
    //       end: src.length,
    //       children: [],
    //       parent: {
    //         start: 0,
    //         end: src.length,
    //       },
    //     }
    //     root.parent.children = [root]
    //     let currentNode = root
    //     const dfs = node => {
    //       const {
    //         type,
    //         position: {
    //           start: { offset: start },
    //           end: { offset: end },
    //         },
    //         children = [],
    //       } = node
    //       let hit = false
    //       switch (type) {
    //         case 'strong':
    //         case 'emphasis':
    //         case 'heading':
    //         case 'link':
    //         case 'image':
    //           hit = true
    //           break
    //       }
    //       if (hit) {
    //         currentNode =
    //           currentNode.children[
    //             currentNode.children.push({
    //               type,
    //               start,
    //               end,
    //               children: [],
    //               parent: currentNode,
    //               originalNode: node,
    //             }) - 1
    //           ]
    //       }
    //       for (const child of children) dfs(child)
    //       if (hit) {
    //         currentNode = currentNode.parent
    //       }
    //     }
    //     dfs(parsed)
    //     const dfsCreateElem = node => {
    //       const { type, start, end, children, parent, originalNode } = node
    //       const idx = parent.children.indexOf(node)
    //       const lastOffset =
    //         idx === 0 ? parent.start : parent.children[idx - 1].end
    //       let tag,
    //         props = {}
    //       switch (type) {
    //         case 'void':
    //           tag = 'template'
    //           break
    //         case 'strong':
    //           tag = 'strong'
    //           break
    //         case 'emphasis':
    //           tag = 'em'
    //           break
    //         case 'heading':
    //           tag = 'span'
    //           props = { staticClass: `heading heading-${originalNode.depth}` }
    //           break
    //         case 'link':
    //           tag = 'span'
    //           props = { staticClass: 'link' }
    //           break
    //         case 'image':
    //           tag = 'span'
    //           props = { staticClass: 'image' }
    //           break
    //       }
    //       const cds = [
    //         ...children.map(dfsCreateElem).flat(),
    //         src.slice(
    //           children.length ? children[children.length - 1].end : start,
    //           end
    //         ),
    //       ]
    //       const r = [src.slice(lastOffset, start)]
    //       if (tag === 'template') r.push(...cds)
    //       else r.push(h(tag, props, cds))
    //       return r
    //     }
    //     cds = [dfsCreateElem(root)]
    //   }
    //   cds.push('\n')
    //   return cds
    // },
    // EditorView() {
    //   const h = this.$createElement
    //   return h(
    //     'pre',
    //     {
    //       staticClass: 'editor-view',
    //       on: { scroll: this.onScroll },
    //       domProps: { scrollLeft: this.scrollLeft, scrollTop: this.scrollTop },
    //     },
    //     this.EditorViewInner
    //   )
    // },
  },
}
