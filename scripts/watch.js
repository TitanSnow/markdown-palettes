import chokidar from 'chokidar'
import { process, processAll } from './process'

processAll().then(() => {
  console.log('Initial processing finished')
  chokidar
    .watch('src', { ignoreInitial: true })
    .on('all', (event, filename) => {
      switch (event) {
        case 'add':
        case 'change':
          setTimeout(() => process(filename.slice(4)), 50)
      }
    })
})
