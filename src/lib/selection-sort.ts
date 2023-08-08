import { sleep } from "./sleep";

type Element = {
  value: number;
  color: string;
};

type Paramaters = {
  array: Element[];
  setArray: React.Dispatch<React.SetStateAction<Element[]>>;
};

// Javascript program for implementation of selection sort
export async function selectionSort({ array, setArray }: Paramaters) {
  var i, k, min_idx;
  for (i = 0; i < array.length - 1; i++) {
    min_idx = i;
    for (k = i + 1; k < array.length; k++) {
      array[k].color = "red";
      array[k - 1].color = "blue";
      await sleep(1);
      setArray([...array]);
      if (array[k].value < array[min_idx].value) {
        min_idx = k;
        // array[k].color = "yellow";
        // setArray([...array]);
      }
    }
    swap(array, min_idx, i);
    array[i].color = "green";
    setArray([...array]);
  }
  array[array.length - 1].color = "green";
  setArray([...array]);
}

function swap(array: Element[], xp: number, yp: number) {
  var temp = array[xp].value;
  array[xp].value = array[yp].value;
  array[yp].value = temp;
}
