import unified from 'unified'
import remarkParse from 'remark-parse'
import remarkHtml from 'remark-html'

const parser = unified().use(remarkParse)
const renderer = unified().use(remarkHtml)

export async function parse(content) {
  return parser.parse(content)
}

export async function render(parsed) {
  return renderer.stringify(parsed)
}
