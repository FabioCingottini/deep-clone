/**
 * Given an object, return true if it is an object, false otherwise.
 *
 * @param {unknown} obj - The object to check.
 *
 * @return {boolean} - True if the object is an object, false otherwise.
 *
 * @example
 * ```js
 * checkIsObject({}) // true
 * checkIsObject([]) // false
 * checkIsObject(null) // false
 * checkIsObject(undefined) // false
 * ```
 */
function checkIsObject(obj) {
  return obj !== undefined && obj !== null && obj.constructor == Object;
}

module.exports = {checkIsObject}
