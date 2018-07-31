import { default as MessageBox, MessageButton } from '../utils/MessageBox'
import { resolve } from 'uri-js';

export default {
    data () {
        return {
            messages: []
        }
    },
    methods: {
        createMessageButton (...args) {
            return new MessageButton(...args)
        },
        showMessageBox (...args) {
            const msb = new MessageBox(...args)
            this.messages.push(msb)
            return msb
        },
        closeMessageBox (msb) {
            const idx = this.messages.indexOf(msb)
            if (idx !== -1) {
                this.messages.splice(idx, 1)
                return true
            } else return false
        },
        showStandardMessageBox (text, title, icon) {
            return new Promise((resolve, reject) => {
                let msb
                const stdBtns = [this.createMessageButton('close', 'fa-times', '清除通知', () => {
                    this.closeMessageBox(msb)
                    reject('close')
                })]
                msb = this.showMessageBox(text, title, icon, stdBtns, () => {
                    this.closeMessageBox(msb)
                    resolve()
                })
                window.setTimeout(() => {
                    if (this.closeMessageBox(msb)) reject('timeout')
                }, 30 * 1000)
            })
        }
    }
}
