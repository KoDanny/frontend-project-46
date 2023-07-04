import path from 'path';
import fs from 'fs';
import getFileParse from './parsers.js';
import makeTree from './buildTree.js';
import formatTree from './formatters/index.js';

const getPath = (filename) => path.resolve(process.cwd(), filename);

const getFileType = (filename) => path.extname(filename).slice(1);

const getFileData = (filePath) => {
  const fileType = getFileType(filePath);
  const data = fs.readFileSync(filePath, 'utf-8');
  const parse = getFileParse(data, fileType);
  return parse;
};

const generateDiff = (filepath1, filepath2, format = 'stylish') => {
  const filePath1 = getPath(filepath1);
  const filePath2 = getPath(filepath2);

  const obj1 = getFileData(filePath1);
  const obj2 = getFileData(filePath2);

  const tree = makeTree(obj1, obj2);

  return formatTree(tree, format);
};

export default generateDiff;
