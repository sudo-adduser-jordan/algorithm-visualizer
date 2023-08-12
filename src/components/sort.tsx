import "./sort.css";
import { useState } from "react";
import { motion } from "framer-motion";
import { BarArray, ResultArray } from "../types";
import { shuffleArray } from "../lib/sort/fisher-yates-shuffle";
import { selectionSort } from "../lib/sort/selection-sort";
// import { quickSort } from "../lib/sort/quick-sort";
// import { mergeSort } from "../lib/sort/merge-sort";

function createArray() {
  const array: BarArray = [];
  for (let i = 0; i < 15; i++) {
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
  const [speed, setSpeed] = useState(200);

  function sort() {
    let result: ResultArray = [];
    result = selectionSort(array);
    // results = quickSort(array);
    // results = mergeSort(array);
    for (let i = 0; i < result.length; i++) {
      setTimeout(() => {
        setArray(result[i]);
      }, speed * i);
    }
  }

  return (
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
      <button className="button" onClick={sort}>
        Sort
      </button>
      <button className="button" onClick={() => location.reload()}>
        Reload
      </button>
      {/* <button onClick={}>Selection Sort</button> */}
      {/* <button onClick={}>Quick Sort</button> */}
    </main>
  );
}
