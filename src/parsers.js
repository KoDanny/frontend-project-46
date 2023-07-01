import yaml from 'js-yaml';

const getFileData = (data, ext) => {
  const extensions = {
    json: (fileData) => JSON.parse(fileData),
    yaml: (fileData) => yaml.load(fileData),
    yml: (fileData) => yaml.load(fileData),
  };
  return extensions[ext] === undefined ? new Error(`Unknown extension: '${ext}'!`) : extensions[ext](data);
};

export default getFileData;
