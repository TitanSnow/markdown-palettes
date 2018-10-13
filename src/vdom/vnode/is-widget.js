var module = {
  exports: {},
}
var exports = module.exports
module.exports = isWidget

function isWidget(w) {
  return w && w.type === 'Widget'
}

export default module.exports
