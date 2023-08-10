type Results = Bar[][];
type Bar = {
  id: string;
  value: number;
  style: string;
};

export function quickSort(array: Bar[]) {
  var result: Results = [];
  sort(array, 0, array.length - 1, result);

  array.forEach((element) => {
    element.style = "bar-sorted";
  });
  result.push(JSON.parse(JSON.stringify(array)));

  return result;
}

function sort(array: Bar[], start: number, end: number, result: Results) {
  if (start < end) {
    var pi = partition(array, start, end, result);
    sort(array, start, pi - 1, result);
    sort(array, pi + 1, end, result);
  }
}

function partition(array: Bar[], start: number, end: number, result: Results) {
  let pivot = array[end];
  array[end].style = "pivot-bar";
  result.push(JSON.parse(JSON.stringify(array)));

  var index = start - 1;
  for (let j = start; j < end; j++) {
    array[j].style = "index-bar";
    result.push(JSON.parse(JSON.stringify(array)));
    array[j].style = "default-bar";
    result.push(JSON.parse(JSON.stringify(array)));

    if (array[j].value < pivot.value) {
      index++;
      [array[index], array[j]] = [array[j], array[index]];
      result.push(JSON.parse(JSON.stringify(array)));
      array[j].style = "default-bar";
      result.push(JSON.parse(JSON.stringify(array)));
    }
  }

  [array[index + 1], array[end]] = [array[end], array[index + 1]];
  result.push(JSON.parse(JSON.stringify(array)));

  return index + 1;
}
