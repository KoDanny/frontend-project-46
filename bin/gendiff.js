#!/usr/bin/env node
import { program } from 'commander';
import generateDiff from '../src/index.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format', '')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const option = program.opts();
    console.log(generateDiff(filepath1, filepath2, option.format));
  });
program.parse();
