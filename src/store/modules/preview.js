import render from '../../utils/md'

export default {
  namespaced: true,
  state: () => ({
    parsed: null,
    rendered: null,
    renderSession: null,
  }),
  mutations: {
    finishRenderSession(state, { parsed, rendered }) {
      state.parsed = parsed
      state.rendered = rendered
      state.renderSession = null
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
        result => void commit('finishRenderSession', result)
      )
    },
  },
}
