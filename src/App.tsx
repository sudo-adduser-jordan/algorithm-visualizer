import "./styles/App.css";
import { useState } from "react";
import { shuffleArray } from "./lib/fisher-yates-shuffle";

export default function App() {
  const [array, setArray] = useState<number[]>(fillArray(10));

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

  // console.log(array);
  function sortArray() {
    const sortedArray = array.sort(function (a, b) {
      return a - b;
    });
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
              width: `1.5rem`,
              height: `${i}rem`,
              margin: "1px",
              backgroundColor: "blue",
            }}
          />
        ))}
      </section>
      <button onClick={sortArray}>Sort</button>
    </main>
  );
}
