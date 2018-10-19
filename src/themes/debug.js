import { css } from './emotion'
import base from './base'

export default css`
  ${base};
  div {
    outline: 1px solid lightgray;
  }

  .editor-view {
    .md-heading[data-depth='1'] {
      color: red;
    }
    .md-heading[data-depth='2'] {
      color: orangered;
    }
    .md-heading[data-depth='3'] {
      color: orange;
    }
    .md-heading[data-depth='4'] {
      color: green;
    }
    .md-heading[data-depth='5'] {
      color: blue;
    }
    .md-heading[data-depth='6'] {
      color: purple;
    }
  }
`

export const name = 'debug'
