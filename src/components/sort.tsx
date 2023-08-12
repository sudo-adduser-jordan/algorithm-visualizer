import "./sort.css";
import { useState } from "react";
import { motion } from "framer-motion";
import { BarArray, ResultArray } from "../types";
import { shuffleArray } from "../lib/sort/fisher-yates-shuffle";
import { selectionSort } from "../lib/sort/selection-sort";
import { quickSort } from "../lib/sort/quick-sort";
import { bubbleSort } from "../lib/sort/bubble-sort";
import Navigation from "./navigation";
// import { mergeSort } from "../lib/sort/merge-sort";

function createArray() {
  const array: BarArray = [];
  for (let i = 0; i < 16; i++) {
    array.push({
      value: i,
      backgroundColor: "var(--default-bar)",
    });
  }
  shuffleArray(array);
  return array;
}

export default function Sorting() {
  const [array, setArray] = useState<BarArray>(createArray);
  // const [speed, setSpeed] = useState(100);
  const [speed] = useState(100);

  function sort(method: string) {
    let result: ResultArray = [];

    switch (method) {
      case "Selection":
        result = selectionSort(array);
        break;
      case "Bubble":
        result = bubbleSort(array);
        break;
      case "Quick":
        result = quickSort(array);
        break;
      default:
        console.log(new Error());
    }

    for (let i = 0; i < result.length; i++) {
      setTimeout(() => {
        setArray(result[i]);
      }, speed * i);
    }
  }

  return (
    <>
      <Navigation />
      <main className="main-container">
        <section className="bar-container">
          {array.map((element) => (
            <motion.div
              key={element.value}
              layout
              className="bar"
              style={{
                height: `${element.value + 2}rem`,
                backgroundColor: element.backgroundColor,
              }}
            >
              {element.value}
            </motion.div>
          ))}
        </section>
        <button
          className="button"
          onClick={() => {
            sort("Selection");
          }}
        >
          Selection Sort
        </button>
        <button
          className="button"
          onClick={() => {
            sort("Bubble");
          }}
        >
          Bubble Sort
        </button>
        <button
          className="button"
          onClick={() => {
            sort("Quick");
          }}
        >
          Quick Sort
        </button>
        {/* <button onClick={}>Quick Sort</button> */}
        <button className="button" onClick={() => location.reload()}>
          Reload
        </button>
      </main>
    </>
  );
}
