import path from 'path';
import * as fs from 'fs';
import { ITestCase } from '../types/SonarReporter';

function generateXML(testFileResults: Map<string, ITestCase[]>): string {
  const lines: string[] = ['<testExecutions version="1">'];

  for (const [path, testCases] of testFileResults.entries()) {
    lines.push(`  <file path="${path}">`);

    for (const test of testCases) {
      const testName = test.name.replace(/"/g, "'");
      const failureMessage = test.failureMessages?.toString() ?? 'Error';

      lines.push(
        `    <testCase name="${testName}" duration="${test.duration}"${test.status === 'passed' ? ' /' : ''}>`,
      );

      if (test.status === 'skipped' || test.status === 'pending') {
        lines.push(`      <skipped message="${testName}" />`);
      } else if (test.status === 'failed') {
        lines.push(`      <failure message="Error">${failureMessage}</failure>`);
      } else if (test.status === 'disabled') {
        lines.push('      <disabled message="Error" />');
      }

      if (test.status !== 'passed') lines.push('    </testCase>');
    }

    lines.push('  </file>');
  }

  lines.push('</testExecutions>');

  return lines.join('\n');
}

function getRelativePath(fullPath: string): string {
  const basePath = process.cwd();
  const relativePath = fullPath.replace(`${basePath}/`, '');
  return relativePath;
}

function createFile(fullPath: string, data: string): void {
  const dir = path.dirname(fullPath);

  // Create folders if they don't exist
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  try {
    fs.writeFileSync(fullPath, data);
  } catch (err) {
    console.error(`Error creating file at ${fullPath}:`, err);
  }
}

export { generateXML, getRelativePath, createFile };
