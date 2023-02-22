import Sinatra from '@websinatra/sinatra';

import construct, { bind } from './Cyan.construct.js';

import { isBigInt, isFunction, isSymbol } from './utils.js';

/**
 */
class Cyan {
  /**
   * @callback Cyan_prototype_filter_arguments_0
   * @param value
   * @param {number} index
   */

  /**
   * @param iterable
   * @yields {Promise<*>}
   */
  static async* #asyncFlattener(iterable) {
    if (!Cyan.#isIterableObject(iterable)) {
      throw new TypeError('\'iterable\' is not an async iterable object!');
    }

    for await (const value of iterable) {
      try {
        const {
          [Sinatra.cyanFlattenable]: flattenable,
          [Symbol.asyncIterator]: asyncIterator,
        } = value;

        if (flattenable === false) {
          yield value;
        } else {
          yield* Cyan.#asyncFlattener(asyncIterator.apply(value));
        }
      } catch {
        yield value;
      }
    }
  }

  /**
   * @param iterable
   * @param {number} [depth=1]
   * @yields {Promise<*>}
   */
  static async* #flattener(iterable, depth = 1) {
    if (!Cyan.#isIterableObject(iterable)) {
      throw new TypeError('\'iterable\' is not an async iterable object!');
    }

    if (isBigInt(depth) || isSymbol(depth) || Number.isNaN((Number(depth)))) {
      throw new TypeError('\'depth\' is not a number and/ or is not of an appropriate type for Number coercion!');
    }
    // eslint-disable-next-line no-underscore-dangle
    const _depth = Math.trunc(depth);

    for await (const value of iterable) {
      try {
        const {
          [Sinatra.cyanFlattenable]: flattenable,
          [Symbol.iterator]: iterator,
        } = value;

        if ((_depth <= 0) || (flattenable === false) || (value !== Object(value))) {
          yield value;
        } else {
          yield* Cyan.#flattener(iterator.apply(value), (_depth - 1));
        }
      } catch {
        yield value;
      }
    }
  }

  /**
   * @param value
   * @returns {boolean}
   */
  static #isIterableObject(value) {
    try {
      const {
        [Symbol.asyncIterator]: asyncIterator,
        [Symbol.iterator]: iterator,
      } = value;

      return isFunction(asyncIterator) || isFunction(iterator);
    } catch {
      return false;
    }
  }

  /**
   * @param iterable
   * @param {number} [length=Number.MAX_SAFE_INTEGER]
   * @yields {Promise<any[]>}
   */
  @bind
  @construct
  static async* chunk(iterable, length = Number.MAX_SAFE_INTEGER) {
    if (!Cyan.#isIterableObject(iterable)) {
      throw new TypeError('\'iterable\' is not an async iterable object!');
    }

    if (isBigInt(length) || isSymbol(length) || Number.isNaN((Number(length)))) {
      throw new TypeError('\'length\' is not a number and/ or is not of an appropriate type for Number coercion!');
    }

    const obj = [];

    for await (const value of iterable) {
      obj[obj.length] = value;

      if ((obj.length === Math.trunc(length)) || (obj.length === Number.MAX_SAFE_INTEGER)) {
        yield Array.from(obj);

        obj.length = 0;
      }
    }

    if (obj.length) {
      yield Array.from(obj);
    }
  }

  /**
   * @param {!{}} obj
   * @yields {Promise<*>}
   */
  @bind
  @construct
  static async* from(obj) {
    if (!obj) {
      throw new TypeError('\'obj\' is neither an async iterable nor an async iterator object!');
    }

    if (Cyan.#isIterableObject(obj)) {
      yield* obj;
    } else {
      try {
        // eslint-disable-next-line prefer-object-spread
        yield* Object.assign({}, obj, {
          [Symbol.asyncIterator]() {
            return this;
          },
        });
      } catch {
        yield* Array.from(obj);
      }
    }
  }

  /**
   */
  #iterable = Array.prototype[Symbol.iterator]();

  /**
   * @param {...*} values
   * @yields {Promise<*>}
   */
  @construct
  async* concat(...values) {
    yield* new Cyan([this, ...values]);
  }

  /**
   * @param [iterable=Array.prototype[Symbol.iterator]()]
   */
  constructor(iterable = Array.prototype[Symbol.iterator]()) {
    this.#iterable = Cyan.#asyncFlattener(iterable);
  }

  /**
   * @yields {Promise<[number, *]>}
   */
  @construct
  async* entries() {
    let index = 0;

    for await (const value of this) {
      // eslint-disable-next-line no-plusplus
      yield [(index++), value];
    }
  }

  /**
   * @param {Cyan_prototype_filter_arguments_0} callbackFn
   * @param {number} [concurrency=Number.MAX_SAFE_INTEGER]
   * @yields {Promise<*>}
   */
  @construct
  async* filter(callbackFn, concurrency = Number.MAX_SAFE_INTEGER) {
    if (!isFunction(callbackFn)) {
      throw new TypeError('\'callbackFn\' is not a function!');
    }

    if (isBigInt(concurrency) || isSymbol(concurrency) || Number.isNaN((Number(concurrency)))) {
      throw new TypeError('\'concurrency\' is not a number and/ or is not of an appropriate type for Number coercion!');
    }
    // eslint-disable-next-line no-underscore-dangle
    const _concurrency = Math.min(Number.MAX_SAFE_INTEGER, Math.max(1, Math.trunc(concurrency)));

    for await (const [index, value] of Cyan.chunk(this, _concurrency).entries()) {
      // eslint-disable-next-line max-len
      const obj = await value.reduce((async function _callbackFn(accumulator, currentValue, currentIndex) {
        if (await callbackFn.call(this, currentValue, (_concurrency * index + currentIndex))) {
          return (await accumulator).concat(currentValue);
        }

        return accumulator;
        // eslint-disable-next-line prefer-rest-params
      }).bind(arguments[2]), []);

      yield* obj;
    }
  }

  /**
   * @param {number} [depth=1]
   * @yields {Promise<*>}
   */
  @construct
  async* flat(depth = 1) {
    yield* Cyan.#flattener(this, depth);
  }

  /**
   * @param {Cyan_prototype_filter_arguments_0} callbackFn
   * @param {number} [concurrency=Number.MAX_SAFE_INTEGER]
   * @yields {Promise<*>}
   */
  @construct
  async* flatMap(callbackFn, concurrency = Number.MAX_SAFE_INTEGER) {
    // eslint-disable-next-line prefer-rest-params
    yield* Cyan.prototype.map.call(this, callbackFn, concurrency, arguments[2]).flat(1);
  }

  /**
   * @yields {Promise<number>}
   */
  @construct
  async* keys() {
    for await (const [index] of Cyan.prototype.entries.apply(this)) {
      yield index;
    }
  }

  /**
   * @param {Cyan_prototype_filter_arguments_0} callbackFn
   * @param {number} [concurrency=Number.MAX_SAFE_INTEGER]
   * @yields {Promise<*>}
   */
  @construct
  async* map(callbackFn, concurrency = Number.MAX_SAFE_INTEGER) {
    if (!isFunction(callbackFn)) {
      throw new TypeError('\'callbackFn\' is not a function!');
    }

    if (isBigInt(concurrency) || isSymbol(concurrency) || Number.isNaN((Number(concurrency)))) {
      throw new TypeError('\'concurrency\' is not a number and/ or is not of an appropriate type for Number coercion!');
    }
    // eslint-disable-next-line no-underscore-dangle
    const _concurrency = Math.min(Number.MAX_SAFE_INTEGER, Math.max(1, Math.trunc(concurrency)));

    for await (const [index, value] of Cyan.chunk(this, _concurrency).entries()) {
      yield* value.map(function _callbackFn(currentValue, currentIndex) {
        return callbackFn.call(this, currentValue, (_concurrency * index + currentIndex));
        // eslint-disable-next-line prefer-rest-params
      }, arguments[2]);
    }
  }

  /**
   * @param {number} [start=0]
   * @param {number} [end=Number.POSITIVE_INFINITY]
   * @yields {Promise<*>}
   */
  @construct
  async* slice(start = 0, end = Number.POSITIVE_INFINITY) {
    if (isBigInt(end) || isSymbol(end) || Number.isNaN((Number(end)))) {
      throw new TypeError('\'end\' is not a number and/ or is not of an appropriate type for Number coercion!');
    }

    if (isBigInt(start) || isSymbol(start) || Number.isNaN((Number(start)))) {
      throw new TypeError('\'start\' is not a number and/ or is not of an appropriate type for Number coercion!');
    }

    for await (const [index, value] of Cyan.prototype.entries.apply(this)) {
      if ((index < Math.trunc(end)) && (index >= Math.trunc(start))) {
        yield value;
      }
    }
  }

  /**
   * @returns {Promise<any[]>}
   */
  async toArray() {
    const obj = [];

    for await (const value of this) {
      obj[obj.length] = value;
    }

    return Array.from(obj);
  }

  /**
   * @yields {Promise<*>}
   */
  @construct
  async* values() {
    yield* this;
  }

  /**
   * @yields {Promise<*>}
   */
  async* [Symbol.asyncIterator]() {
    yield* this.#iterable;
  }

  /**
   * @returns {string}
   */// eslint-disable-next-line class-methods-use-this
  get [Symbol.toStringTag]() {
    return 'Cyan';
  }

  /**
   * @returns {Cyan}
   */
  static get [Symbol.species]() {
    return this;
  }
}
// eslint-disable-next-line no-restricted-exports
export { Cyan as default };
