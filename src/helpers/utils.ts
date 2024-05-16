import path from 'path';
import * as fs from 'fs';
import { ITestCase } from '../types/SonarReporter';

function generateXML(testFileResults: Map<string, ITestCase[]>): string {
  let xml = `<testExecutions version="1">\n`;

  for (const [path, testCases] of testFileResults.entries()) {
    xml += `  <file path="${path}">\n`;

    for (const test of testCases) {
      xml += `    <testCase name="${test.name.replace(/"/g, "'")}" duration="${test.duration}" ${test.status === 'passed' ? '/' : ''}>\n`;

      if (test.status === 'skipped' || test.status === 'pending') {
        xml += `      <skipped message="${test.name.replace(/"/g, "'")}" />\n`;
      } else if (test.status === 'failed') {
        xml += `      <failure message="Error">${test.failureMessages?.toString() || 'Error'}</failure>\n`;
      } else if (test.status === 'disabled') {
        xml += '      <disabled message="Error" />\n';
      }

      if (test.status !== 'passed') xml += '    </testCase>\n';
    }

    xml += '  </file>\n';
  }

  xml += '</testExecutions>';

  return xml;
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
