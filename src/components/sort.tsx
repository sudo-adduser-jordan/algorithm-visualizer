import "../styles/sort.css";
import { useState } from "react";
import { shuffleArray } from "../lib/fisher-yates-shuffle";
import { selectionSort } from "../lib/selection-sort";

type Element = {
  key: number;
  color: string;
};

export default function Sort() {
  const [array, setArray] = useState<Element[]>(fillArray(10));
  // const [sortedArray, setSortedArray] = useState<number[]>([]);
  const [method, setMethod] = useState("Selection");

  function fillArray(n: number): Element[] {
    const arrayOfElements: Element[] = [];
    for (let i = 1; i <= n; i++) {
      arrayOfElements.push({ key: i, color: "blue" });
    }
    return shuffleArray(arrayOfElements);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const amountOfElements = e.currentTarget.valueAsNumber;
    const arrayOfElements = fillArray(amountOfElements);
    setArray(arrayOfElements);
  }

  function sortArray() {
    let sortedArray: Element[] = [];

    switch (method) {
      case "Selection":
        sortedArray = selectionSort(array, array.length);
        break;
      case "Quick":
        // sortedArray = quickSort(array, array.length);
        break;
      case "Merge":
        // sortedArray = mergeSort(array, array.length);
        break;
      default:
        new Error("No sorting algorithm selected.");
    }

    setArray([...sortedArray]);
    // setArray([...array]);
    // setSortedArray([...sortedArray]);
  }
  console.log(array);
  return (
    <main className="container">
      <section>
        <input
          type="range"
          min="5"
          max="20"
          defaultValue="13"
          step="1"
          onChange={handleChange}
        />
      </section>

      <section className="box">
        {array.map((element) => (
          <div
            key={element.key}
            className="element"
            style={{
              height: `${element.key + 1}rem`,
              backgroundColor: element.color,
            }}
          >
            {element.key}
          </div>
        ))}
      </section>
      <button onClick={sortArray}>Sort</button>
    </main>
  );
}
