import editor from './modules/editor'
import theme from './modules/theme'
import sides from './modules/sides'
import preview from './modules/preview'

export default {
  modules: {
    editor,
    theme,
    sides,
    preview,
  },
  actions: {
    updateValue({ commit, dispatch }, value) {
      commit('editor/setValue', value)
      return dispatch('preview/updatePreview', { source: value })
    },
  },
}
