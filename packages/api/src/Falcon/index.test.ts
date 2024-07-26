import { expect } from 'chai';
import fs from 'fs';
import path from 'path';

it('Test exports', async function () {
  const cwd = process.cwd();
  const falconsdk = fs
    .readdirSync(path.join(cwd, 'src', 'falconsdk'), { withFileTypes: true })
    .reduce((accumulator, dir) => {
      if (dir.isDirectory()) accumulator.push(dir.name);
      return accumulator;
    }, [] as string[]);

  const exports = await import('./index');
  expect(Object.keys(exports)).to.include.members(falconsdk.map((protocol) => protocol.replace(/-/g, '')));
});
