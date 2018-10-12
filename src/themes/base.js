import { css } from './emotion'

export default css`
  display: flex;
  flex-direction: column;

  .toolbar {
    flex-grow: 0;
  }

  .split {
    display: flex;
    flex-grow: 99;
  }
  .split-item {
    display: flex;
    > * {
      width: 100%;
    }
  }

  .editor {
    position: relative;
  }
  .editor-input {
    color: transparent;
    background: transparent;
    caret-color: black;
    resize: none;
    ::selection {
      color: transparent;
      background: rgba(0, 0, 0, 0.3);
    }
  }
  .editor-input,
  .editor-view {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    border: none;
    font: inherit;
    font-family: monospace;
    appearance: none;
    display: block;
    white-space: pre;
    overflow-wrap: normal;
    direction: inherit;
    unicode-bidi: inherit;
    overflow: auto;
  }
  .editor-view {
    .heading {
      font-weight: bold;
      color: blue;
    }
    .link {
      color: rgb(0, 0, 238);
      color: -webkit-link;
      text-decoration: underline;
    }
    .image {
      color: green;
    }
  }
`

export const name = 'base'
