// import parsers
import MarkdownItV from 'markdown-it-v'
import MarkdownItVCodemirrorHighlighter from 'markdown-it-v-codemirror-highlighter/dist/browserIndex.common.js'
import MarkdownItVKatex from 'markdown-it-v-katex'

// import styles
import 'katex/dist/katex.css'

// import commands
import { default as commands, getCommand } from '../commands'

import _ from 'lodash'

function mixin (dest, src) {
    for (const [key, value] of Object.entries(src)) {
        if (typeof dest[key] === 'object' && !Array.isArray(dest[key])) {
            mixin(dest[key], value)
        } else {
            dest[key] = value
        }
    }
    return dest
}

export const defaultConfig = {
    previewDisplay: 'normal',
    fullScreen: false,
    scrollSync: true,
    parsers: [
        MarkdownItV,
        MarkdownItVCodemirrorHighlighter,
        MarkdownItVKatex
    ],
    editorOption: {
        mode: 'gfm',
        lineNumbers: true,
        lineWrapping: true
    },
    commands
}

export function getConfig (config, context) {
    const mergedConfig = mixin(_.cloneDeep(defaultConfig), config)
    const processedConfig = {}
    for (const key of Object.keys(defaultConfig)) {
        processedConfig[key] = mergedConfig[key]
    }
    processedConfig.commands = processedConfig.commands.map(cmd => getCommand(cmd, context))
    return processedConfig
}
