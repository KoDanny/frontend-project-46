import _ from 'lodash';

const addSpace = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const getString = (data, depth) => {
  if (!_.isPlainObject(data)) {
    return `${data}`;
  }
  const str = Object.entries(data)
    .map(([key, value]) => `${addSpace(depth)}  ${key}: ${getString(value, depth + 1)}`);
  return `{\n${str.join('\n')}\n${addSpace(depth - 1)}  }`;
};

const stylish = (tree) => {
  const iter = (obj, depth = 1) => {
    const str = obj.map((node) => {
      const { key, value, type } = node;

      switch (type) {
        case 'added':
          return `${addSpace(depth)}+ ${key}: ${getString(value, depth + 1)}`;
        case 'deleted':
          return `${addSpace(depth)}- ${key}: ${getString(value, depth + 1)}`;
        case 'unchanged':
          return `${addSpace(depth)}  ${key}: ${getString(value, depth + 1)}`;
        case 'changed':
          return `${addSpace(depth)}- ${key}: ${getString(node.oldValue, depth + 1)}\n${addSpace(depth)}+ ${key}: ${getString(node.newValue, depth + 1)}`;
        case 'nested':
          return `${addSpace(depth)}  ${key}: {\n${iter(value, depth + 1)}\n${addSpace(depth)}  }`;
        default:
          throw new Error('Unknow type');
      }
    });
    return str.join('\n');
  };
  return `{\n${iter(tree)}\n}`;
};

export default stylish;
