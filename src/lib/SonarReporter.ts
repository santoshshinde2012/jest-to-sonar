import { Test, Reporter, TestResult } from '@jest/reporters';
import { IConfig, TestFileResults } from '../types/SonarReporter';
import { createFile, generateXML, getRelativePath } from '../helpers/utils';

export class SonarReporter<T extends IConfig> implements Reporter {
  private testFileResults: TestFileResults = new Map();
  private outputFile: string;

  constructor(...args: T[]) {
    const [, second] = args;
    this.outputFile = second?.outputFile ?? './coverage/sonar-report.xml';
  }

  onTestResult(test: Test, result: TestResult) {
    const { testResults } = result;
    const testCases = testResults.map(({ fullName, duration, status, failureMessages }) => ({
      name: fullName,
      duration: duration ?? 0,
      status,
      failureMessages: failureMessages,
    }));
    this.testFileResults.set(getRelativePath(test.path), testCases);
  }

  onRunComplete() {
    createFile(this.outputFile, generateXML(this.testFileResults));
  }
}
