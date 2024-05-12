module.exports = {
  preset: 'ts-jest',
  roots: ['./tests'],
  coveragePathIgnorePatterns: ['/node_modules/', '/tests/'],
  collectCoverage: true,
  reporters: [
    'default',
    [
      './dist/index.js',
      {
        outputFile: 'test-report.xml',
      },
    ],
  ],
  testEnvironment: 'node',
};
