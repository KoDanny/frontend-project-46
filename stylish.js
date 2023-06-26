import _ from 'lodash';

const spaceSymbol = ' ';

const addSpace = (depth = 1) => spaceSymbol.repeat(depth * 4).slice(0, -2);

const getString = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return `${value}`;
  }
  const str = Object.entries(value)
    .map(([key, value]) => `${addSpace(depth + 1)}${key}: ${getString(value, depth + 1)}`);
  return `{\n${str.join('\n')}\n${addSpace(depth)}  }`;
};

const stylish = (tree) => {
  const iter = (obj, depth = 1) => {
    const str = obj.map((node) => {
      const { key, value, type } = node;

      switch (type) {
        case 'added':
          return `${addSpace(depth)}    + ${key}: ${getString(value, depth)}`;
        case 'deleted':
          return `${addSpace(depth)}  - ${key}: ${getString(value, depth)}`;
        case 'unchanged':
          return `${addSpace(depth)}      ${key}: ${getString(value, depth)}`;
        case 'changed':
          return `${addSpace(depth)}    - ${key}: ${getString(node.oldValue, depth)}\n${addSpace(depth)}    + ${key}: ${getString(node.newValue, depth)}`;
        case 'nested':
          return `${addSpace(depth)}  ${key}: {\n${iter(value, depth)}\n${addSpace(depth)}}`;
        default:
          throw new Error('Unknow type');
      }
    });
    return str.join('\n');
  };
  return `{\n${iter(tree)}\n}`;
};

export default stylish;
