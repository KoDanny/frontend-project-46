import makeStylish from './stylish.js';
import makePlain from './plain.js';
import makeJSON from './json.js';

const formatTree = (tree, format) => {
  switch (format) {
    case 'plain':
      return makePlain(tree);
    case 'json':
      return makeJSON(tree);
    default:
      return makeStylish(tree);
  }
};

export default formatTree;
