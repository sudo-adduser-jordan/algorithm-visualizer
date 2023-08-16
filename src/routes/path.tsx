import "./path.css";
import React from "react";
import Node from "../components/node";
import { Grid, RowArray } from "../types";
import { dijkstra } from "../lib/path/dijkstra.js";
import { VscDebugStart, VscDebugStop } from "react-icons/vsc";

type PathProps = {
  props: null;
};

type PathState = {
  grid: RowArray[];
  mouseClicked: boolean;
  mainClicked: string;
  startNode: number[];
  endNode: number[];
  visited: number;
  shortestPath: number;
  animating: boolean;
};

export default class Path extends React.Component<PathProps, PathState> {
  constructor(props: PathProps) {
    super(props);
    this.state = {
      grid: [],
      mouseClicked: false,
      mainClicked: "",
      startNode: [],
      endNode: [],
      visited: 0,
      shortestPath: 0,
      animating: false,
    };
  }

  makeGrid = () => {
    if (this.state.animating) {
      return;
    }
    const row_size = Math.floor((window.innerHeight - 60) / 40);
    const column_size = Math.floor(window.innerWidth / 40);
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
        try {
          (document.getElementById(`node-${i}-${j}`) as Element).className = "node_";
        } catch {}
      }
      grid.push(row);
    }
    const start_x = Math.floor(Math.random() * row_size);
    const start_y = Math.floor(Math.random() * column_size);
    const end_x = Math.floor(Math.random() * row_size);
    const end_y = Math.floor(Math.random() * column_size);
    grid[start_x][start_y].isStart = true;
    grid[end_x][end_y].isEnd = true;

    this.setState({
      grid: grid,
      startNode: [start_x, start_y],
      endNode: [end_x, end_y],
      visited: 0,
      shortestPath: 0,
    });
  };
  componentDidMount() {
    this.makeGrid();
    window.addEventListener("resize", () => {
      this.makeGrid();
    });
  }
  handleMouseDown = (row: number, column: number) => {
    if (this.state.animating) return;
    const grid = this.state.grid;
    if (grid[row][column].isStart) {
      this.setState({
        mainClicked: "start",
      });
    } else if (grid[row][column].isEnd) {
      this.setState({
        mainClicked: "end",
      });
    }
    if (!grid[row][column].isWall && !grid[row][column].isStart && !grid[row][column].isEnd)
      grid[row][column].isWall = true;
    else if (grid[row][column].isWall) {
      grid[row][column].isWall = false;
    }
    this.setState({
      grid: grid,
      mouseClicked: true,
    });
  };
  handleMouseEnter = (row: number, column: number) => {
    if (this.state.animating) return;
    if (this.state.mouseClicked) {
      const grid = this.state.grid;
      if (this.state.mainClicked == "start") {
        grid[row][column].isStart = true;
        this.setState({
          startNode: [row, column],
        });
      } else if (this.state.mainClicked == "end") {
        grid[row][column].isEnd = true;
        this.setState({
          endNode: [row, column],
        });
      } else if (
        !grid[row][column].isWall &&
        !grid[row][column].isStart &&
        !grid[row][column].isEnd
      )
        grid[row][column].isWall = true;
      else if (grid[row][column].isWall) {
        grid[row][column].isWall = false;
      }
      this.setState({
        grid: grid,
        mouseClicked: true,
      });
    }
  };
  handleMouseLeave = (row: number, column: number) => {
    if (this.state.animating) return;
    const grid = this.state.grid;
    if (this.state.mainClicked != "") {
      grid[row][column].isStart = false;
      grid[row][column].isEnd = false;
      this.setState({
        grid: grid,
      });
    }
  };
  handleMouseUp = () => {
    if (this.state.animating) return;
    this.setState({
      mouseClicked: false,
      mainClicked: "",
    });
  };
  isInsideGrid = (i: number, j: number) => {
    return i >= 0 && i < this.state.grid.length && j >= 0 && j < this.state.grid[0].length;
  };
  dijkshtra = () => {
    if (this.state.animating) return;
    const grid = this.state.grid;
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        if ((document.getElementById(`node-${i}-${j}`) as Element).className == "node_path")
          (document.getElementById(`node-${i}-${j}`) as Element).className = "node_";
        if ((document.getElementById(`node-${i}-${j}`) as Element).className == "node_visited") {
          (document.getElementById(`node-${i}-${j}`) as Element).className = "node_";
        }
      }
    }

    const { visited_nodes, shortestPath } = dijkstra(
      this.state.grid,
      this.state.startNode,
      this.state.endNode
    );

    const animate = async () => {
      let i = 0;
      let j = 0;
      // this.state.animating = true;
      const animateVisited = () => {
        if (i == visited_nodes.length) {
          requestAnimationFrame(animatePath);
          return;
        }
        grid[visited_nodes[i].row][visited_nodes[i].column].isVisited = true;
        if (
          !grid[visited_nodes[i].row][visited_nodes[i].column].isStart &&
          !grid[visited_nodes[i].row][visited_nodes[i].column].isEnd
        )
          (
            document.getElementById(
              `node-${visited_nodes[i].row}-${visited_nodes[i].column}`
            ) as Element
          ).className = "node_visited";
        ++i;
        requestAnimationFrame(animateVisited);
        // setTimeout(() => {
        // }, 1000 / 1000);
      };

      const animatePath = () => {
        if (j == shortestPath.length) {
          this.setState({
            grid: grid,
            visited: visited_nodes.length,
            shortestPath: shortestPath.length,
          });
          // this.state.animating = false;
          return;
        }
        grid[shortestPath[j].row][shortestPath[j].column].isShortestPath = true;

        if (
          !grid[shortestPath[j].row][shortestPath[j].column].isStart &&
          !grid[shortestPath[j].row][shortestPath[j].column].isEnd
        )
          (
            document.getElementById(
              `node-${shortestPath[j].row}-${shortestPath[j].column}`
            ) as Element
          ).className = "node_path";
        ++j;

        requestAnimationFrame(animatePath);
      };
      requestAnimationFrame(animateVisited);
    };
    animate();
  };

  render() {
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
          {this.state.grid.map((row, index) => {
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
                      onMouseDown={(row: number, column: number) =>
                        this.handleMouseDown(row, column)
                      }
                      onMouseEnter={(row: number, column: number) =>
                        this.handleMouseEnter(row, column)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      onMouseLeave={(row: number, column: number) =>
                        this.handleMouseLeave(row, column)
                      }
                    />
                  );
                })}
              </tr>
            );
          })}
        </table>
        <section className="button-container">
          <button onClick={this.dijkshtra}>Dijkshtra</button>
          <button className="button" onClick={() => this.makeGrid()}>
            Randomize
          </button>
        </section>
      </main>
    );
  }
}
