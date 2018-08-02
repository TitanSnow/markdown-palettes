import _ from 'lodash'

const toolbarKeyMapName = Symbol('toolbar-default-key-map')

export default {
    methods: {
        toolbarAction (btn) {
            if (typeof btn.action === 'function') {
                btn.action()
            } else {
                this.toolbarHandleActionLegacy(btn.action)
            }
        },
        toolbarHandleActionLegacy (action) {
            if (action.event) {
                this.toolbarHandleEventLegacy(action.event)
            } else if (action.insert) {
                this.insertCode(action.insert)
            } else if (action.request) {
                this.requestData(action.request)
            }
        },
        toolbarHandleEventLegacy (event) {
            if (event === 'hide') {
                if (this.previewDisplay === 'normal') {
                    if (window.screen.width > 768) {
                        this.previewDisplay = 'hide'
                    } else {
                        this.previewDisplay = 'full'
                    }
                } else {
                    this.previewDisplay = 'normal'
                }
            }
            if (event === 'fullScreen') {
                this.fullScreen = !this.fullScreen
            }
            if (event === 'scrollSync') {
                this.scrollSync = !this.scrollSync
            }
        },
        toolbarUpdateKeyBindings () {
            const editorKeyMap = {}
            const globalKeyMap = {}
            for (const btn of this.commands) {
                const keyBinding = btn.keyBinding
                if (keyBinding != null) {
                    const callback = () => void this.toolbarAction(btn)
                    const match = /^(.+):\/\/(.+)$/.exec(keyBinding)
                    const protocol = match ? match[1] : 'editor'
                    const key = match ? match[2] : keyBinding
                    if (protocol === 'global') {
                        globalKeyMap[key] = callback
                    } else if (protocol === 'editor') {
                        editorKeyMap[key] = callback
                    }
                }
            }
            Object.freeze(editorKeyMap)
            Object.freeze(globalKeyMap)
            const updateKeyMaps = (keymaps, keymap) => {
                const idx = _.findIndex(keymaps, ([name]) => name === toolbarKeyMapName)
                if (idx === -1) {
                    keymaps.push([toolbarKeyMapName, keymap])
                } else {
                    this.$set(keymaps, idx, [toolbarKeyMapName, keymap])
                }
            }
            updateKeyMaps(this.globalKeyMaps, globalKeyMap)
            updateKeyMaps(this.editorKeyMaps, editorKeyMap)
        }
    },
    mounted () {
        this.toolbarUpdateKeyBindings()
    },
    watch: {
        commands () {
            this.toolbarUpdateKeyBindings()
        }
    }
}
