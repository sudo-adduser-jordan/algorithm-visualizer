import { VscDebugStart, VscDebugStop } from "react-icons/vsc";

type NodeProps = {
  row: number;
  col: number;
  isWall: boolean;
  isStart: boolean;
  isEnd: boolean;
  isVisited: boolean;
  isShortestPath: boolean;
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
  onMouseUp: () => void;
  onMouseLeave: (row: number, col: number) => void;
};

export default function Node(props: NodeProps) {
  const {
    row,
    col,
    isWall,
    isStart,
    isEnd,
    isVisited,
    isShortestPath,
    onMouseDown,
    onMouseEnter,
    onMouseUp,
    onMouseLeave,
  } = props;

  const cName = isStart
    ? "start"
    : isEnd
    ? "end"
    : isWall
    ? "wall"
    : isShortestPath
    ? "path"
    : isVisited
    ? "visited"
    : "";

  return (
    <td
      className={"node_" + cName}
      id={`node-${row}-${col}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
      onMouseLeave={() => onMouseLeave(row, col)}
    >
      {isStart && <VscDebugStart size={20} />}
      {isEnd && <VscDebugStop size={20} />}
    </td>
  );
}
