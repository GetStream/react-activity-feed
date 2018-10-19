// @noflow
/* eslint-env commonjs*/
const path = require('path');
const topLevelComponents = [
  'FlatFeed',
  'NotificationFeed',
  'StatusUpdateForm',
  'Activity',
  'Notification',
  // 'SinglePost',
];

const compositionComponents = [
  'Flex',
  'Panel',
  'PanelHeader',
  'PanelContent',
  'PanelFooter',
  'TimeHeader',
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
        'src/Context.js',
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
  require: [path.join(path.resolve(path.dirname('')), 'dist/index.css')],
};
