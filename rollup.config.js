// @flow
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import json from 'rollup-plugin-json';
import url from 'rollup-plugin-url';
import replace from 'rollup-plugin-replace';

import atImport from 'postcss-easy-import';
import cssnext from 'postcss-cssnext';
import nested from 'postcss-nested';
import colorFunction from 'postcss-color-function';
import vars from 'postcss-simple-vars';

import pkg from './package.json';

import { variables } from './src/variables';

import process from 'process';
process.env.NODE_ENV = 'production';

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
      browser: true,
    },
    {
      file: pkg.main,
      format: 'umd',
      sourcemap: true,
      name: 'index.umd',
      browser: true,
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
  watch: {
    chokidar: false,
  },
  external: [
    'anchorme',
    'moment',
    'getstream',
    'react-images',
    'lodash',
    'emoji-mart',
    '@webscopeio/react-textarea-autocomplete',
    '@webscopeio/react-textarea-autocomplete/style.css',
    'emoji-mart/css/emoji-mart.css',
    'react-dropzone',
    'immutable',
    'url-parse',
    'stream-analytics',
    'prop-types',
    '@fortawesome/react-fontawesome',
    '@fortawesome/free-regular-svg-icons',
    '@babel/runtime/regenerator',
    '@babel/runtime/helpers/asyncToGenerator',
    '@babel/runtime/helpers/objectWithoutProperties',
    '@babel/runtime/helpers/toConsumableArray',
    '@babel/runtime/helpers/objectSpread',
    '@babel/runtime/helpers/extends',
    '@babel/runtime/helpers/defineProperty',
    '@babel/runtime/helpers/assertThisInitialized',
    '@babel/runtime/helpers/inherits',
    '@babel/runtime/helpers/getPrototypeOf',
    '@babel/runtime/helpers/possibleConstructorReturn',
    '@babel/runtime/helpers/createClass',
    '@babel/runtime/helpers/classCallCheck',
  ],
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    external(),
    postcss({
      plugins: [
        atImport(),
        nested(),
        vars({ variables }),
        colorFunction(),
        cssnext(),
      ],
      modules: false,
      extract: true,
    }),
    url(),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**',
    }),
    commonjs(),
    json(),
  ],
};
