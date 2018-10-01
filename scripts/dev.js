import { spawn } from 'child_process'

const watch = spawn('babel-node scripts/watch.js', {stdio: ['inherit', 'pipe', 'inherit'], windowsHide: true, shell: true})
let parcel
watch.stdout.on('data', chunk => {
  if (chunk.toString().startsWith('Initial processing finished')) {
    parcel = spawn('parcel demo/index.html --no-autoinstall', {stdio: 'inherit', windowsHide: true, shell: true})
  }
  process.stdout.write(chunk)
})

process.on('exit', () => {
  watch.kill('SIGINT')
  if (parcel) parcel.kill('SIGINT')
})
