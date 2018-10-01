import {
  name as defaultThemeName,
  className as defaultThemeClassName,
} from '../../themes'

export default {
  namespaced: true,
  state: () => ({
    className: defaultThemeClassName,
    name: defaultThemeName,
  }),
}
