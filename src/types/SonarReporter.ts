import { Status } from '@jest/test-result';

interface ITestCase {
  name: string;
  duration: number;
  status: Status;
  failureMessages?: string[];
}

interface IConfig {
  outputFile?: string;
}

type TestFileResults = Map<string, ITestCase[]>;

export { ITestCase, IConfig, TestFileResults };
