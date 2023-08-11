import { BarArray, ResultArray } from "../../types";

export function mergeSort(array: BarArray) {
  const result: ResultArray = [];
  const copy = array;

  array = sort(array, copy, result);
  result.push(JSON.parse(JSON.stringify(array)));
  return result;
}

function sort(array: BarArray, copy: BarArray, result: ResultArray): BarArray {
  if (array.length <= 1) return array;

  const middle = Math.floor(array.length / 2);
  const left = sort(array.slice(0, middle), copy, result);
  const right = sort(array.slice(middle), copy, result);
  return merge(left, right);
}

function merge(left: BarArray, right: BarArray): BarArray {
  const sortedArr: BarArray = [];
  while (left.length && right.length) {
    if (left[0].value < right[0].value) {
      sortedArr.push(left.shift()!);
    } else {
      sortedArr.push(right.shift()!);
    }
  }
  return [...sortedArr, ...left, ...right];
}
