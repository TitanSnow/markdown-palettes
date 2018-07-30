export default {
    name: 'command',
    icon: 'fa-terminal',
    title: '打开命令面板',
    action () {
        this.openDialog({
            title: '命令面板',
            body: [{
                name: 'command',
                type: 'dialog-select',
                param: {
                    options: this.toolbarConfig
                        .filter(({ name, title }) => name && title)
                        .map(({ name, title, icon }) => ({
                            value: this.ensureValue(name),
                            title: this.ensureValue(title),
                            icon: this.ensureValue(icon)
                        }))
                        .filter(({ value, title }) => value && title),
                    autoopen: true,
                    placeholder: '输入命令…'
                }
            }],
            callback: (data) => {
                this.$nextTick(() => void this.execCommand(data.command))
            }
        })
    },
    keyBinding: 'global://Shift-Ctrl-P'
}
