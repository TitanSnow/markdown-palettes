import unified from 'unified'
import remarkParse from 'remark-parse'
import remarkVdom from 'remark-vdom'

const parser = unified().use(remarkParse)
const renderer = unified().use(remarkVdom)

export async function parse(content) {
  return parser.parse(content)
}

export async function render(parsed) {
  return renderer.stringify(parsed)
}
