// @noflow
/* eslint-env commonjs*/
const path = require('path');
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
        'src/components/FlatFeed.js',
        'src/components/NotificationFeed.js',
        // 'src/components/SinglePost.js',
      ],
      exampleMode: 'collapse',
      usageMode: 'expand',
    },
    {
      name: 'UI Components',
      // content: 'docs/other-components.md',
      components: 'src/components/**/*.js',
      ignore: ['**/FlatFeed.js', '**/NotificationFeed.js', '**/SinglePost.js'],
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
