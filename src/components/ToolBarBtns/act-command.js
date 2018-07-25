export default {
    name: 'command',
    icon: 'fa-terminal',
    title: '打开命令面板',
    type: 'action',
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
                        .map(({ name, title }) => ({ name: this.ensureValue(name), title: this.ensureValue(title) }))
                        .filter(({ name, title }) => name && title)
                        .map(({ name, title }) => ({
                            value: name, title
                        }))
                }
            }],
            callback: (data) => {
                this.execCommand(data.command)
            }
        })
    },
    keyBinding: 'Ctrl-Q'
}
