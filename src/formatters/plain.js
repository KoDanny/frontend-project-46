const formatValue = (value) => {
  if (value === null) return null;

  const type = typeof value;

  const types = {
    string: `'${value}'`,
    number: value,
    boolean: value,
    object: '[complex value]',
  };
  return types[type] === undefined ? new Error(`Unknow ${type}!`) : types[type];
};

const makePlain = (tree) => {
  const iter = (data, path = []) => data
    .map((node) => {
      const {
        key, type, value, oldValue, newValue, children,
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
          throw new Error(`Unknow type ${type}!`);
      }
    }).filter((str) => !str === false).join('\n'); // Без фильтра появляются лишние строки, ниже вывод тестовпу.
  return iter(tree);
};

export default makePlain;

/*
    - Expected  - 0
    + Received  + 3

      Property 'common.follow' was added with value: false
    +
      Property 'common.setting2' was removed
      Property 'common.setting3' was updated. From true to null
      Property 'common.setting4' was added with value: 'blah blah'
      Property 'common.setting5' was added with value: [complex value]
      Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
    +
      Property 'common.setting6.ops' was added with value: 'vops'
      Property 'group1.baz' was updated. From 'bas' to 'bars'
    +
      Property 'group1.nest' was updated. From [complex value] to 'str'
      Property 'group2' was removed
      Property 'group3' was added with value: [complex value]
*/
