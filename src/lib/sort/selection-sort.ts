type Results = Bar[][];
type Bar = {
  id: string;
  value: number;
  style: string;
};

export function selectionSort(array: Bar[]) {
  var results: Results = [];

  for (let i = 0; i < array.length; i++) {
    let max = i;
    array[i].style = "bar-swap";

    for (let j = i + 1; j < array.length; j++) {
      if (array[j].value < array[max].value) {
        array[max].style = "bar-default";
        max = j;
      }
      array[j].style = "bar-swap";
      array[max].style = "bar-min";
      results.push(JSON.parse(JSON.stringify(array)));
      array[j].style = "bar";
      if (j == array.length) {
      }
    }

    array[i].style = "bar";
    [array[i], array[max]] = [array[max], array[i]];

    array[i].style = "bar-sorted";
    results.push(JSON.parse(JSON.stringify(array)));
  }
  results.push(JSON.parse(JSON.stringify(array)));
  return results;
}
