import { BarArray, ResultArray } from "../../types";

export function quickSort(array: BarArray) {
  const result: ResultArray = [];
  sort(array, 0, array.length - 1, result);

  array.forEach((element) => {
    element.backgroundColor = "var(--sorted-bar)";
  });

  result.push(JSON.parse(JSON.stringify(array)));
  return result;
}

function sort(array: BarArray, start: number, end: number, result: ResultArray) {
  if (start < end) {
    const pi = partition(array, start, end, result);
    sort(array, start, pi - 1, result);
    sort(array, pi + 1, end, result);
  }
  result.push(JSON.parse(JSON.stringify(array)));
}

function partition(array: BarArray, start: number, end: number, result: ResultArray) {
  const pivot = array[end];
  array[end].backgroundColor = "var(--pivot-bar)";
  result.push(JSON.parse(JSON.stringify(array)));

  let index = start - 1;
  for (let j = start; j < end; j++) {
    array[j].backgroundColor = "var(--index-bar)";
    result.push(JSON.parse(JSON.stringify(array)));
    array[j].backgroundColor = "var(--default-bar)";
    result.push(JSON.parse(JSON.stringify(array)));

    if (array[j].value < pivot.value) {
      index++;
      [array[index], array[j]] = [array[j], array[index]];
      result.push(JSON.parse(JSON.stringify(array)));
    }
  }

  [array[index + 1], array[end]] = [array[end], array[index + 1]];
  result.push(JSON.parse(JSON.stringify(array)));
  return index + 1;
}
