import _ from 'lodash'
import stylish from '../formatters/stylish.js';
import plain from '../formatters/plain.js'

const formatTree = (tree, format) => {
  switch (format) {
    case 'plain':
      return plain(tree);
    default:
      return stylish(tree);
  }
}

export default formatTree;
