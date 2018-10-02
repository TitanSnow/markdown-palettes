import { css } from 'emotion'

export default css`
  display: flex;
  flex-direction: column;

  .toolbar {
    flex-grow: 0;
  }

  .sides {
    display: flex;
    flex-grow: 99;
  }

  .editor {
    position: relative;
  }

  .editor-input {
    color: transparent;
    caret-color: black;
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
  }
`
