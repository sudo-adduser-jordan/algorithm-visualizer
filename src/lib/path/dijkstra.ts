import PriorityQueue from "ts-priority-queue";
import { Grid, N, RowArray } from "../../types";

export const dijkstra = (grid: Grid, startNode: number[], endNode: number[]) => {
  console.log("hit");
  const visited_nodes: RowArray = [];
  const shortestPath: RowArray = [];
  const queue = new PriorityQueue({
    comparator: function (a: any, b: any) {
      return b - a;
    },
  });
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      grid[i][j].distance = Infinity;
      grid[i][j].prevNode = null;
      grid[i][j].isVisited = false;
      grid[i][j].isShortestPath = false;
    }
  }
  grid[startNode[0]][startNode[1]].distance = 0;

  queue.queue(grid[startNode[0]][startNode[1]]);

  const dx = [1, 0, -1, 0];
  const dy = [0, 1, 0, -1];

  while (queue.length) {
    const cell: N = queue.dequeue();
    console.log(cell);
    if (grid[cell.row][cell.column].isVisited) continue;
    grid[cell.row][cell.column].isVisited = true;
    visited_nodes.push(cell);
    let flag = 0;
    for (let i = 0; i < 4; i++) {
      const x = cell.row + dx[i];
      const y = cell.column + dy[i];
      if (!isInsideGrid(grid, x, y)) continue;
      if (!grid[x][y].isVisited && (!grid[x][y].isWall || (x == endNode[0] && y == endNode[1]))) {
        if (x === endNode[0] && y === endNode[1]) {
          grid[x][y].isVisited = true;
          grid[x][y].prevNode = grid[cell.row][cell.column];
          let node = grid[x][y];
          while (node !== null) {
            shortestPath.unshift(node);
            node = node.prevNode as N;
            if (node) {
              node.isShortestPath = true;
              node.isVisited = false;
            }
          }
          flag = 1;
          break;
        }
        const dist = Math.abs(dx[i]) === 1 && Math.abs(dy[i]) === 1 ? 1.4 : 1;
        if (cell.distance + dist < grid[x][y].distance) {
          grid[x][y].prevNode = cell;
          grid[x][y].distance = cell.distance + dist;
        }
        queue.queue(grid[x][y]);
      }
    }
    if (flag == 1) break;
  }
  return { visited_nodes, shortestPath };
};

function isInsideGrid(grid: Grid, i: number, j: number) {
  return i >= 0 && i < grid.length && j >= 0 && j < grid[0].length;
}
