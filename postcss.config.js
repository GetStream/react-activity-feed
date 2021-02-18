module.exports = {
  plugins: [
    require('postcss-easy-import'),
    require('autoprefixer'),
    require('cssnano'),
  ],
  syntax: require('postcss-scss'),
};
