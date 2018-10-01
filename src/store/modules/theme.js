import defaultThemeClassName from '../../themes/default'

export default {
  namespaced: true,
  state: () => ({
    className: defaultThemeClassName,
    name: 'default',
  }),
}
