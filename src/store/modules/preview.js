import render from '../../utils/render'

export default {
  namespaced: true,
  state: () => ({
    rendered: null,
    renderSession: null,
  }),
  mutations: {
    setRendered(state, rendered) {
      state.rendered = rendered
    },
    startRenderSession(state, session) {
      state.renderSession = session
    },
  },
  actions: {
    async render({ commit, state, rootState }) {
      const session = Symbol()
      commit('startRenderSession', session)
      const rendered = await render(rootState.editor.value)
      if (state.renderSession === session) commit('setRendered', rendered)
    },
  },
}
