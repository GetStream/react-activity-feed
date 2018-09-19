// @noflow
/* eslint-env commonjs*/

module.exports = {
  title: 'React Activity Feed - Docs',
  styleguideDir: 'docs',
  sortProps: (props) => props,
  sections: [
    // {
    //   name: 'Introduction',
    //   content: 'docs/setup.md',
    // },
    {
      name: 'Top Level Components',
      // content: 'docs/top-level-components.md',
      components: [
        // 'src/components/FlatFeed.js',
        // 'src/components/NotificationFeed.js',
        // 'src/components/SinglePost.js',
        'src/Context.js',
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
  },
};
