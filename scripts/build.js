import { cp, ls, rm, config as shellJsConfig } from 'shelljs'
import { readFileSync, writeFileSync } from 'fs'
import { spawnSync } from 'child_process'
import transformSFC from './transformSFC'

rm('-r', 'temp')
rm('-r', 'esm')
shellJsConfig.fatal = true
cp('-r', 'src', 'temp')
ls('temp/**/*.vue').forEach(filename => {
  console.log(`Processing ${filename}`)
  writeFileSync(`${filename.slice(0, -3)}js` ,transformSFC(readFileSync(filename, {encoding: 'utf8'})))
})
console.log('Running babel')
spawnSync('cross-env', 'BABEL_ENV=browser babel temp -d esm'.split(' '), { stdio: 'inherit', windowsHide: true })
rm('-r', 'temp')
