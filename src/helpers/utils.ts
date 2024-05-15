import path from 'path';
import * as fs from 'fs';
import { ITestCase } from '../types/SonarReporter';

function generateXML(testFileResults: Map<string, ITestCase[]>): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<testExecutions version="1">\n`;

  for (const [path, testCases] of testFileResults.entries()) {
    xml += `  <file path="${path}">\n`;

    for (const test of testCases) {
      xml += `    <testCase name="${test.name.replace(/"/g, "'")}" duration="${test.duration / 1000}">\n`;

      if (test.status === 'skipped') {
        xml += '      <skipped/>\n';
      } else if (test.status === 'failed') {
        xml += '      <failure/>\n';
      } else if (test.status === 'disabled') {
        xml += '      <disabled/>\n';
      }

      xml += '    </testCase>\n';
    }

    xml += '  </file>\n';
  }

  xml += '</testExecutions>';

  return xml;
}

function getRelativePath(fullPath: string): string {
  const basePath = process.cwd();
  const relativePath = fullPath.replace(basePath, '');
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
