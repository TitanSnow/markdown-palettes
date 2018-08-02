import { Command } from './base.ts'
import _ from 'lodash'
const req = require.context('.', false, /\.[jt]sx?$/)
function issubclass (sub, par) {
    if (typeof sub !== 'function') return false
    let cur = sub
    while (cur !== null) {
        if (cur === par) return true
        cur = Object.getPrototypeOf(cur)
    }
    return false
}
const commands = req
    .keys()
    .map(req)
    .filter(({ default: exp }) => issubclass(exp, Command))
    .map(({ default: exp }) => exp)
export default commands
export function getCommand (command, context) {
    if (typeof command === 'string') {
        command = _.find(commands, cmd => cmd.name === command)
    }
    if (typeof command === 'function') {
        command = new command(context)
    }
    return command
}
