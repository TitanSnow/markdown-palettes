import render from '../../utils/render'

export default {
  namespaced: true,
  state: () => ({
    source: '',
    rendered: null,
    renderSession: null,
  }),
  mutations: {
    setSource(state, source) {
      state.source = source
    },
    setRendered(state, rendered) {
      state.rendered = rendered
    },
    newRenderSession(state, session) {
      state.renderSession = session
    },
  },
  actions: {
    async render({ commit, state }) {
      const session = Symbol()
      commit('newRenderSession', session)
      const rendered = await render(state.source)
      if (state.renderSession === session) commit('setRendered', rendered)
    },
    updatePreview({ dispatch, commit }, { source }) {
      commit('setSource', source)
      return dispatch('render')
    },
  },
}
