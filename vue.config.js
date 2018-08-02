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
            globalObject: `(typeof self !== 'undefined' ? self : this)`,
            libraryExport: 'default'
        },
        resolve: {
            alias: {
                'css-tree': '@tttnns/undefined'
            },
            extensions: ['.wasm', '.mjs', '.js', '.ts', '.json']
        },
        module: {
            rules: [
                {
                    test: /\.md$/,
                    use: [
                        {
                            loader: 'url-loader'
                        }
                    ]
                },
                {
                    test: /\.tsx?$/,
                    use: [
                        {
                            loader: 'babel-loader'
                        }
                    ]
                }
            ]
        }
    },
    productionSourceMap: false
}
