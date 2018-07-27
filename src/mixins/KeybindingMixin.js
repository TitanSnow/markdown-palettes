import Combokeys from 'combokeys'
import combokeysBindGlobal from 'combokeys/plugins/global-bind'

function flattenKeyMaps (maps) {
    const result = {}
    maps.forEach(([name, map]) => void Object.assign(result, map))
    Object.freeze(result)
    return result
}

export default {
    data () {
        return {
            globalKeyMaps: [],
            editorKeyMaps: [],
            keybindingGlobalRegister: null,
            keybindingLastCodeMirrorKeyMap: null
        }
    },
    mounted () {
        this.keybindingGlobalRegister = combokeysBindGlobal(new Combokeys(this.$el))
    },
    watch: {
        globalKeyMaps (maps, oldMaps) {
            const keymap = flattenKeyMaps(maps)
            const oldKeymap = flattenKeyMaps(oldMaps)
            Object.keys(oldKeymap).forEach(key => void this.keybindingGlobalRegister.unbind(key))
            Object.entries(keymap).forEach(([key, callback]) => {
                const processedKey = key.split('-').join('+').toLowerCase()
                this.keybindingGlobalRegister.bindGlobal(processedKey, e => {
                    e.preventDefault()
                    callback()
                })
            })
        },
        editorKeyMaps (maps) {
            const keymap = flattenKeyMaps(maps)
            const oldKeymap = this.keybindingLastCodeMirrorKeyMap
            if (oldKeymap != null) {
                this.editor.removeKeyMap(oldKeymap)
            }
            this.editor.addKeyMap(keymap)
            this.keybindingLastCodeMirrorKeyMap = keymap
        }
    }
}
