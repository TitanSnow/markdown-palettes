import MarkdownIt from 'markdown-it'
import MarkdownItV from './markdown-it-v'

onmessage = ({ data }) => {
  const md = MarkdownIt().use(MarkdownItV)
  const rendered = md.render(data)
  postMessage(rendered.currentNode)
}
