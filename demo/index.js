import '..'

addEventListener('DOMContentLoaded', () => {
  document.getElementById('mp').renderServer = new Worker('./worker.js')
})
