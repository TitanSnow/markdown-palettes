import { promisify } from 'util'
import { parseComponent as vueParseComponent, compile as vueCompile } from 'vue-template-compiler'
import { parse as babelParse} from '@babel/parser'
import babelGenerate from '@babel/generator'
import stylus from 'stylus'

export function vue(filename, content) {
  const { template: { content: templateContent }, script: { content: scriptContent }} = vueParseComponent(content)
  const scriptAst = babelParse(scriptContent, {
    sourceType: 'module',
    plugins: [
      "dynamicImport",
      "objectRestSpread"
    ],
    sourceFilename: filename
  })
  const { render } = vueCompile(templateContent, {
    preserveWhitespace: false
  })
  scriptAst.program.body.find(({type}) => type === 'ExportDefaultDeclaration').declaration.properties.push({
    "type": "ObjectProperty",
    "method": false,
    "key": {
      "type": "Identifier",
      "name": "render"
    },
    "computed": false,
    "shorthand": false,
    "value": {
      "type": "CallExpression",
      "callee": {
        "type": "Identifier",
        "name": "Function"
      },
      "arguments": [
        {
          "type": "StringLiteral",
          "value": render
        }
      ]
    }
  })
  const { code } = babelGenerate(scriptAst)
  return Promise.resolve({
    filename: filename.slice(0, -3) + 'js',
    content: code
  })
}

export function js(filename, content) {
  return Promise.resolve({
    filename, content
  })
}

export async function styl(filename, content) {
  const css = await promisify(stylus.render)(content, { filename })
  const ast = {
    "type": "File",
    "program": {
      "type": "Program",
      "sourceType": "module",
      "interpreter": null,
      "body": [
        {
          "type": "ImportDeclaration",
          "specifiers": [
            {
              "type": "ImportSpecifier",
              "imported": {
                "type": "Identifier",
                "name": "css"
              },
              "local": {
                "type": "Identifier",
                "name": "css"
              }
            }
          ],
          "source": {
            "type": "StringLiteral",
            "value": "emotion"
          }
        },
        {
          "type": "ExportDefaultDeclaration",
          "declaration": {
            "type": "CallExpression",
            "callee": {
              "type": "Identifier",
              "name": "css"
            },
            "arguments": [
              {
                "type": "StringLiteral",
                "value": css
              }
            ]
          }
        }
      ],
      "directives": []
    },
    "comments": []
  }
  const { code } = babelGenerate(ast)
  return {
    filename: filename.slice(0, -4) + 'js',
    content: code
  }
}
