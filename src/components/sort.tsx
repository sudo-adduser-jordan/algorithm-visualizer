import "../styles/sort.css";
import { useState } from "react";
import { motion } from "framer-motion";
import { Bar, Results } from "../types";
import { shuffleArray } from "../lib/sort/fisher-yates-shuffle";
import { selectionSort } from "../lib/sort/selection-sort";
import { quickSort } from "../lib/sort/quick-sort";
import { mergeSort } from "../lib/sort/merge-sort";

const createArray = () => {
  let array: Bar[] = [];
  for (let i = 0; i < 15; i++) {
    array.push({
      id: "id-" + i,
      value: i,
      style: "",
    });
  }
  shuffleArray(array);
  return array;
};

export default function Sorting() {
  const [array, setArray] = useState<Bar[]>(createArray);

  function sort() {
    var results: Results = [];
    results = selectionSort(array);
    // results = quickSort(array);
    // results = mergeSort(array);
    for (let i = 0; i < results.length; i++) {
      setTimeout(() => {
        setArray(results[i]);
      }, 150 * i);
    }
  }

  return (
    <main className="main-container">
      <section className="bar-container">
        {array.map((element, index) => (
          <motion.div
            key={element.id}
            id={element.id}
            layout
            className={`bar ${element.style}`}
            style={{ height: `${element.value + 2}rem` }}
          >
            {element.value}
          </motion.div>
        ))}
      </section>
      <button className="button" onClick={sort}>
        Sort
      </button>
      {/* <button onClick={}>Selection Sort</button> */}
      {/* <button onClick={}>Quick Sort</button> */}
    </main>
  );
}
