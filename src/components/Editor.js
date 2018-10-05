import Base from './Base'

export default {
  name: 'Editor',
  extends: Base,
  created() {
    const h = this.$createElement
    this.editorInput = h('textarea', {
      staticClass: 'editor-input',
      on: {
        input: ({ target: { value } }) => void (this.s.source = value),
      },
      domProps: {
        value: this.s.source,
      },
    })
  },
  render(h) {
    return h('div', { staticClass: 'editor' }, [
      this.createViewElement(),
      this.editorInput,
    ])
  },
  methods: {
    createViewElement() {
      const h = this.$createElement
      const src = this.s.source
      const parsed = this.s.ast
      let cds = []
      if (parsed) {
        const root = {
          type: 'void',
          start: 0,
          end: src.length,
          children: [],
          parent: {
            start: 0,
            end: src.length,
          },
        }
        root.parent.children = [root]
        let currentNode = root
        const dfs = node => {
          const {
            type,
            position: {
              start: { offset: start },
              end: { offset: end },
            },
            children = [],
          } = node
          let hit = false
          switch (type) {
            case 'strong':
            case 'emphasis':
              hit = true
              break
          }
          if (hit) {
            currentNode =
              currentNode.children[
                currentNode.children.push({
                  type,
                  start,
                  end,
                  children: [],
                  parent: currentNode,
                }) - 1
              ]
          }
          for (const child of children) dfs(child)
          if (hit) {
            currentNode = currentNode.parent
          }
        }
        dfs(parsed)
        const dfsCreateElem = node => {
          const { type, start, end, children, parent } = node
          const idx = parent.children.indexOf(node)
          const lastOffset =
            idx === 0 ? parent.start : parent.children[idx - 1].end
          let tag
          switch (type) {
            case 'void':
              tag = 'template'
              break
            case 'strong':
              tag = 'strong'
              break
            case 'emphasis':
              tag = 'em'
              break
          }
          const cds = [
            ...children.map(dfsCreateElem).flat(),
            src.slice(
              children.length ? children[children.length - 1].end : start,
              end
            ),
          ]
          const r = [src.slice(lastOffset, start)]
          if (tag === 'template') r.push(...cds)
          else r.push(h(tag, {}, cds))
          return r
        }
        cds = [dfsCreateElem(root)]
      }
      return h('pre', { staticClass: 'editor-view' }, cds)
    },
  },
}
