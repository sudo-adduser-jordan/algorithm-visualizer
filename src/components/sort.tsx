import "../styles/sort.css";
import { useState } from "react";
import { shuffleArray } from "../lib/fisher-yates-shuffle";
import { selectionSort } from "../lib/selection-sort";

export default function Sort() {
  const [array, setArray] = useState<number[]>(fillArray(10));
  const [method, setMethod] = useState("Selection");

  function fillArray(n: number): number[] {
    const arrayOfElements: number[] = [];
    for (let i = 1; i <= n; i++) {
      arrayOfElements.push(i);
    }
    return shuffleArray(arrayOfElements);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const amountOfElements = e.currentTarget.valueAsNumber;
    const arrayOfElements = fillArray(amountOfElements);
    setArray(arrayOfElements);
  }

  function sortArray() {
    let sortedArray: number[] = [];

    switch (method) {
      case "Selection":
        sortedArray = selectionSort(array, array.length);
        break;
      case "Quick":
        break;
      case "Merge":
        break;
      default:
        new Error("No sorting algorithm selected.");
    }

    setArray([...sortedArray]);
  }

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
        {array.map((i) => (
          <div
            key={i}
            style={{
              width: `1.75rem`,
              height: `${i + 1}rem`,
              margin: "1px",
              backgroundColor: "blue",
              textAlign: "center",
            }}
          >
            {i}
          </div>
        ))}
      </section>
      <button onClick={sortArray}>Sort</button>
    </main>
  );
}
