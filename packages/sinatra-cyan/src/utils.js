/**
 * @param value
 * @returns {boolean}
 */
function isBigInt(value) {
  return typeof value === 'bigint';
}

/**
 * @param value
 * @returns {boolean}
 */
function isFunction(value) {
  return typeof value === 'function';
}

/**
 * @param value
 * @returns {boolean}
 */
function isSymbol(value) {
  return typeof value === 'symbol';
}

export { isBigInt, isFunction, isSymbol };
