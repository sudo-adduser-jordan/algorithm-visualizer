import "./sort.css";
import { useState } from "react";
import { motion } from "framer-motion";
import { BarArray, ResultArray } from "../types";

import { shuffleArray } from "../lib/sort/fisher-yates-shuffle";
import { selectionSort } from "../lib/sort/selection-sort";
import { quickSort } from "../lib/sort/quick-sort";
import { bubbleSort } from "../lib/sort/bubble-sort";

import Button from "../components/button";

export default function Sort() {
  const [array, setArray] = useState<BarArray>(createArray);
  const [animating, setAnimating] = useState(false);
  const [speed] = useState(100);

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

    setAnimating(true);
    for (let i = 0; i < result.length; i++) {
      setTimeout(() => {
        setArray(result[i]);
      }, speed * i);
    }

    // Enable buttons after sort
    setTimeout(() => {
      setAnimating(false);
    }, speed * result.length);
  }

  return (
    <main className="sort-container">
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
        <Button
          label="Selection Sort"
          func={() => {
            if (animating) return;
            sort("Selection");
          }}
        />

        <Button
          label="Bubble Sort"
          func={() => {
            if (animating) return;
            sort("Bubble");
          }}
        />

        <Button
          label="Quick Sort"
          func={() => {
            if (animating) return;
            sort("Quick");
          }}
        />

        <button
          className="button"
          onClick={() => {
            if (animating) return;
            setArray(createArray);
          }}
        >
          Randomize
        </button>
      </div>
    </main>
  );
}
