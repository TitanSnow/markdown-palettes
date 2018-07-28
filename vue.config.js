module.exports = {
    configureWebpack: {
        output: {
            globalObject: `(typeof self !== 'undefined' ? self : this)`,
            libraryExport: 'default'
        },
        resolve: {
            alias: {
                'css-tree': '@tttnns/undefined'
            }
        }
    },
    productionSourceMap: false
}
