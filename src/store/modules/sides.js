export default {
  namespaced: true,
  state: () => ({
    allocation: 0.5,
  }),
  getters: {
    leftSizeCSS: state => state.allocation * 100 + '%',
    rightSizeCSS: state => (1 - state.allocation) * 100 + '%',
  },
}
