const formatValue = (value) => {
  if (value === null) return null;

  const type = typeof value;

  const types = {
    string: `'${value}'`,
    number: value,
    boolean: value,
    object: '[complex value]',
  };
  return types[type] ?? new Error(`Unknow ${type}!`);
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
