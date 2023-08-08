import { sleep } from "./sleep";

type MyType = {
  value: number;
  color: string;
};

type Paramaters = {
  array: MyType[];
  setArray: React.Dispatch<React.SetStateAction<MyType[]>>;
};

// Javascript program for implementation of selection sort
export async function selectionSort({ array, setArray }: Paramaters) {
  var i, k, min_idx;
  for (i = 0; i < array.length - 1; i++) {
    min_idx = i;
    for (k = i + 1; k < array.length; k++) {
      array[k].color = "red";
      setArray([...array]);
      await sleep(50);
      array[k].color = "blue";
      setArray([...array]);
      if (array[k].value < array[min_idx].value) {
        min_idx = k;
      }
    }
    swap(array, min_idx, i);
  }
}

function swap(array: MyType[], xp: number, yp: number) {
  var temp = array[xp].value;
  array[xp].value = array[yp].value;
  array[yp].value = temp;
}
