import { BarArray, ResultArray } from "../../types";

export function bubbleSort(array: BarArray) {
  let result: ResultArray = [];
  let i = 0;
  let j = 0;
  let swapped;
  for (i = 0; i < array.length - 1; i++) {
    swapped = false;
    for (j = 0; j < array.length - i - 1; j++) {
      array[j].backgroundColor = "var(--index-bar)";
      result.push(JSON.parse(JSON.stringify(array)));
      //   array[j].backgroundColor = "var(--default-bar)";
      //   result.push(JSON.parse(JSON.stringify(array)));

      if (array[j].value > array[j + 1].value) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swapped = true;
      }

      array[j].backgroundColor = "var(--default-bar)";
      result.push(JSON.parse(JSON.stringify(array)));
    }

    array[j].backgroundColor = "var(--sorted-bar)";
    result.push(JSON.parse(JSON.stringify(array)));
    if (swapped == false) break;
  }

  array.forEach((element) => {
    element.backgroundColor = "var(--sorted-bar)";
  });
  result.push(JSON.parse(JSON.stringify(array)));
  return result;
}
