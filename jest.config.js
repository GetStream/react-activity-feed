module.exports = {
  verbose: true,
  maxConcurrency: 15,
  transformIgnorePatterns: [],
  testPathIgnorePatterns: ['/node_modules/', '/examples/', '/example/', '__snapshots__'],
  transform: {
    '.(js|jsx)$': 'babel-jest',
    '.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(css|scss|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/assetsTransformer.js',
    'mock-builders(.*)$': '<rootDir>/src/mock-builders$1',
  },
  globals: {},
};
