export default {
    name: 'focusEditor',
    type: 'action',
    icon: 'fa-crosshairs',
    title: '聚焦到输入区',
    action () {
        this.editor.focus()
    }
}
