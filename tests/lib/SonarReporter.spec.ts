import fs from 'fs';
import { TestResult, Test } from '@jest/reporters';
import { SonarReporter } from '../../src/lib/SonarReporter';
import * as utils from '../../src/helpers/utils';

jest.mock('fs');

describe('SonarReporter', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('onTestResult', () => {
    it('should add test results to testFileResults', () => {
      const reporter = new SonarReporter();

      const test = {
        path: 'file/path',
      };
      const result: TestResult = {
        testResults: [
          {
            fullName: 'Test 1',
            duration: 100,
            status: 'passed',
            ancestorTitles: [],
            failureDetails: [],
            failureMessages: [],
            numPassingAsserts: 0,
            title: '',
          },
          {
            fullName: 'Test 2',
            duration: 50,
            status: 'failed',
            ancestorTitles: [],
            failureDetails: [],
            failureMessages: [],
            numPassingAsserts: 0,
            title: '',
          },
          {
            fullName: 'Test 3',
            duration: undefined,
            status: 'skipped',
            ancestorTitles: [],
            failureDetails: [],
            failureMessages: [],
            numPassingAsserts: 0,
            title: '',
          },
        ],
        leaks: false,
        numFailingTests: 0,
        numPassingTests: 0,
        numPendingTests: 0,
        numTodoTests: 0,
        openHandles: [],
        perfStats: {
          end: 0,
          runtime: 0,
          slow: false,
          start: 0,
        },
        skipped: false,
        snapshot: {
          added: 0,
          fileDeleted: false,
          matched: 0,
          unchecked: 0,
          uncheckedKeys: [],
          unmatched: 0,
          updated: 0,
        },
        testFilePath: '',
      };

      reporter.onTestResult(test as Test, result);

      expect(reporter['testFileResults'].get('file/path')).toEqual([
        { name: 'Test 1', duration: 100, status: 'passed' },
        { name: 'Test 2', duration: 50, status: 'failed' },
        { name: 'Test 3', duration: 0, status: 'skipped' },
      ]);
    });
  });

  describe('onRunComplete', () => {
    it('should write XML file with test results', () => {
      const reporter = new SonarReporter();
      reporter['testFileResults'] = new Map([
        [
          'test-file.js',
          [
            { name: 'Test 1', duration: 100, status: 'passed' },
            { name: 'Test 2', duration: 50, status: 'failed' },
          ],
        ],
      ]);
      const generateXMLMock = jest.spyOn(utils, 'generateXML').mockReturnValue('<xml></xml>');

      reporter.onRunComplete();

      expect(fs.writeFileSync).toHaveBeenCalledWith('./coverage/sonar-report.xml', '<xml></xml>');
      expect(generateXMLMock).toHaveBeenCalledWith(reporter['testFileResults']);
    });

    it.skip('should use default output file if not provided - skipped', () => {
      const reporter = new SonarReporter({}, { outputFile: 'sonar-report.xml' });
      reporter['testFileResults'] = new Map();
      const generateXMLMock = jest.spyOn(utils, 'generateXML').mockReturnValue('<xml></xml>');

      reporter.onRunComplete();

      expect(fs.writeFileSync).toHaveBeenCalledWith('sonar-report.xml', '<xml></xml>');
      expect(generateXMLMock).toHaveBeenCalledWith(reporter['testFileResults']);
    });

    it('should use default output file if not provided', () => {
      const reporter = new SonarReporter({}, { outputFile: 'sonar-report.xml' });
      reporter['testFileResults'] = new Map();
      const generateXMLMock = jest.spyOn(utils, 'generateXML').mockReturnValue('<xml></xml>');

      reporter.onRunComplete();

      expect(fs.writeFileSync).toHaveBeenCalledWith('sonar-report.xml', '<xml></xml>');
      expect(generateXMLMock).toHaveBeenCalledWith(reporter['testFileResults']);
    });

    it('should use provided output file', () => {
      const reporter = new SonarReporter();
      reporter['testFileResults'] = new Map();
      const generateXMLMock = jest.spyOn(utils, 'generateXML').mockReturnValue('<xml></xml>');

      reporter.onRunComplete();

      expect(fs.writeFileSync).toHaveBeenCalledWith('./coverage/sonar-report.xml', '<xml></xml>');
      expect(generateXMLMock).toHaveBeenCalledWith(reporter['testFileResults']);
    });
  });
});
