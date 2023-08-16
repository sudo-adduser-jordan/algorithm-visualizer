export type ResultArray = BarArray[];
export type BarArray = Bar[];
export type Bar = {
  value: number;
  backgroundColor: string;
};

type Grid = RowArray[];
type RowArray = N[];
type N = {
  value: number;
  row: number;
  column: number;
  isStart: boolean;
  isEnd: boolean;
  isVisited: boolean;
  isShortestPath: boolean;
  isWall: boolean;
  style: string;
};
