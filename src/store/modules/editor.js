export default {
  namespaced: true,
  state: () => ({
    value: 'awd'
  }),
  mutations: {
    setValue(state, value) {
      state.value = value
    }
  }
}
