var module = {
  exports: {},
}
var exports = module.exports
module.exports = isThunk

function isThunk(t) {
  return t && t.type === 'Thunk'
}

export default module.exports
