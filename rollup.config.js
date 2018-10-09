// @flow
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import json from 'rollup-plugin-json';
import url from 'rollup-plugin-url';

import atImport from 'postcss-easy-import';
import cssnext from 'postcss-cssnext';
import nested from 'postcss-nested';
import colorFunction from 'postcss-color-function';
import vars from 'postcss-simple-vars';

import pkg from './package.json';

import { variables } from './src/variables';

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
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
  external: [
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
  ],
  plugins: [
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
      exclude: 'node_modules/**',
    }),
    commonjs(),
    json(),
  ],
};
