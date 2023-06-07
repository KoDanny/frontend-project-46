import _ from 'lodash';
import path from 'path';
import fs from 'fs';

const generateDiff = (filepath1, filepath2) => {
  const currenDirectory = process.cwd();

  const resolvedFile1 = path.resolve(currenDirectory, filepath1);
  const resolvedFile2 = path.resolve(currenDirectory, filepath2);

  const obj1 = JSON.parse(fs.readFileSync(resolvedFile1, 'utf-8'));
  const obj2 = JSON.parse(fs.readFileSync(resolvedFile2, 'utf-8'));

  const data1 = Object.keys(obj1);
  const data2 = Object.keys(obj2);

  const diffList = _.sortBy(_.uniq([...data1, ...data2]))
    .flatMap((key) => {
      if (!Object.hasOwn(obj1, key)) {
        return { key, value: obj2[key], type: 'added' };
      }
      if (!Object.hasOwn(obj2, key)) {
        return { key, value: obj1[key], type: 'deleted' };
      }
      if (obj1[key] === obj2[key]) {
        return { key, value: obj2[key], type: 'unchanged' };
      }
      return [{ key, value: obj1[key], type: 'deleted' }, { key, value: obj2[key], type: 'added' }];
    })
    .reduce((acc, diff) => {
      let newAcc = acc;
      if (diff.type === 'added') {
        newAcc += `  + ${diff.key}: ${diff.value}\n`;
        return newAcc;
      }
      if (diff.type === 'deleted') {
        newAcc += `  - ${diff.key}: ${diff.value}\n`;
        return newAcc;
      }
      newAcc += `    ${diff.key}: ${diff.value}\n`;
      return newAcc;
    }, '');

  return `{\n${diffList}}`;
};

export default generateDiff;
