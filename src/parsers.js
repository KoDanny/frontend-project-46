import yaml from 'js-yaml';

const getFileData = (data, ext) => {
  // Почему-то JSON работает только так:
  if (ext === 'json') return JSON.parse(data);
  const extensions = {
    yaml: yaml.load(data),
    yml: yaml.load(data),
  };
  return extensions[ext] ?? new Error(`Unknown extension: '${ext}'!`);
};

export default getFileData;
