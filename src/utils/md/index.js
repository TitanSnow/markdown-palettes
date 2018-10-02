import unified from 'unified'
import remarkParse from 'remark-parse'
import remarkHtml from 'remark-html'
import CancellablePromise from '../cancellablePromise'

const parser = unified().use(remarkParse)
const renderer = unified().use(remarkHtml)

export function parse(content) {
  return CancellablePromise.resolve(parser.parse(content))
}

export function render(parsed) {
  return CancellablePromise.resolve(renderer.stringify(parsed))
}
