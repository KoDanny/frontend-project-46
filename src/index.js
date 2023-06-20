import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import getParsing from './parsers.js';

const getExtension = (filename) => path.extname(filename).slice(1);
const getPath = (filename) => path.resolve(process.cwd(), filename);
const readFile = (filePath) => fs.readFileSync(filePath, 'utf-8');

const generateDiff = (filepath1, filepath2) => {
  const pathFile1 = getPath(filepath1);
  const pathFile2 = getPath(filepath2);

  const dataFile1 = readFile(pathFile1);
  const dataFile2 = readFile(pathFile2);

  const data1 = getParsing(dataFile1, getExtension(filepath1));
  const data2 = getParsing(dataFile2, getExtension(filepath1));

  const keysData1 = Object.keys(data1);
  const keysData2 = Object.keys(data2);

  const keys = _.sortBy(_.uniq([...keysData1, ...keysData2]));
  
  const tree = keys.map((key) => {

    const makeDiff = (obj1, obj2) => {
      if (!Object.hasOwn(obj1, key)) {
        return { key, value: obj2[key], type: 'added'};
      }
      if (!Object.hasOwn(obj2, key)) {
        console.log(obj1[key])
        return { key, value: obj1[key], type: 'deleted'};
      }
      if (obj1[key] === obj2[key]) {
        console.log(obj1[key])
        return {key, value: obj1[key], type: 'unchanged'}
      }
      if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
        return { key, value: makeDiff(obj1[key], obj2[key]), type: 'nested'}
      }
      return { key, oldValue: obj1[key], newValue: obj2[key], type: 'changed'}
    }
    return makeDiff(data1, data2);
  })
  return tree;
  }

console.log(generateDiff('file1.json', 'file2.json'));

export default generateDiff;
