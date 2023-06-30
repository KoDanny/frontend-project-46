import getFileData from './parsers.js';
import makeTree from './buildTree.js';
import formatTree from './formatters/index.js';

const generateDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = getFileData(filepath1);
  const data2 = getFileData(filepath2);
  const tree = makeTree(data1, data2);

  return formatTree(tree, format);
};

export default generateDiff;
