import resolve from 'rollup-plugin-node-resolve'
import cjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import json from 'rollup-plugin-json'
import builtins from 'rollup-plugin-node-builtins'
import { terser as minify } from 'rollup-plugin-terser'
import replace from 'rollup-plugin-replace'
import { plugin as analyze } from 'rollup-plugin-analyzer'
import globals from 'rollup-plugin-node-globals'

export default {
  input: 'esm/index.js',
  output: {
    file: 'umd.js',
    format: 'umd',
    name: 'MarkdownPalettes',
  },
  plugins: [
    analyze(),
    json(),
    resolve({
      preferBuiltins: true,
    }),
    builtins(),
    cjs(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.cwd': '(() => "/")',
    }),
    globals({
      process: false,
      global: true,
      buffer: false,
      dirname: false,
      filename: false,
    }),
    babel({
      exclude: 'node_modules/**',
      babelrc: false,
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              browsers: [
                'Edge >= 15',
                'Firefox >= 53',
                'Chrome >= 55',
                'Opera >= 42',
                'Safari >= 10.1',
              ],
            },
            modules: false,
          },
        ],
      ],
    }),
    minify({
      ecma: 6,
      compress: {
        drop_console: true,
        unsafe: true,
        unsafe_Function: true,
        unsafe_methods: true,
        unsafe_proto: true,
        unsafe_undefined: true,
        passes: 4,
      },
    }),
  ],
}
