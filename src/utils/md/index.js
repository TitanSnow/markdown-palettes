import unified from 'unified'
import remarkParse from 'remark-parse'
import remarkHtml from 'remark-html'

const parser = unified().use(remarkParse)
const renderer = unified().use(remarkHtml)

function parse(content) {
  return {
    promise: Promise.resolve(parser.parse(content)),
    cancel: () => {},
  }
}

function render(parsed) {
  return {
    promise: Promise.resolve(renderer.stringify(parsed)),
    cancel: () => {},
  }
}

export default content => {
  let currentSession
  return {
    promise: (async function() {
      currentSession = parse(content)
      const parsed = await currentSession.promise
      currentSession = render(parsed)
      const rendered = await currentSession.promise
      currentSession = null
      return {
        parsed,
        rendered,
      }
    })(),
    cancel: () => void (currentSession && currentSession.cancel()),
  }
}
