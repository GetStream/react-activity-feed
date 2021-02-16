import process from 'process';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import json from '@rollup/plugin-json';
import url from '@rollup/plugin-url';
import copy from 'rollup-plugin-copy';
import resolve from '@rollup/plugin-node-resolve';
import globals from 'rollup-plugin-node-globals';
import typescript from '@rollup/plugin-typescript';

import pkg from './package.json';

process.env.NODE_ENV = 'production';

const baseConfig = {
  input: 'src/index.tsx',
  cache: false,
  watch: { chokidar: false },
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
    /@babel/,
    '@fortawesome/fontawesome-svg-core',
    '@fortawesome/free-regular-svg-icons',
    '@fortawesome/react-fontawesome',
    '@webscopeio/react-textarea-autocomplete',
    '@webscopeio/react-textarea-autocomplete/style.css',
    'anchorme',
    /dayjs/,
    'emoji-mart',
    'emoji-mart/css/emoji-mart.css',
    'getstream',
    'i18next',
    'immutable',
    /lodash/,
    'react-file-utils',
    'react-images',
    'stream-analytics',
    /twitter-text/,
    'url-parse',
  ],
  plugins: [
    resolve({ preferBuiltins: false, browser: true }),
    commonjs({ include: /node_modules/ }),
    postcss({ modules: false, extract: true }),
    json(),
    url(),
    typescript(),
    external(),
    babel({ babelHelpers: 'runtime', exclude: 'node_modules/**' }),
    copy({ targets: [{ src: 'src/i18n/*.json', dest: 'dist/i18n' }] }),
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
    resolve({ preferBuiltins: false, browser: true }),
    commonjs({ include: /node_modules/ }),
    external(),
    typescript(),
    babel({ babelHelpers: 'runtime', exclude: 'node_modules/**' }),
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
    url(),
    json(),
    globals({
      process: true,
      global: false,
      buffer: false,
      dirname: false,
      filename: false,
    }),
  ],
};

export default () =>
  process.env.ROLLUP_WATCH ? [normalBundle] : [normalBundle, fullBrowserBundle];
