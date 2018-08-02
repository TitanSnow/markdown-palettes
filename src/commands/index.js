import _ from 'lodash'
import Bold from './bold.ts'
const commands = [Bold]
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
