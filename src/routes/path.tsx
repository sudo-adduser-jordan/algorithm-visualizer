import "./path.css";
import { useState } from "react";
import Node from "../components/node";
import { motion } from "framer-motion";
import { VscDebugStart, VscDebugStop } from "react-icons/vsc";

type Matrix = RowArray[];
type RowArray = React.JSX.Element[];

export default function Path() {
  const [matrix, setMatrix] = useState<Matrix>(createMatrix());
  const [mouseIsPressed, setMousePresed] = useState(false);

  function createMatrix() {
    const matrix: Matrix = [];
    for (let row = 0; row < 50; row++) {
      const currentRow: RowArray = [];
      for (let column = 0; column < 30; column++) {
        currentRow.push(
          <Node
            column={column}
            row={row}
            isWall={""}
            onMouseDown={(row, col) => handleMouseDown(row, col)}
            onMouseEnter={(row, col) => handleMouseEnter(row, col)}
            onMouseUp={() => handleMouseUp()}
          />
        );
      }
      matrix.push(currentRow);
    }
    return matrix;
  }

  function handleMouseDown(row: number, column: number) {
    const newMatrix = getNewMatrix(matrix, row, column);
    setMatrix([...newMatrix]);
    setMousePresed(true);
  }

  function handleMouseEnter(row: number, column: number) {
    if (!mouseIsPressed) return;
    const newMatrix = getNewMatrix(matrix, row, column);
    setMatrix([...newMatrix]);
  }

  function handleMouseUp() {
    setMousePresed(false);
  }

  function getNewMatrix(matrix: Matrix, row: number, col: number): Matrix {
    const newMatrix = matrix.slice();
    if (newMatrix[row][col].props.isWall === "wall") {
      newMatrix[row][col].props.isWall = "";
    } else if (newMatrix[row][col].props.isWall === "") {
      newMatrix[row][col].props.isWall = "wall";
    }
    return newMatrix;
  }

  return (
    <main className="path-container">
      <section className="legend-container">
        <div className="legend-item">
          Wall = <div className="legend-wall"></div>
        </div>
        <div className="legend-item">
          Path = <div className="legend-path"></div>
        </div>
        <div className="legend-item">
          Start = <VscDebugStart size={25} />
        </div>
        <div className="legend-item">
          End = <VscDebugStop size={25} />
        </div>
      </section>
      <section className="grid-container">
        {matrix.map((row, rowIndex) => {
          return (
            <motion.div key={rowIndex}>
              {row.map((node, nodeIndex) => {
                const { row, column, isWall } = node.props;
                return (
                  <Node
                    key={nodeIndex}
                    row={row}
                    column={column}
                    isWall={isWall}
                    onMouseDown={(row, col) => handleMouseDown(row, col)}
                    onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                    onMouseUp={() => handleMouseUp()}
                  />
                );
              })}
            </motion.div>
          );
        })}
      </section>
    </main>
  );
}
