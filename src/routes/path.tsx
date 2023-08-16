import "./path.css";
import { useState } from "react";
import Node from "../components/node";
import { motion } from "framer-motion";
import { VscDebugStart, VscDebugStop } from "react-icons/vsc";

type Matrix = RowArray[];
type RowArray = React.JSX.Element[];

function getRandomInt(max: number) {
  console.log(Math.floor(Math.random() * max));
  return Math.floor(Math.random() * max);
}

export default function Path() {
  const [start, setStart] = useState([0, 0]);
  const [end, setEnd] = useState([1, 1]);
  const [matrix, setMatrix] = useState<Matrix>(createMatrix());
  const [mouseIsPressed, setMousePresed] = useState(false);

  function createMatrix() {
    let matrix: Matrix = [];
    for (let row = 0; row < 75; row++) {
      const currentRow: RowArray = [];
      for (let column = 0; column < 30; column++) {
        currentRow.push(
          <Node
            column={column}
            row={row}
            isWall={false}
            isStart={row === start[0] && column === start[1]}
            isEnd={row === end[0] && column === end[1]}
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
    if (newMatrix[row][col].props.isWall === true) {
      newMatrix[row][col].props.isWall = false;
    } else if (newMatrix[row][col].props.isWall === false) {
      newMatrix[row][col].props.isWall = true;
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
                    isStart={row === start[0] && column === start[1]}
                    isEnd={row === end[0] && column === end[1]}
                    onMouseDown={(row, column) => handleMouseDown(row, column)}
                    onMouseEnter={(row, column) => handleMouseEnter(row, column)}
                    onMouseUp={() => handleMouseUp()}
                  />
                );
              })}
            </motion.div>
          );
        })}
      </section>
      <section className="button-container">
        <Button label="Dijkstra's" method="Dijkstra's" find={undefined} />
        <Button label="A*" method="A*" find={undefined} />
        <button
          className="button"
          onClick={() => {
            const s = [getRandomInt(30), getRandomInt(15)];
            const e = [getRandomInt(75), getRandomInt(30)];
            setStart(s);
            setEnd(e);
            setMatrix(createMatrix());
          }}
        >
          Randomize
        </button>
      </section>
    </main>
  );
}

type ButtonProps = {
  label: string;
  method: string;
  reload?: (method: string) => void;
  find?: (method: string) => void;
};

export function Button({ label, method, reload, find }: ButtonProps) {
  return (
    <button
      className="button"
      onClick={() => {
        if (reload) {
          reload(method);
        }
        if (find) {
          find(method);
        }
      }}
    >
      {label}
    </button>
  );
}
