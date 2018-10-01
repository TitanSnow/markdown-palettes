export default {
  namespaced: true,
  state: () => ({
    value: '',
  }),
  mutations: {
    setValue(state, value) {
      state.value = value
    },
  },
}
