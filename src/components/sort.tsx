import "../styles/sort.css";
import { useState } from "react";
import { shuffleArray } from "../lib/fisher-yates-shuffle";
import { selectionSort } from "../lib/selection-sort";

type Element = {
  value: number;
  color: string;
};

function fillArray(n: number): Element[] {
  const arrayOfElements: Element[] = [];
  for (let i = 1; i <= n; i++) {
    arrayOfElements.push({ value: i, color: "blue" });
  }
  return shuffleArray(arrayOfElements);
}

export default function Sort() {
  const [array, setArray] = useState<Element[]>(fillArray(100));
  const [method, setMethod] = useState("Selection");

  async function sortArray() {
    switch (method) {
      case "Selection":
        selectionSort({ array, setArray });
        break;
      case "Quick":
        // quickSort(array, array.length);
        break;
      case "Merge":
        // mergeSort(array, array.length);
        break;
      default:
        new Error("No sorting algorithm selected.");
    }
  }

  // console.log(array);
  return (
    <main className="container">
      <section className="box">
        {array.map((element) => (
          <div
            key={element.value}
            className="element"
            style={{
              height: `${element.value}%`,
              backgroundColor: element.color,
            }}
          />
        ))}
      </section>
      <button onClick={async () => sortArray()}>Sort</button>
      <button onClick={() => window.location.reload()}>Reload</button>
    </main>
  );
}
