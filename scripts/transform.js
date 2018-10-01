import {
  parseComponent as vueParseComponent,
  compile as vueCompile,
} from 'vue-template-compiler'
import { parse as babelParse } from '@babel/parser'
import babelGenerate from '@babel/generator'
import { transform as babelTransform } from '@babel/core'

export function vue(filename, content) {
  const {
    template: { content: templateContent },
    script: { content: scriptContent },
  } = vueParseComponent(content)
  const scriptAst = babelParse(scriptContent, {
    sourceType: 'module',
    plugins: ['dynamicImport', 'objectRestSpread'],
  })
  const { render } = vueCompile(templateContent, {
    preserveWhitespace: false,
  })
  scriptAst.program.body
    .find(({ type }) => type === 'ExportDefaultDeclaration')
    .declaration.properties.push({
      type: 'ObjectProperty',
      method: false,
      key: {
        type: 'Identifier',
        name: 'render',
      },
      computed: false,
      shorthand: false,
      value: {
        type: 'CallExpression',
        callee: {
          type: 'Identifier',
          name: 'Function',
        },
        arguments: [
          {
            type: 'StringLiteral',
            value: render,
          },
        ],
      },
    })
  const { code } = babelGenerate(scriptAst)
  return Promise.resolve({
    filename: filename.slice(0, -3) + 'js',
    content: code,
  })
}

export function js(filename, content) {
  return new Promise((resolve, reject) => {
    babelTransform(
      content,
      {
        plugins: ['babel-plugin-emotion'],
        parserOpts: { plugins: ['objectRestSpread'] },
      },
      (err, result) => {
        if (err) reject(err)
        else
          resolve({
            filename,
            content: result.code,
          })
      }
    )
  })
}
