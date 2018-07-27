export default {
    name: 'tabSwitchRight',
    type: 'action',
    icon: 'fa-caret-square-right',
    title: '向右切换标签',
    action () {
        this.$refs.dialog.dialogTabSwitchTo(true, 1)
    },
    keyBinding: 'global://Alt-Right'
}
