import path from 'path';
import fs from 'fs';
import getParsing from './parsers.js';
import makeTree from './buildTree.js';
import formatTree from './formatters/index.js';

const getExtension = (filename) => path.extname(filename).slice(1);
const getPath = (filename) => path.resolve(process.cwd(), filename);
const readFile = (filePath) => fs.readFileSync(filePath, 'utf-8');

const generateDiff = (filepath1, filepath2, format = 'stylish') => {
  const pathFile1 = getPath(filepath1);
  const pathFile2 = getPath(filepath2);

  const dataFile1 = readFile(pathFile1);
  const dataFile2 = readFile(pathFile2);

  const data1 = getParsing(dataFile1, getExtension(filepath1));
  const data2 = getParsing(dataFile2, getExtension(filepath1));

  const tree = makeTree(data1, data2);
  return formatTree(tree, format);
};

export default generateDiff;
