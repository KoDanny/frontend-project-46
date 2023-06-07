import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import generateDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const firstFile = getFixturePath('file1.json');
const secondFile = getFixturePath('file2.json');
const expected = readFile('expectedFile.txt');

test('generateDiff Test', () => {
  expect(generateDiff(firstFile, secondFile)).toEqual(expected);
});
