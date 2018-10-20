import '..'

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('mp').renderPort = new Worker('./worker.js')
})
