import fs from 'fs';
import path from 'path';
import { createFile, generateXML, getRelativePath } from '../../src/helpers/utils';
import { ITestCase } from '../../src/types/SonarReporter';

jest.mock('fs');

describe('createFile function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create file with given data', () => {
    const fullPath = '/path/to/file.txt';
    const data = 'Hello, world!';

    createFile(fullPath, data);

    expect(fs.existsSync).toHaveBeenCalledTimes(1);
    expect(fs.mkdirSync).toHaveBeenCalledWith(path.dirname(fullPath), { recursive: true });
    expect(fs.writeFileSync).toHaveBeenCalledWith(fullPath, data);
  });

  it('should handle error when writing file', () => {
    const fullPath = '/path/to/file.txt';
    const data = 'Hello, world!';
    const error = new Error('File write error');

    (fs.existsSync as jest.Mock).mockReturnValueOnce(true);
    (fs.writeFileSync as jest.Mock).mockImplementationOnce(() => {
      throw error;
    });

    createFile(fullPath, data);

    expect(fs.existsSync).toHaveBeenCalledTimes(1);
    expect(fs.mkdirSync).not.toHaveBeenCalled();
    expect(fs.writeFileSync).toHaveBeenCalledWith(fullPath, data);
  });
});

describe('generateXML', () => {
  test('generates correct XML with test cases of different statuses', () => {
    const testCases: ITestCase[] = [
      { name: 'Test 1', duration: 100, status: 'passed' },
      { name: 'Test 2', duration: 200, status: 'failed' },
      { name: 'Test 3', duration: 300, status: 'skipped' },
      { name: 'Test 4', duration: 400, status: 'disabled' },
      { name: 'Test 5', duration: 500, status: 'failed', failureMessages: [] },
    ];

    const testFileResults = new Map([['path/to/test/file', testCases]]);
    const generatedXML = generateXML(testFileResults);

    expect(generatedXML).toEqual(expect.stringContaining('path="path/to/test/file"'));
    expect(generatedXML).toEqual(expect.stringContaining('<failure message="Error">Error</failure>'));
    expect(generatedXML).toEqual(expect.stringContaining(`<skipped message="Test 3" />`));
    expect(generatedXML).toEqual(expect.stringContaining('<disabled message="Error" />'));
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
    const expectedRelativePath = 'path/to/test/file';
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
