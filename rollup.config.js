import { DEFAULT_EXTENSIONS } from '@babel/core';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import url from '@rollup/plugin-url';
import process from 'process';
import copy from 'rollup-plugin-copy';
import globals from 'rollup-plugin-node-globals';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

process.env.NODE_ENV = 'production';

const baseConfig = {
  input: 'src/index.ts',
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
    'dayjs/locale/en',
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
    typescript(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    external(),
    babel({
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
      extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
    }),
    postcss({
      modules: false,
      extract: true,
      test: /\.(sass|scss)$/,
    }),
    url(),
    commonjs(),
    json(),
    copy({
      targets: [{ src: 'src/i18n/*.json', dest: 'dist/i18n' }],
    }),
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
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
    },
  ],
  plugins: [
    resolve({
      browser: true,
      preferBuiltins: false,
    }),
    typescript(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    external(),
    babel({
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
      extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
    }),
    {
      name: 'browser-remapper',
      resolveId: (importee) =>
        ignoredBrowserModules.includes(importee) ? importee : null,
      load: (id) =>
        ignoredBrowserModules.includes(id) ? 'export default null;' : null,
    },

    {
      name: 'ignore-css-and-scss',
      resolveId: (importee) => (importee.match(/.s?css$/) ? importee : null),
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
