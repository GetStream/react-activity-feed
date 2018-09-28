// @flow
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import url from 'rollup-plugin-url';
import atImport from 'postcss-easy-import';
import cssnext from 'postcss-cssnext';
import nested from 'postcss-nested';
import colorFunction from 'postcss-color-function';
import vars from 'postcss-simple-vars';

import pkg from './package.json';

const colors = {
  primary: '#00D46A',
  info: '#0BA8E0',
  faded: '#DDDDDD',
};

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    external(),
    postcss({
      plugins: [
        atImport(),
        nested(),
        vars({ variables: colors }),
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
    resolve(),
    commonjs(),
  ],
};
