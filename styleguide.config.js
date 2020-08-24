/* globals __dirname */
/* eslint-env commonjs*/
const path = require('path');
const topLevelComponents = [
  'FlatFeed',
  'SinglePost',
  'NotificationFeed',
  'StatusUpdateForm',
  'Activity',
  'Notification',
];

const compositionComponents = [
  'Flex',
  'Panel',
  'PanelHeader',
  'PanelContent',
  'PanelFooter',
  'TimeHeader',
  'DataLabel',
  'Dropdown',
  'DropdownPanel',
  'ActivityHeader',
  'ActivityContent',
  'ActivityFooter',
];

module.exports = {
  title: 'React Activity Feed - Docs',
  styleguideDir: 'docs',
  assetsDir: 'src/assets',
  webpackConfig: require('./webpack.config.styleguidist.js'),
  serverPort: 6068,
  styleguideComponents: {
    PathlineRenderer: path.join(
      __dirname,
      'src/styleguideComponents/PathlineRenderer.js',
    ),
  },
  sortProps: (props) => props,
  sections: [
    {
      name: 'Introduction',
      content: 'docs/setup.md',
    },
    {
      name: 'Top Level Components',
      // content: 'docs/top-level-components.md',
      components: [
        'src/Context/StreamApp.js',
        ...topLevelComponents.map(
          (component) => `src/components/${component}.js`,
        ),
        // 'src/components/SinglePost.js',
      ],
      exampleMode: 'collapse',
      usageMode: 'expand',
    },
    {
      name: 'UI Components',
      // content: 'docs/other-components.md',
      components: 'src/components/**/*.js',
      ignore: [
        ...topLevelComponents.map((component) => `**/${component}.js`),
        ...compositionComponents.map((component) => `**/${component}.js`),
      ],
      exampleMode: 'collapse',
      usageMode: 'expand',
    },
    {
      name: 'Layout Components',
      // content: 'docs/other-components.md',
      components: [
        ...compositionComponents.map(
          (component) => `src/components/${component}.js`,
        ),
      ],
      exampleMode: 'collapse',
      usageMode: 'expand',
    },
    {
      name: 'Internationalisation (i18n)',
      content: 'docs/Streami18n.md',
    },
    // {
    //   name: 'Cookbook',
    //   content: 'docs/cookbook.md',
    // },
  ],
  template: {
    favicon: 'https://getstream.imgix.net/images/favicons/favicon-96x96.png',
    link: {
      rel: 'stylesheet',
      type: 'text/css',
      href: './dist/index.css',
    },
  },
  require: [
    path.join(path.resolve(path.dirname('')), 'dist/index.es.css'),
    path.join(path.resolve(path.dirname('')), 'src/styleguide-styles.css'),
  ],
};
