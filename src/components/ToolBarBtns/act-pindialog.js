export default {
    name: 'pinDialog',
    type: 'action',
    icon: 'fa-thumbtack',
    title: '固定对话框',
    action () {
        this.$refs.dialog.togglePin()
    },
    keyBinding: 'global://Ctrl-L'
}
