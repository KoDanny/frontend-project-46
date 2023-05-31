#!/usr/bin/env node
import { program } from 'commander';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0');

program.command('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .option('-h, --help', 'output usage information', '');

program.parse();

const options = program.opts();
if (options.help) {
  console.log(options);
}
