import _ from 'lodash';
import path from 'path';
import fs from 'fs';

const makeStr = (key, value, diff = ' ') => `${diff} ${key}: ${value}`;

const generateDiff = (filepath1, filepath2) => {
  const currenDirectory = process.cwd();

  const resolvedFile1 = path.resolve(currenDirectory, filepath1);
  const resolvedFile2 = path.resolve(currenDirectory, filepath2);

  const obj1 = JSON.parse(fs.readFileSync(resolvedFile1, 'utf-8'));
  const obj2 = JSON.parse(fs.readFileSync(resolvedFile2, 'utf-8'));

  const data1 = Object.keys(obj1);
  const data2 = Object.keys(obj2);

  const diffList = _.sortBy([...data1, ...data2])
    .flatMap((key) => {
      if (!Object.hasOwn(obj1, key)) {
        return makeStr(key, obj1[key], '+');
      }
      if (!Object.hasOwn(obj2, key)) {
        return makeStr(key, obj1[key], '-');
      }
      if (obj1[key] === obj2[key]) {
        return makeStr(key, obj1[key]);
      }
      return [makeStr(key, obj1[key], '+'), makeStr(key, obj2[key], '-')];
    });
  const result = ['{', ..._.uniq(diffList), '}'].join('\n');
  return result;
};

export default generateDiff;
