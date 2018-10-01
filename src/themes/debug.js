import { css } from 'emotion'

export default css`
  display: flex;
  flex-direction: column;

  outline: 1px solid lightgray;

  .toolbar {
    flex-grow: 0;

    outline: 1px solid lightgray;
  }

  .sides {
    display: flex;
    flex-grow: 99;

    outline: 1px solid lightgray;
  }

  .editor {
    outline: 1px solid lightgray;
  }

  .preview {
    outline: 1px solid lightgray;
  }
`
