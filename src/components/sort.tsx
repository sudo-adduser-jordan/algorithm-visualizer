import "./sort.css";
import { useState } from "react";
import { motion } from "framer-motion";
import { BarArray, ResultArray } from "../types";

import { shuffleArray } from "../lib/sort/fisher-yates-shuffle";
import { selectionSort } from "../lib/sort/selection-sort";
import { quickSort } from "../lib/sort/quick-sort";
import { bubbleSort } from "../lib/sort/bubble-sort";

import Navigation from "./navigation";
import Button from "./button";

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
    <main className="main-container">
      <div className="bar-container">
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
      </div>

      <div className="button-container">
        <Button label="Selection Sort" method="Selection" sort={() => sort("Selection")} />
        <Button label="Bubble Sort" method="Bubble" sort={() => sort("Bubble")} />
        <Button label="Quick Sort" method="Quick" sort={() => sort("Quick")} />
        <button className="button" onClick={() => location.reload()}>
          Reload
        </button>
      </div>
    </main>
  );
}
