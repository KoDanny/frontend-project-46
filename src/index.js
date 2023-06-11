import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import getParsing from './parsers.js';

const getExtension = (filename) => path.extname(filename).slice(1);
const getPath = (filename) => path.resolve(process.cwd(), filename);
const readFile = (filePath) => fs.readFileSync(filePath, 'utf-8');

const makeStr = (obj) => {
  const { key, value, type } = obj;
  switch (type) {
    case 'added':
      return `  + ${key}: ${value}\n`;
    case 'deleted':
      return `  - ${key}: ${value}\n`;
    default:
      return `    ${key}: ${value}\n`;
  }
};

const generateDiff = (filepath1, filepath2) => {
  const pathFile1 = getPath(filepath1);
  const pathFile2 = getPath(filepath2);

  const dataFile1 = readFile(pathFile1);
  const dataFile2 = readFile(pathFile2);

  const data1 = getParsing(dataFile1, getExtension(filepath1));
  const data2 = getParsing(dataFile2, getExtension(filepath1));

  const keysData1 = Object.keys(data1);
  const keysData2 = Object.keys(data2);

  const diffList = _.sortBy(_.uniq([...keysData1, ...keysData2]))
    .flatMap((key) => {
      if (!Object.hasOwn(data1, key)) {
        return { key, value: data2[key], type: 'added' };
      }
      if (!Object.hasOwn(data2, key)) {
        return { key, value: data1[key], type: 'deleted' };
      }
      if (data1[key] === data2[key]) {
        return { key, value: data1[key], type: 'unchanged' };
      }
      return [{ key, value: data1[key], type: 'deleted' }, { key, value: data2[key], type: 'added' }];
    })
    .reduce((acc, diff) => {
      let newAcc = acc;
      newAcc += makeStr(diff);
      return newAcc;
    }, '');

  return `{\n${diffList}}`;
};

export default generateDiff;
