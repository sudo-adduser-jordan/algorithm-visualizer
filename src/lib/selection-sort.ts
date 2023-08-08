type Element = {
  key: number;
  color: string;
};

// Javascript program for implementation of selection sort
function swap(array: Element[], x: number, y: number) {
  var temp = array[x].key;
  array[x].key = array[y].key;
  array[y].key = temp;
}

export function selectionSort(array: Element[], length: number): Element[] {
  var i, j, min_index;

  // One by one move boundary of unsorted subarray
  for (i = 0; i < length - 1; i++) {
    // Find the minimum element in unsorted array
    min_index = i;
    array[i].color = "green";
    for (j = i + 1; j < length; j++) {
      if (array[j].key < array[min_index].key) {
        min_index = j;
      }
    }

    // Swap the found minimum element with the first element
    swap(array, min_index, i);
  }
  return array;
}
