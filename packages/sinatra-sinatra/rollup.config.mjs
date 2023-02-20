import { dirname } from 'node:path';

import { fileURLToPath } from 'node:url';

import pkg from './package.json' assert { type: 'json' };

const value = fileURLToPath(import.meta.url);

Object.defineProperty(global, '__filename', { value });

const { author, description, name, version } = pkg;

const pkgURL = await import.meta.resolve('../../package.json');

const { default: { config: { rollup } } } = await import(pkgURL, { assert: { type: 'json' } });

const { module, plugins: pluginEntries, ...output } = rollup;

const { '@rollup/plugin-babel': babelOptions = {} } = Object.fromEntries(pluginEntries);

const rollupURL = await import.meta.resolve('../../rollup.mjs');

const { outputFn, pluginsFn } = await import(rollupURL);

const banner = `/*!
 * ${name}@${version} — ${description}
 * Copyright (C) ${(new Date()).getFullYear()}  ${author}
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
`;

const plugins = await pluginsFn(pluginEntries, Object.entries({
  '@rollup/plugin-babel': Object.assign({}, babelOptions, {
    root: dirname(value),
  }),
}));

const config = {
  plugins,
  external: [
    /@babel\/runtime/,
  ],
  input: './src/index.mjs',
  output: [
    outputFn(output, {
      banner,
      commonjs: '.cjs',
      exports: 'auto',
      format: 'commonjs',
    }),
    outputFn(output, {
      banner,
      module,
    }),
  ],
};

export { config as default };
