/**
 * @typedef {{addInitializer: function, kind: string, name: (string|symbol), static: (boolean|undefined)}} construct_arguments_1
 */

/**
 * @param value
 * @param {construct_arguments_1}
 */
function bind(value, { addInitializer, name }) {
  addInitializer(function func() {
    this[name] = this[name].bind(this);
  });
}

/**
 * @param {(*|function)} value
 * @param {construct_arguments_1}
 * @returns {(*|function)}
 */
function construct(value, { kind, name, static: isStatic }) {
  if (kind !== 'method') {
    return value;
  }

  /**
   */
  class Cyan {
    /**
     * @returns {Cyan}
     */
    [name]() { // eslint-disable-next-line prefer-rest-params
      return new this.constructor[Symbol.species](value.apply(this, arguments));
    }

    /**
     * @returns {Cyan}
     */
    static [name]() { // eslint-disable-next-line prefer-rest-params, prefer-spread
      return new this(value.apply(null, arguments));
    }
  }

  return isStatic ? Cyan[name] : Cyan.prototype[name];
}
// eslint-disable-next-line no-restricted-exports
export { bind, construct as default };
