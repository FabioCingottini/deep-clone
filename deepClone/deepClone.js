const {checkIsObject} = require("./utils/checkIsObject");

/**
 * Given a non-native item to clone or a function, returns that non-native item or that function cloned.
 * This callback is called in case the unknownToClone parameter of the deepClone function contains a non-native item or
 * a function.
 *
 * @callback onNonNativeItem
 * @template U
 * @param {U} nonNativeItemToClone - The non-native or function item to clone.
 * @return {U} nonNativeItemCloned - The non-native or function item cloned.
 */
/**
 * Given a possibly nested object, with arrays, objects, numbers, strings, booleans, null, undefined, non-native items
 * and functions, returns a deep clone of that object.
 * If the object contains non-native items or functions, the onNonNativeItem callback must be provided.
 * The onNonNativeItem callback is called in case the unknownToClone parameter of the deepClone function contains a
 * non-native item or a function.
 * The onNonNativeItem callback is there for the user to provide a custom cloning function for non-native items or
 * functions.
 *
 * @template T
 * @param {T} unknownToClone - The object to clone.
 * @param {onNonNativeItem} onNonNativeItem - The callback to call in case the unknownToClone parameter of the deepClone function contains a non-native item or a function.
 *
 * @return {T} clonedObject - The cloned object.
 *
 * @throws {Error} - If the unknownToClone parameter is a non-native item or a function and the onNonNativeItem parameter is not provided.
 *
 * @example
 * ```js
 * deepClone({a: 1}) // {a: 1}
 *
 * deepClone(
 *   {
 *     a: new Date("2023-03-25T21:27:20.469Z")
 *     aRandomFn: () => {}
 *   },
 *   (nonNativeItemToClone) => {
 *     if (nonNativeItemToClone instanceof Date) {
 *       return new Date(nonNativeItemToClone);
 *     } else if (typeof nonNativeItemToClone === "function") {
 *       return () => {};
 *     }
 *   }
 * ) // {a: new Date("2023-03-25T21:27:20.469Z"), aRandomFn: () => {}}
 * ```
 */
function deepClone(unknownToClone, onNonNativeItem) {
  const shouldIterateOverArray = Array.isArray(unknownToClone);
  const shouldIterateOverObject = checkIsObject(unknownToClone);
  const shouldCopyTheValue = unknownToClone === null ||
    unknownToClone === undefined ||
    typeof unknownToClone === "number" ||
    typeof unknownToClone === "string" ||
    typeof unknownToClone === "boolean";
  const shouldPerformCustomAction = !shouldIterateOverArray && !shouldIterateOverObject && !shouldCopyTheValue && typeof onNonNativeItem === "function";

  switch (true) {
    case shouldIterateOverArray:
      return unknownToClone.map((item) => deepClone(item, onNonNativeItem));
    case shouldIterateOverObject:
      const clonedObject = {};
      for (const key in unknownToClone) {
        clonedObject[key] = deepClone(unknownToClone[key], onNonNativeItem);
      }
      return clonedObject;
    case shouldCopyTheValue:
      return unknownToClone;
    case shouldPerformCustomAction:
      return onNonNativeItem(unknownToClone);
    default:
      throw new Error("onNonNativeItem must be a function in case the object to clone contains non-native items.");
  }
}

module.exports = {deepClone}