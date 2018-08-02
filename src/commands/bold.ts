import { ToolbarButton, key } from './base'

export default class Bold extends ToolbarButton {
    icon = 'fa fa-bold'
    title = '加粗'
    keyBinding = key`editor://Ctrl-B`
    action () {
        this.$.insertCode(['**', '**'])
    }
}
