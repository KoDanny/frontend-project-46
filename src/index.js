import path from 'path';
import fs from 'fs';
import getFileData from './parsers.js';
import makeTree from './buildTree.js';
import formatTree from './formatters/index.js';

const getFileText = (filename) => {
  const filePath = path.resolve(process.cwd(), filename);
  const data = fs.readFileSync(filePath, 'utf-8');
  return data;
};

const getExtension = (filename) => path.extname(filename).slice(1);

const generateDiff = (filepath1, filepath2, format = 'stylish') => {
  const extension1 = getExtension(filepath1);
  const extension2 = getExtension(filepath2);

  const data1 = getFileText(filepath1);
  const data2 = getFileText(filepath2);

  const obj1 = getFileData(data1, extension1);
  const obj2 = getFileData(data2, extension2);

  const tree = makeTree(obj1, obj2);

  return formatTree(tree, format);
};

export default generateDiff;
