const formatValue = (value) => {
  const type = typeof value;
  switch (type) {
    case 'string':
      return `'${value}'`;
    case 'number':
    case 'boolean':
      return value;
    case 'object':
      return value === null ? null : '[complex value]';
    default:
      throw new Error(`Unknown type: '${type}'!`);
  }
};

const makePlain = (tree) => {
  const iter = (data, path = []) => {
    const result = data
      .map((node) => {
        const {
          key,
          type,
          value,
          oldValue,
          newValue,
          children,
        } = node;

        const accPath = path.concat(key);

        switch (type) {
          case 'unchanged':
            return null;
          case 'added':
            return `Property '${accPath.join('.')}' was ${type} with value: ${formatValue(value)}`;
          case 'removed':
            return `Property '${accPath.join('.')}' was ${type}`;
          case 'updated': {
            const value1 = formatValue(oldValue);
            const value2 = formatValue(newValue);
            return `Property '${accPath.join('.')}' was ${type}. From ${value1} to ${value2}`;
          }
          case 'nested':
            return iter(children, accPath);
          default:
            throw new Error(`Unknow ${type}!`);
        }
      });
    return result.filter((str) => !str === false).join('\n');
  };
  return iter(tree);
};

export default makePlain;
