import { parse, render } from '../../utils/md'
import CancellablePromise from '../../utils/cancellablePromise'

export default {
  namespaced: true,
  state: () => ({
    parsed: null,
    rendered: null,
    renderSession: null,
  }),
  mutations: {
    setParsed(state, parsed) {
      state.parsed = parsed
    },
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
      const session = new CancellablePromise((resolve, reject, onCancel) => {
        let currentPromise = parse(rootState.editor.value).then(parsed => {
          commit('setParsed', parsed)
          currentPromise = render(parsed).then(rendered => {
            commit('setRendered', rendered)
            resolve()
          })
        })
        onCancel(() => currentPromise.cancel())
      })
      commit('newRenderSession', session)
      return session
    },
  },
}
