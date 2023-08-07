// Javascript program for implementation of selection sort
function swap(array: number[], x: number, y: number) {
  var temp = array[x];
  array[x] = array[y];
  array[y] = temp;
}

function selectionSort(array: number[], n: number) {
  var i, j, min_idx;

  // One by one move boundary of unsorted subarray
  for (i = 0; i < n - 1; i++) {
    // Find the minimum element in unsorted array
    min_idx = i;
    for (j = i + 1; j < n; j++) if (array[j] < array[min_idx]) min_idx = j;

    // Swap the found minimum element with the first element
    swap(array, min_idx, i);
  }
}
