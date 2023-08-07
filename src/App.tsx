import "./styles/App.css";
import { useState } from "react";

type Div = {
  key: number;
  width: number;
  height: number;
};

export default function App() {
  const [array, setArray] = useState<Div[]>(fillArray(10));

  function fillArray(n: number): Div[] {
    const arrayOfElements: Div[] = [];
    for (let i = 0; i < n; i++) {
      arrayOfElements.push({
        key: i,
        width: i,
        height: i,
      });
    }
    return arrayOfElements;
  }

  function changeArray() {
    // console.log("hit");
    setArray(array.slice(-1));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const amountOfElements = e.currentTarget.valueAsNumber;
    setArray(fillArray(amountOfElements));
  }

  // console.log(array);

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
            style={{
              width: `1.5rem`,
              height: `${element.height}rem`,
              margin: "1px",
              backgroundColor: "blue",
            }}
          />
        ))}
      </section>
      <button onClick={changeArray}>Sort</button>
    </main>
  );
}
