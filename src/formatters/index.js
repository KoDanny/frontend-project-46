import makeStylish from './stylish.js';
import makePlain from './plain.js';

const formatTree = (tree, format) => {
  switch (format.toLowerCase()) {
    case 'plain':
      return makePlain(tree);
    case 'json':
      return JSON.stringify(tree, null, ' ');
    case 'stylish':
      return makeStylish(tree);
    default:
      throw new Error(`Unknow ${format}!`);
  }
};

export default formatTree;
