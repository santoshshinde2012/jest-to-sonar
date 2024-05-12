import * as fs from 'fs';
import { Test, Reporter, TestResult } from '@jest/reporters';
import { IConfig, TestFileResults } from '../types/SonarReporter';
import { generateXML, getRelativePath } from '../helpers/utils';

export class SonarReporter<T extends IConfig> implements Reporter {
  private testFileResults: TestFileResults = new Map();
  private outputFile: string;

  constructor(...args: T[]) {
    const [, second] = args;
    this.outputFile = second?.outputFile || 'sonar-report.xml';
  }

  onTestResult(test: Test, result: TestResult) {
    const { testResults } = result;
    const testCases = testResults.map(({ fullName, duration, status }) => ({
      name: fullName,
      duration: duration || 0,
      status,
    }));
    this.testFileResults.set(getRelativePath(test.path), testCases);
  }

  onRunComplete() {
    fs.writeFileSync(this.outputFile, generateXML(this.testFileResults));
  }
}
