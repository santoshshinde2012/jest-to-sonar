import { Status } from '@jest/test-result';

interface ITestCase {
  name: string;
  duration: number;
  status: Status;
}

interface IConfig {
  outputFile?: string;
}

interface ITestFileResult {
  path: string;
  testCases: ITestCase[];
}

type TestFileResults = Map<string, ITestCase[]>;

export { ITestCase, IConfig, ITestFileResult, TestFileResults };
