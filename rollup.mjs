import { format as formatPath, parse } from 'node:path';

/**
 * @param {...{}} sources
 * @returns {{}}
 */
function outputFn(...sources) {
  const {
    dir,
    format,
    [format]: ext = '.js',
    input,
    ...output
  } = Object.assign({}, ...sources);

  const opArray = Array.prototype.concat({ format });

  try {
    const { name } = parse(input);

    opArray.push({
      file: formatPath({ dir, ext, name }),
    });
  } catch {
    opArray.push({
      dir,
      chunkFileNames: formatPath({
        ext,
        name: '[name]-[hash]',
      }),
      entryFileNames: formatPath({
        ext,
        name: '[name]',
      }),
    });
  }

  return Object.assign({}, output, ...opArray);
}

/**
 * @param {...(Map<string, {}>|[string, {}][])} entries
 * @returns {Promise<{}[]>}
 */
async function pluginsFn(...entries) {
  const flattenedEntries = entries
    .filter(function callbackFn(element) {
      return Array.isArray(element) || Map.prototype.isPrototypeOf(element);
    })
    .flatMap(function callbackFn(element) {
      return Array.from(element);
    });

  const mappedEntries = Array.from((new Map(flattenedEntries)))
    .map(async function callbackFn([key, value = {}]) {
      const name = key
        .replace(/@rollup\/plugin-|rollup-plugin-/, '')
        .replace(/\W+(.)/g, function replaceFn(match, p0) {
          return p0.toUpperCase();
        });

      const { default: defaultFunc, [name]: func = defaultFunc } = await import(key);

      return func(value);
    });

  return Promise.all(mappedEntries);
}

export { outputFn, pluginsFn };
