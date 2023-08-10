type Results = Bar[][];
type Bar = {
  id: string;
  value: number;
  style: string;
};

export function mergeSort(array: Bar[]) {
  var result: Results = [];
  sort(array, 0, array.length - 1, result);

  array.forEach((element) => {
    element.style = "bar-sorted";
  });
  result.push(JSON.parse(JSON.stringify(array)));
  return result;
}

function sort(array: Bar[], l: number, r: number, result: Results) {
  if (l < r) {
    let m = Math.floor(l + (r - l) / 2);
    sort(array, l, m, result);
    sort(array, m + 1, r, result);
    merge(array, l, m, r, result);
    result.push(JSON.parse(JSON.stringify(array)));
  }
}

function merge(array: Bar[], l: number, m: number, r: number, result: Results) {
  let temp_left = [];
  let temp_right = [];

  for (let i = l; i <= m; i++) {
    temp_left.push(JSON.parse(JSON.stringify(array[i])));
  }
  for (let i = m + 1; i <= r; i++) {
    temp_right.push(JSON.parse(JSON.stringify(array[i])));
  }

  var i = 0;
  var j = 0;
  var k = l;
  var n1 = m - l + 1;
  var n2 = r - m;
  while (i < n1 && j < n2) {
    if (temp_left[i].value <= temp_right[j].value) {
      array[k] = temp_left[i];
      array[k].style = "bar-swap";
      i++;
      k++;
    } else {
      array[k] = temp_right[j];
      array[k].style = "bar-swap";
      j++;
      k++;
    }
  }
  while (i < n1) {
    array[k] = temp_left[i];
    array[k].style = "bar-swap";
    k++;
    i++;
  }
  while (j < n2) {
    array[k] = temp_right[j];
    array[k].style = "bar-swap";
    k++;
    j++;
  }
}
