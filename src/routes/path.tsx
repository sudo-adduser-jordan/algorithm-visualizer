import "./path.css";
import { useEffect, useState } from "react";
import Node from "../components/node";
import { Grid, N, RowArray } from "../types";
import { dijkstra } from "../lib/path/dijkstra.js";
import { VscDebugStart, VscDebugStop } from "react-icons/vsc";

export default function Path() {
  const [grid, setGrid] = useState<Grid>([]);
  const [mouseClicked, setMouseClicked] = useState(false);
  const [mainClicked, setMainClicked] = useState("");
  const [startNode, setStartNode] = useState<N>();
  const [endNode, setEndNode] = useState<N>();
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    makeGrid();
    window.addEventListener("resize", () => {
      makeGrid();
    });
  }, []);

  function makeGrid() {
    if (animating) return;
    const row_size = Math.floor((window.innerHeight - 60) / 40);
    const column_size = Math.floor(window.innerWidth / 40);
    const start_x = Math.floor(Math.random() * row_size);
    const start_y = Math.floor(Math.random() * column_size);
    const end_x = Math.floor(Math.random() * row_size);
    const end_y = Math.floor(Math.random() * column_size);
    const grid: Grid = [];

    for (let i = 0; i < row_size; i++) {
      const row: RowArray = [];
      for (let j = 0; j < column_size; j++) {
        row.push({
          row: i,
          column: j,
          isStart: false,
          isEnd: false,
          isVisited: false,
          isShortestPath: false,
          isWall: false,
          distance: 0,
          prevNode: null,
        });
      }
      grid.push(row);
    }

    const startNode = grid[start_x][start_y];
    const endNode = grid[end_x][end_y];
    startNode.isStart = true;
    endNode.isEnd = true;

    setGrid([...grid]);
    setStartNode(startNode);
    setEndNode(endNode);
  }

  function handleMouseDown(row: number, column: number) {
    if (animating) return;

    setMouseClicked(true);
    const node = grid[row][column];
    if (node.isStart) {
      setMainClicked("start");
    }
    if (node.isEnd) {
      setMainClicked("end");
    }
    if (!node.isWall && !node.isStart && !node.isEnd) {
      node.isWall = true;
    } else {
      node.isWall = false;
    }
    setGrid([...grid]);
  }

  function handleMouseEnter(row: number, column: number) {
    if (animating) return;
    const node = grid[row][column];
    if (mouseClicked) {
      if (mainClicked == "start") {
        node.isStart = true;
        setStartNode(node);
      }
      if (mainClicked == "end") {
        node.isEnd = true;
        setEndNode(node);
      }
      if (node.isWall) {
        node.isWall = false;
      }
      if (!node.isWall && !node.isStart && !node.isEnd) {
        node.isWall = true;
      }
      setGrid([...grid]);
      setMouseClicked(true);
    }
  }

  function handleMouseLeave(row: number, column: number) {
    if (animating) return;
    if (mainClicked != "") {
      grid[row][column].isStart = false;
      grid[row][column].isEnd = false;
      setGrid([...grid]);
    }
  }

  function handleMouseUp() {
    if (animating) return;
    setMouseClicked(false);
    setMainClicked("");
  }

  function find() {
    if (animating) return;
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        if ((document.getElementById(`node-${i}-${j}`) as Element).className == "node_path")
          (document.getElementById(`node-${i}-${j}`) as Element).className = "node_";
        if ((document.getElementById(`node-${i}-${j}`) as Element).className == "node_visited") {
          (document.getElementById(`node-${i}-${j}`) as Element).className = "node_";
        }
      }
    }

    const { visited_nodes, shortestPath } = dijkstra(grid, startNode as N, endNode as N);
    function animate() {
      setAnimating(true);
      let i = 0;
      let j = 0;

      function animateVisited() {
        if (i == visited_nodes.length) {
          requestAnimationFrame(animatePath);
          return;
        }
        const node = grid[visited_nodes[i].row][visited_nodes[i].column];
        node.isVisited = true;
        if (!node.isStart && !node.isEnd) {
          (
            document.getElementById(
              `node-${visited_nodes[i].row}-${visited_nodes[i].column}`
            ) as Element
          ).className = "node_visited";
        }
        ++i;
        requestAnimationFrame(animateVisited);
      }

      function animatePath() {
        if (j == shortestPath.length) {
          setGrid(grid);
          setAnimating(false);
          return;
        }
        const node = grid[shortestPath[j].row][shortestPath[j].column];
        node.isShortestPath = true;
        if (!node.isStart && !node.isEnd) {
          (
            document.getElementById(
              `node-${shortestPath[j].row}-${shortestPath[j].column}`
            ) as Element
          ).className = "node_path";
        }
        ++j;
        requestAnimationFrame(animatePath);
      }

      requestAnimationFrame(animateVisited);
    }

    animate();
    setAnimating(false);
  }

  return (
    <main className="main-container">
      <section className="legend-container">
        <div className="legend-item">
          Wall = <div className="legend-wall" />
        </div>
        <div className="legend-item">
          Path = <div className="legend-path" />
        </div>
        <div>
          Start = <VscDebugStart size={25} />
        </div>
        <div className="legend-item">
          End = <VscDebugStop size={25} />
        </div>
      </section>

      <section className="grid-container"></section>
      <table>
        {grid.map((row, index) => {
          return (
            <tr className="table-row">
              {row.map((element, i) => {
                return (
                  <Node
                    row={index}
                    column={i}
                    isWall={element.isWall}
                    isStart={element.isStart}
                    isEnd={element.isEnd}
                    isVisited={element.isVisited}
                    isShortestPath={element.isShortestPath}
                    onMouseDown={(row: number, column: number) => handleMouseDown(row, column)}
                    onMouseEnter={(row: number, column: number) => handleMouseEnter(row, column)}
                    onMouseUp={() => handleMouseUp()}
                    onMouseLeave={(row: number, column: number) => handleMouseLeave(row, column)}
                  />
                );
              })}
            </tr>
          );
        })}
      </table>

      <section className="button-container">
        <button onClick={find}>Dijkshtra</button>
        <button
          className="button"
          onClick={() => {
            for (let i = 0; i < grid.length; i++) {
              for (let j = 0; j < grid[0].length; j++) {
                if ((document.getElementById(`node-${i}-${j}`) as Element).className == "node_path")
                  (document.getElementById(`node-${i}-${j}`) as Element).className = "node_";
                if (
                  (document.getElementById(`node-${i}-${j}`) as Element).className == "node_visited"
                ) {
                  (document.getElementById(`node-${i}-${j}`) as Element).className = "node_";
                }
              }
            }
            makeGrid();
          }}
        >
          Randomize
        </button>
      </section>
    </main>
  );
}
