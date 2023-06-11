import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import generateDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const firstFileJSON = getFixturePath('file1.json');
const secondFileJSON = getFixturePath('file2.json');
const expectedJSON = readFile('expectedFile.txt');

test('generateDiff JSON', () => {
  expect(generateDiff(firstFileJSON, secondFileJSON)).toEqual(expectedJSON);
});

const firstFileYAML = getFixturePath('file1.yaml');
const secondFileYAML = getFixturePath('file2.yaml');
const expectedYAML = readFile('expectedFile.txt');

test('generateDiff YMAL', () => {
  expect(generateDiff(firstFileYAML, secondFileYAML)).toEqual(expectedYAML);
});

const firstFileYML = getFixturePath('file1.yml');
const secondFileYML = getFixturePath('file2.yml');
const expectedYML = readFile('expectedFile.txt');

test('generateDiff YML', () => {
  expect(generateDiff(firstFileYML, secondFileYML)).toEqual(expectedYML);
});
