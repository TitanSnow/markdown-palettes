export class MessageButton {
    constructor (name, icon, title, callback) {
        this.name = name
        this.icon = icon
        this.title = title
        this.callback = callback
    }
}

export default class MessageBox {
    constructor (text, title, icon, buttons, callback) {
        this.symbol = Symbol()
        this.text = text
        this.title = title
        this.icon = icon
        this.buttons = buttons
        this.callback = callback
    }
}
