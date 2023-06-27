import _ from 'lodash';

const makeTree = (obj1, obj2) => {
  const keysData1 = Object.keys(obj1);
  const keysData2 = Object.keys(obj2);

  const keys = _.sortBy(_.uniq([...keysData1, ...keysData2]));

  const tree = keys.map((key) => {
    if (!Object.hasOwn(obj1, key)) {
      return { key, value: obj2[key], type: 'added' };
    }
    if (!Object.hasOwn(obj2, key)) {
      return { key, value: obj1[key], type: 'removed' };
    }
    if (obj1[key] === obj2[key]) {
      return { key, value: obj1[key], type: 'unchanged' };
    }
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      return { key, value: makeTree(obj1[key], obj2[key]), type: 'nested' };
    }
    return {
      key, oldValue: obj1[key], newValue: obj2[key], type: 'updated',
    };
  });
  return tree;
};

export default makeTree;