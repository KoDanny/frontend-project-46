import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';

const getExtension = (filename) => path.extname(filename).slice(1);
const getPath = (filename) => path.resolve(process.cwd(), filename);
const readFile = (filePath) => fs.readFileSync(filePath, 'utf-8');

const getFileData = (filename) => {
  const filePath = getPath(filename);
  const data = readFile(filePath);
  const extension = getExtension(filename);

  switch (extension) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
      return yaml.load(data);
    case 'yml':
      return yaml.load(data);
    default:
      throw new Error(`Unknown extension: '${extension}'!`);
  }
};

export default getFileData;
