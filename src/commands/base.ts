import { getText } from '../utils/i18n'

export enum ModifierKey {
    Ctrl = 'Ctrl',
    Alt = 'Alt'
}

export enum KeyBindingScope {
    editor = 'editor',
    global = 'global'
}

export type PrimaryKey = string

export class KeyBinding {
    constructor (
        public scope: KeyBindingScope,
        public modifierKeys: ModifierKey[],
        public primaryKey: PrimaryKey
    ) {}
    static parse (keyBindingStr: string) {
        const match = /^(.+):\/\/(.+)$/.exec(keyBindingStr)
        const scope = match[1]
        const keysStr = match[2]
        const keys = keysStr.split('-')
        return new KeyBinding(KeyBindingScope[scope], keys.slice(0, -1).map(key => ModifierKey[key]), keys.slice(-1)[0])
    }
}

export function key (literals, ...args) {
    let keyStr = ''
    literals.forEach((s, idx) => {
        keyStr += s
        if (idx < args.length) {
            keyStr += args[idx]
        }
    })
    return KeyBinding.parse(keyStr)
}

export abstract class Command {
    get name () {
        return this.constructor.name
    }
    icon: string
    title: string
    keyBinding: KeyBinding
    $: any
    get primaryTitle () {
        return getText(this.title)
    }
    get secondaryTitle () {
        return getText(this.title, ['en'])
    }
    abstract action(): void
    constructor (context: any) {
        this.$ = context
    }
}

export abstract class ToolbarButton extends Command {}

export abstract class Action extends Command {}
