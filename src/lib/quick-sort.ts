import { sleep } from "./sleep";

type MyType = {
  value: number;
  color: string;
};

// type QuickSortParams = {
//   array: MyType[];
//   setArray: React.Dispatch<React.SetStateAction<MyType[]>>;
//   low: number;
//   high: number;
// };

export async function quickSort(
  array: MyType[],
  setArray: React.Dispatch<React.SetStateAction<MyType[]>>,
  low: number,
  high: number
) {
  // for (let i = 0; i < array.length; i++) {
  //   if (array[i].value == i) {
  //     array[i].color = "green";
  //   }
  //   setArray([...array]);
  // }
  if (low < high) {
    let pi = await partition(array, setArray, low, high);
    quickSort(array, setArray, low, pi - 1);
    quickSort(array, setArray, pi + 1, high);
  }
}

async function partition(
  array: MyType[],
  setArray: React.Dispatch<React.SetStateAction<MyType[]>>,
  low: number,
  high: number
): Promise<number> {
  let pivot = array[high].value;
  let i = low - 1;
  for (let k = low; k <= high - 1; k++) {
    array[k].color = "red";
    setArray([...array]);
    await sleep(50);
    array[k].color = "blue";
    setArray([...array]);
    if (array[k].value < pivot) {
      i++;
      [array[i].value, array[k].value] = [array[k].value, array[i].value];
      array[i].color = "red";
      setArray([...array]);
      await sleep(50);
      array[i].color = "blue";
      setArray([...array]);
    }
  }

  [array[i + 1].value, array[high].value] = [
    array[high].value,
    array[i + 1].value,
  ];
  setArray([...array]);
  return i + 1;
}

async function setColor(
  array: MyType[],
  setArray: React.Dispatch<React.SetStateAction<MyType[]>>,
  high: number,
  index: number
) {
  array[high].color = "yellow";
  array[index].color = "red";
  setArray([...array]);
  await sleep(50);
  if (index - 1 != undefined) {
    array[index].color = "blue";
  }
  setArray([...array]);
}
