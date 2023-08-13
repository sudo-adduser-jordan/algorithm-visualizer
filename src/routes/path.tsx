import { useState } from "react";
import "./path.css";
import Node from "../components/node";

function createNode(column: number, row: number) {
  return {
    column,
    row,
  };
}

function createGrid() {
  const grid = [];
  for (let row = 0; row < 50; row++) {
    const currentRow = [];
    for (let column = 0; column < 30; column++) {
      currentRow.push(createNode(column, row));
    }
    grid.push(currentRow);
  }
  return grid;
}

export default function Path() {
  const [grid, setGrid] = useState(createGrid());

  return (
    <main className="path-container">
      <section className="grid-container">
        {grid.map((row, rowIndex) => {
          return (
            <div key={rowIndex}>
              {row.map((node, nodeIndex) => {
                const { row, column } = node;
                return <Node key={nodeIndex} column={column} row={row} />;
              })}
            </div>
          );
        })}
      </section>
    </main>
  );
}
