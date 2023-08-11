import { BarArray, ResultArray } from "../../types";

export function selectionSort(array: BarArray) {
  const results: ResultArray = [];

  for (let i = 0; i < array.length; i++) {
    let max = i;
    array[i].backgroundColor = "var(--index-bar)";
    for (let j = i + 1; j < array.length; j++) {
      if (array[j].value < array[max].value) {
        array[max].backgroundColor = "var(--default-bar)";
        max = j;
      }
      array[j].backgroundColor = "var(--index-bar)";
      array[max].backgroundColor = "var(--min-bar)";
      results.push(JSON.parse(JSON.stringify(array)));
      array[j].backgroundColor = "var(--default-bar)";
    }
    array[max].backgroundColor = "var(--default-bar)";
    [array[i], array[max]] = [array[max], array[i]];
    array[i].backgroundColor = "var(--sorted-bar)";
    results.push(JSON.parse(JSON.stringify(array)));
  }
  results.push(JSON.parse(JSON.stringify(array)));
  return results;
}
