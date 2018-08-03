import { getText } from '../utils/i18n'
import CodeMirror from 'codemirror'

declare function getText(text: string, langs?: string[]): string

export enum ModifierKey {
    Shift = 'Shift',
    Cmd = 'Cmd',
    Ctrl = 'Ctrl',
    Alt = 'Alt'
}

export enum KeyBindingScope {
    editor = 'editor',
    global = 'global'
}

export type PrimaryKey = string

function firstLetterUpperCase (word: string) {
    if (word) {
        return word[0].toUpperCase() + word.substr(1).toLowerCase()
    } else return ''
}

export class KeyBinding {
    constructor (
        public scope: KeyBindingScope,
        public modifierKeys: Set<ModifierKey>,
        public primaryKey: PrimaryKey
    ) {}
    static parse (keyBindingStr: string) {
        const match = /^(.+):\/\/(.+)$/.exec(keyBindingStr)
        const scope = match![1]
        const keysStr = KeyBinding.normalizeKeyName(match![2])
        const keys = keysStr.split('-')
        return new KeyBinding(
            KeyBindingScope[scope as keyof typeof KeyBindingScope],
            new Set(keys.slice(0, -1).map(modifier => ModifierKey[modifier as keyof typeof ModifierKey])),
            firstLetterUpperCase(keys.slice(-1)[0])
        )
    }
    static normalizeKeyName (keyname: string): string {
        return Object.keys(CodeMirror.normalizeKeyMap({ [keyname]: null }))[0]
    }
    stringify () {
        let result = ''
        if (this.modifierKeys.size) {
            result += [...this.modifierKeys.values()].join('-')
            result += '-'
        }
        result += this.primaryKey
        result = KeyBinding.normalizeKeyName(result)
        result = this.scope + '://' + result
        return result
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
