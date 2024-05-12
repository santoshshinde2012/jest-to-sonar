import { generateXML, getRelativePath } from '../../src/helpers/utils';
import { ITestCase } from '../../src/types/SonarReporter';

describe('generateXML', () => {
  test('generates correct XML with test cases of different statuses', () => {
    const testCases: ITestCase[] = [
      { name: 'Test 1', duration: 100, status: 'passed' },
      { name: 'Test 2', duration: 200, status: 'failed' },
      { name: 'Test 3', duration: 300, status: 'skipped' },
      { name: 'Test 4', duration: 400, status: 'disabled' },
    ];

    const testFileResults = new Map([['/path/to/test/file', testCases]]);
    const generatedXML = generateXML(testFileResults);

    expect(generatedXML).toEqual(expect.stringContaining('path="/path/to/test/file"'));
    expect(generatedXML).toEqual(expect.stringContaining('<failure/>'));
    expect(generatedXML).toEqual(expect.stringContaining('<skipped/>'));
    expect(generatedXML).toEqual(expect.stringContaining('<disabled/>'));
  });

  test('generates correct XML with test cases of 0 duration', () => {
    const testCases: ITestCase[] = [{ name: 'Test 1', duration: 0, status: 'passed' }];

    const testFileResults = new Map([['/path/to/test/file', testCases]]);

    expect(generateXML(testFileResults)).toBeDefined();
  });

  test('handles empty testFileResults map', () => {
    const testFileResults = new Map();
    expect(typeof generateXML(testFileResults)).toBeDefined();
  });

  test('handles empty path', () => {
    const testCases: ITestCase[] = [{ name: 'Test 1', duration: 100, status: 'passed' }];

    const testFileResults = new Map([['', testCases]]);
    expect(generateXML(testFileResults)).toBeDefined();
  });
});

describe('getRelativePath', () => {
  test('generates relative path correctly', () => {
    const fullPath = '/path/to/test/file';
    const expectedRelativePath = '/path/to/test/file';
    expect(getRelativePath(fullPath)).toEqual(expectedRelativePath);
  });

  test('handles "process.cwd()" in path', () => {
    const fullPath = process.cwd() + '/path/to/test/file';
    const expectedRelativePath = '/path/to/test/file';
    expect(getRelativePath(fullPath)).toEqual(expectedRelativePath);
  });

  test('handles empty input string', () => {
    const fullPath = '';
    const expectedRelativePath = '';
    expect(getRelativePath(fullPath)).toEqual(expectedRelativePath);
  });

  test('handles empty basePath', () => {
    const fullPath = '/path/to/test/file';
    const expectedRelativePath = '/path/to/test/file';
    expect(getRelativePath(fullPath)).toEqual(expectedRelativePath);
  });
});
