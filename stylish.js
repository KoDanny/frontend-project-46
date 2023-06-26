import _ from 'lodash';

const addSpace = (depth, spacesCount = 4) => '  '.repeat(depth * spacesCount - 2);
const space = (depth) => '    '.repeat(depth - 1)
const getString = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return `${value}`;
  }
  const str = Object.entries(value)
    .map(([key, value]) => `${addSpace(depth)}  ${key}: ${getString(value, depth + 1)}`);
  return `{\n${str.join('\n')}\n${addSpace(depth)}  }`;
};

const stylish = (tree) => {
  const iter = (obj, depth = 1) => {
    const str = obj.map((node) => {
      const { key, value, type } = node;

      switch (type) {
        case 'added':
          return `${addSpace(depth)}  + ${key}: ${getString(value, depth)}`;
        case 'deleted':
          return `${addSpace(depth)}  - ${key}: ${getString(value, depth)}`;
        case 'unchanged':
          return `${addSpace(depth)}  ${key}: ${getString(value, depth)}`;
        case 'changed':
          return `${addSpace(depth)}  - ${key}: ${getString(node.oldValue, depth)}\n${addSpace(depth)}  + ${key}: ${getString(node.newValue, depth)}`;
        case 'nested':
          return `${addSpace(depth)}  ${key}: {\n${iter(value, depth)}\n${space(depth)}}`;
        default:
          throw new Error('Unknow type');
      }
    });
    return str.join('\n');
  };
  return `{\n${iter(tree)}\n}`;
};

export default stylish;
