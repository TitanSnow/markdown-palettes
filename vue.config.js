module.exports = {
    pages: {
        index: {
            entry: 'src/main.js',
            template: 'index.html',
            filename: 'index.html'
        }
    },
    configureWebpack: {
        output: {
            libraryExport: 'default'
        }
    },
    productionSourceMap: false
}