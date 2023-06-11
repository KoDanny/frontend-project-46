import yaml from 'js-yaml';

const getParsing = (file, extension) => {
  switch (extension) {
    case 'json':
      return JSON.parse(file);
    case 'yaml':
      return yaml.load(file);
    case 'yml':
      return yaml.load(file);
    default:
      throw new Error('Unknown extension');
  }
};

export default getParsing;
