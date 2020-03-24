// @flow
/* globals __dirname */
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import json from 'rollup-plugin-json';
import url from 'rollup-plugin-url';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import globals from 'rollup-plugin-node-globals';
import alias from 'rollup-plugin-alias';
import path from 'path';

import pkg from './package.json';

import process from 'process';
process.env.NODE_ENV = 'production';

const baseConfig = {
  input: 'src/index.js',
  cache: false,
  watch: {
    chokidar: false,
  },
};

const ignoredBrowserModules = [
  'jsonwebtoken',
  'http',
  'https',
  'zlib',
  'crypto',
  'domain',
  'stream',
  'sshpk',
];

const normalBundle = {
  ...baseConfig,
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
  external: [
    'anchorme',
    'i18next',
    'dayjs',
    'dayjs/locale/nl',
    'dayjs/locale/it',
    'dayjs/locale/ru',
    'dayjs/locale/tr',
    'dayjs/locale/fr',
    'dayjs/locale/hi',
    'dayjs/locale/es',
    'dayjs/locale/en-gb',
    'dayjs',
    'dayjs/plugin/calendar',
    'dayjs/plugin/updateLocale',
    'dayjs/plugin/localizedFormat',
    'dayjs/plugin/localeData',
    'dayjs/plugin/relativeTime',
    'dayjs/plugin/minMax',
    'dayjs/plugin/utc',
    'getstream',
    'react-images',
    'react-file-utils',
    'emoji-mart',
    '@webscopeio/react-textarea-autocomplete',
    '@webscopeio/react-textarea-autocomplete/style.css',
    'emoji-mart/css/emoji-mart.css',
    'react-dropzone',
    'immutable',
    'twitter-text',
    'url-parse',
    'stream-analytics',
    'prop-types',
    'lodash/isPlainObject',
    'lodash/uniq',
    'lodash/difference',
    'lodash/includes',
    'lodash/debounce',
    'lodash/isEqual',
    'lodash/remove',
    'lodash/truncate',
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
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**',
    }),
    postcss({
      modules: false,
      extract: true,
    }),
    url(),
    commonjs(),
    json(),
  ],
};

const fullBrowserBundle = {
  ...baseConfig,
  output: [
    {
      file: pkg.jsdelivr,
      format: 'iife',
      sourcemap: true,
      name: 'window', // write all exported values to window
      extend: true, // extend window, not overwrite it
      browser: true,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
    },
  ],
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    external(),
    alias({
      request: path.resolve(
        __dirname,
        'node_modules/@stream-io/xmlhttp-request/index.js',
      ),
    }),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**',
    }),
    {
      name: 'browser-remapper',
      //$FlowFixMe
      resolveId: (importee) =>
        ignoredBrowserModules.includes(importee) ? importee : null,
      //$FlowFixMe
      load: (id) =>
        ignoredBrowserModules.includes(id) ? 'export default null;' : null,
    },

    {
      name: 'ignore-css-and-scss',
      //$FlowFixMe
      resolveId: (importee) => (importee.match(/.s?css$/) ? importee : null),
      //$FlowFixMe
      load: (id) => (id.match(/.s?css$/) ? '' : null),
    },
    resolve({
      browser: true,
      preferBuiltins: false,
    }),
    commonjs(),
    url(),
    json(),
    globals({
      process: true,
      buffer: true,
      global: false,
      dirname: false,
      filename: false,
    }),
  ],
};

export default () =>
  process.env.ROLLUP_WATCH ? [normalBundle] : [normalBundle, fullBrowserBundle];
