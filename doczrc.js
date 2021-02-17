export default {
  typescript: true,
  root: __dirname,
  dest: '/docs',
  base: '/react-activity-feed',
  title: 'React Activity Feed',
  repository: 'https://github.com/GetStream/react-activity-feed/',
  ignore: ['PULL_REQUEST_TEMPLATE.md', 'CHANGELOG.md', 'README.md'],
  menu: [
    { name: 'Introduction' },
    { name: 'Top Level Components' },
    { name: 'UI Components' },
    { name: 'Layout Components' },
    { name: 'Streami18n' },
    { name: 'Composition Components' },
  ],
};
