import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import generateDiff from '../src/index.js';
import formatTree from '../src/formatters/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const dataTests = [
  {
    firstFile: 'file1.json', secondFile: 'file2.json', output: 'stylish', expected: 'expectedStylish.txt',
  },
  {
    firstFile: 'file1.yml', secondFile: 'file2.yml', output: 'stylish', expected: 'expectedStylish.txt',
  },
  {
    firstFile: 'file1.yaml', secondFile: 'file2.yaml', output: 'stylish', expected: 'expectedStylish.txt',
  },
  {
    firstFile: 'file1.json', secondFile: 'file2.json', output: 'plain', expected: 'expectedPlain.txt',
  },
  {
    firstFile: 'file1.yml', secondFile: 'file2.yml', output: 'plain', expected: 'expectedPlain.txt',
  },
  {
    firstFile: 'file1.yaml', secondFile: 'file2.yaml', output: 'plain', expected: 'expectedPlain.txt',
  },
  {
    firstFile: 'file1.json', secondFile: 'file2.json', output: 'json', expected: 'expectedJSON.txt',
  },
  {
    firstFile: 'file1.yml', secondFile: 'file2.yml', output: 'json', expected: 'expectedJSON.txt',
  },
  {
    firstFile: 'file1.yaml', secondFile: 'file2.yaml', output: 'json', expected: 'expectedJSON.txt',
  },
];

test.each(dataTests)('Format: $output  Diff: $firstFile, $secondFile', ({
  firstFile, secondFile, output, expected,
}) => {
  const filePath1 = getFixturePath(firstFile);
  const filePath2 = getFixturePath(secondFile);
  const format = output;
  const result = readFile(expected);
  expect(generateDiff(filePath1, filePath2, format)).toEqual(result);
});

const dataTests2 = [
  ['file1.json', 'file2.json', 'expectedStylish.txt'],
  ['file1.yml', 'file2.yml', 'expectedStylish.txt'],
  ['file1.yaml', 'file2.yaml', 'expectedStylish.txt'],
];

test.each(dataTests2)('Format: default  Diff: %i, %i', (firstFile, secondFile, expected) => {
  const filePath1 = getFixturePath(firstFile);
  const filePath2 = getFixturePath(secondFile);
  const result = readFile(expected);
  expect(generateDiff(filePath1, filePath2)).toEqual(result);
});

test('formatTree(Formatter)', () => {
  const data = [{ key: 1, value: 2, type: 'added' }];
  const format = 'stOOlish';
  expect(formatTree(data, format)).toEqual(new Error(`Unknow format: ${format}!`));
});
