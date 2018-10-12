import createEmotion from 'create-emotion'

export const container = document.createElement('div')

export const {
  flush,
  hydrate,
  cx,
  merge,
  getRegisteredStyles,
  injectGlobal,
  keyframes,
  css,
  sheet,
  caches,
} = createEmotion(
  {},
  {
    container,
  }
)
