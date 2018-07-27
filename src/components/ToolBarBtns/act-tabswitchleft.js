export default {
    name: 'tabSwitchLeft',
    type: 'action',
    icon: 'fa-caret-square-left',
    title: '向左切换标签',
    action () {
        this.$refs.dialog.dialogTabSwitchTo(true, -1)
    },
    keyBinding: 'global://Alt-Left'
}
