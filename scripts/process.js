import { readFile, writeFile } from 'fs'
import { promisify } from 'util'
import { extname, dirname } from 'path'
import mkdirp from 'mkdirp'
import rimraf from 'rimraf'
import glob from 'glob'
import * as transform from './transform'

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)
const mkdirpAsync = promisify(mkdirp)
const rimrafAsync = promisify(rimraf)
const globAsync = promisify(glob)

export async function process(filename) {
  const ext = extname(filename).slice(1)
  if (ext in transform) {
    console.log('Processing: ' + filename)
    const content = await readFileAsync('src/' + filename, {encoding: 'utf8'})
    const { filename: newFilename, content: newContent } = await transform[ext](filename, content)
    await mkdirpAsync('esm/' + dirname(newFilename))
    await writeFileAsync('esm/' + newFilename, newContent)
  } else {
    throw new Error('Unknown file type: ' + filename)
  }
}

async function getFiles() {
  return (await globAsync('src/**', { nodir: true })).map(fn => fn.slice(4))
}

export async function processAll() {
  try {
    await rimrafAsync('esm')
  } catch {}
  return await Promise.all((await getFiles()).map(fn => process(fn)))
}
