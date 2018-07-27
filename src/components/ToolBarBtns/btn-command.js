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
                title: '输入命令',
                param: {
                    options: this.toolbarConfig
                        .filter(({ name, title }) => name && title)
                        .map(({ name, title, icon }) => ({
                            value: this.ensureValue(name),
                            title: this.ensureValue(title),
                            icon: this.ensureValue(icon)
                        }))
                        .filter(({ value, title }) => value && title),
                    autoopen: true
                }
            }],
            callback: (data) => {
                this.$nextTick(() => void this.execCommand(data.command))
            }
        })
    },
    keyBinding: 'global://Shift-Ctrl-P'
}
