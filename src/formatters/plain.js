const formatValue = (value) => {
  switch (typeof value) {
    case 'string':
      return `'${value}'`;
    case 'object':
      return value === null ? null : '[complex value]';
    default:
      return value;
  }
};

const makePlain = (tree) => {
  const iter = (data, path = []) => {
    const result = data
      .filter((node) => node.type !== 'unchanged')
      .map((node) => {
        const { key, type, value } = node;
        const accPath = path.concat(key);
        console.log(accPath);
        switch (type) {
          case 'added':
            return `Property '${accPath.join('.')}' was ${type} with value: ${formatValue(value)}`;
          case 'removed':
            return `Property '${accPath.join('.')}' was ${type}`;
          case 'updated':
            return `Property '${accPath.join('.')}' was ${type}. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`;
          case 'nested':
            return iter(value, accPath);
          default:
            throw new Error('Unknow type');
        }
      });
    return result.join('\n');
  };
  return iter(tree);
};

export default makePlain;
