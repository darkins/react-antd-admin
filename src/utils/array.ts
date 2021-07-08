/**
 * Array merge and de-duplication
 * @param arr1 Array 1
 * @param arr2 Array 2
 */
export function mergeUnique<T>(arr1: Array<T>, arr2: Array<T>): Array<T> {
  const arr: Array<T> = arr1;
  for (let index = 0, len = arr2.length; index < len; index += 1) {
    if (!arr.includes(arr2[index])) {
      arr.push(arr2[index]);
    }
  }

  return arr;
}

/**
 * Array deduplication
 * @param arr Array
 */
export function unique<T>(arr: Array<T>): Array<T> {
  const array: Array<T> = [];
  for (let index = 0, len = arr.length; index < len; index += 1) {
    if (!array.includes(arr[index])) {
      array.push(arr[index]);
    }
  }
  return array;
}
