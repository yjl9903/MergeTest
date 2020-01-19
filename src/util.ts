import { promises } from 'fs';

const newline = /\r\n|\r|\n/g;

export async function read(filename: string) {
  return (await promises.readFile(filename, 'utf-8'))
    .trim()
    .replace(newline, '\n')
    .split('\n')
    .map((s: string) => s.trim())
    .filter((s: string) => s.length > 0)
    .join('\n');
}

export function parseName(filename: string, ext: string) {
  if (ext && ext.length > 0) {
    return filename + '.' + ext;
  } else {
    return filename;
  }
}
