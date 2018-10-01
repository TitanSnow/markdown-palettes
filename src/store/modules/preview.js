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
    newRenderSession(state, session) {
      if (state.renderSession) state.renderSession.cancel()
      state.renderSession = session
    },
  },
  actions: {
    render({ commit, rootState }) {
      const session = render(rootState.editor.value)
      commit('newRenderSession', session)
      return session.promise.then(
        rendered => (commit('setRendered', rendered), void 0)
      )
    },
  },
}
