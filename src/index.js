import path from 'path';
import fs from 'fs';
import getFileParse from './parsers.js';
import makeTree from './buildTree.js';
import formatTree from './formatters/index.js';

const getPath = (filename) => path.resolve(process.cwd(), filename);

const getFileData = (filePath, extension) => {
  const data = fs.readFileSync(filePath, 'utf-8');
  const parse = getFileParse(data, extension);
  return parse;
};

const getExtension = (filename) => path.extname(filename).slice(1);

const generateDiff = (filepath1, filepath2, format = 'stylish') => {
  const extension1 = getExtension(filepath1);
  const extension2 = getExtension(filepath2);

  const filePath1 = getPath(filepath1);
  const filePath2 = getPath(filepath2);

  const obj1 = getFileData(filePath1, extension1);
  const obj2 = getFileData(filePath2, extension2);

  const tree = makeTree(obj1, obj2);

  return formatTree(tree, format);
};

export default generateDiff;
