import makeStylish from './stylish.js';
import makePlain from './plain.js';

const formatTree = (tree, format) => {
  switch (format) {
    case 'plain':
      return makePlain(tree);
    default:
      return makeStylish(tree);
  }
};

export default formatTree;
