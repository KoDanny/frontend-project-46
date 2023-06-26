import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import generateDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('generateDiff JSON', () => {
  const firstFileJSON = getFixturePath('file1.json');
  const secondFileJSON = getFixturePath('file2.json');
  const expectedJSON = readFile('expectedFile.txt');
  expect(generateDiff(firstFileJSON, secondFileJSON)).toEqual(expectedJSON);
});

test('generateDiff YMAL', () => {
  const firstFileYAML = getFixturePath('file1.yaml');
  const secondFileYAML = getFixturePath('file2.yaml');
  const expectedYAML = readFile('expectedFile.txt');
  expect(generateDiff(firstFileYAML, secondFileYAML)).toEqual(expectedYAML);
});

test('generateDiff YML', () => {
  const firstFileYML = getFixturePath('file1.yml');
  const secondFileYML = getFixturePath('file2.yml');
  const expectedYML = readFile('expectedFile.txt');
  expect(generateDiff(firstFileYML, secondFileYML)).toEqual(expectedYML);
});
