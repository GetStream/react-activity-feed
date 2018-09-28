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

const variables = {
  borderRadius: '4px',

  z0: '0',
  z1: '10',
  z2: '20',
  z3: '30',
  z4: '40',
  z5: '50',
  z6: '60',
  z7: '70',
  z8: '80',
  z9: '90',

  transparent: 'rgba(255,255,255,0)',
  white: '#ffffff',
  black: '#000000',
  primary: '#00D46A',
  info: '#0BA8E0',
  faded: '#DDDDDD',
  error: '#FF0000',
  fontColor: '#414D54',

  // Colors to optimize
  rafAttachedActivityAuthor: '#414D54',
  rafActivityFooterBorder: '#E6F0F2',
  rafCommentfieldBackground: '#F7F7F7', // lightest grey
  rafCardBackground: '#F4F4F4', // lighter grey
  rafCardBorder: '#A0B2B8', // grey
  rafDropdownBackground: '#313E47', // dark grey
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
    resolve(),
    commonjs(),
  ],
};
