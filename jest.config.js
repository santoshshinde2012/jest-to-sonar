module.exports = {
  verbose: true,
  preset: 'ts-jest',
  roots: ['./tests'],
  coveragePathIgnorePatterns: ['/node_modules/', '/tests/'],
  collectCoverage: true,
  reporters: ['default',  ['./dist/index.js', {
    outputFile: './coverage/sonar-test-report.xml',
}]],
  testEnvironment: 'node',
};
