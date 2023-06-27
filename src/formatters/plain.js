import _ from 'lodash';

const formatValue = (value) => {
  switch (typeof value) {
    case 'string':
      return `'${value}'`;
    case 'object':
      return value === null ? null : '[complex value]';
    default:
      return value;
  }
}

const plain = (tree) => {
    const iter = (node, path = []) => {
      
      const result = node
      .filter((node) => node.type !== 'unchanged')
      .map((node) => {
        const name = node.key;
        const type = node.type;
        const value = node.value;
        const accPath = path.concat(name);
        console.log(accPath)
        switch (type) {
          case 'added':
            return `Property '${accPath.join('.')}' was ${type} with value: ${formatValue(value)}`;
          case 'removed':
            return `Property '${accPath.join('.')}' was ${type}`;
          case 'updated':
            return `Property '${accPath.join('.')}' was ${type}. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`;
          case 'nested':
            return iter(value, accPath);
        }
      })
      return result.join('\n');
    }
    return iter(tree);
};

export default plain;