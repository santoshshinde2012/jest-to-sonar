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
        outputFile: './coverage/test-report.xml',
      },
    ],
  ],
  testEnvironment: 'node',
};
