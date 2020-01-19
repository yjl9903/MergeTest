#!/usr/bin/env node

import { cac } from 'cac';
import path from 'path';
import { readFileSync, writeFileSync } from 'fs';

import { read, parseName } from './util';

const cli = cac('mergetest');

cli
  .option('--inext <inext>', '输入文件扩展名', { default: '' })
  .option('--ansext <ansext>', '答案文件扩展名', { default: 'a' })
  .option('--out <outfile>', '输出文件', { default: 'merged' })
  .command('[...files]', 'merge test')
  .action(async (files, options) => {
    if (files.length === 0) {
      return;
    }
    if (options.inext === options.ansext) {
      console.error('输入文件扩展名不可和答案文件扩展名相同');
      return;
    }
    let instr = '',
      anstr = '';
    for (const file of files) {
      instr += (await read(parseName(file, options.inext))) + '\n';
      anstr += (await read(parseName(file, options.ansext))) + '\n';
    }
    instr = files.length + '\n' + instr;
    writeFileSync(parseName(options.out, options.inext), instr, 'utf-8');
    writeFileSync(parseName(options.out, options.ansext), anstr, 'utf-8');
  });

cli.help();

cli.version(
  JSON.parse(readFileSync(path.resolve(__dirname, '../package.json'), 'utf-8'))
    .version
);

cli.parse();
