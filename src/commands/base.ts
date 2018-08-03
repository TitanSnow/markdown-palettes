import { getText } from '../utils/i18n'

declare function getText(text: string, langs?: string[]): string

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
        const scope = match![1]
        const keysStr = match![2]
        const keys = keysStr.split('-')
        return new KeyBinding(scope as KeyBindingScope, keys.slice(0, -1) as ModifierKey[], keys.slice(-1)[0])
    }
}

export function key (literals: TemplateStringsArray, ...args: any[]) {
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
    abstract icon: string
    abstract title: string
    keyBinding: KeyBinding | void = void 0
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
