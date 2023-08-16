import { VscDebugStart, VscDebugStop } from "react-icons/vsc";

type NodeProps = {
  row: number;
  column: number;
  isWall: boolean;
  isStart: boolean;
  isEnd: boolean;
  isVisited: boolean;
  isShortestPath: boolean;
  onMouseDown: (row: number, column: number) => void;
  onMouseEnter: (row: number, column: number) => void;
  onMouseUp: () => void;
  onMouseLeave: (row: number, column: number) => void;
};

export default function Node(props: NodeProps) {
  const {
    row,
    column,
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
      id={`node-${row}-${column}`}
      onMouseDown={() => onMouseDown(row, column)}
      onMouseEnter={() => onMouseEnter(row, column)}
      onMouseUp={() => onMouseUp()}
      onMouseLeave={() => onMouseLeave(row, column)}
    >
      {isStart && <VscDebugStart size={20} />}
      {isEnd && <VscDebugStop size={20} />}
    </td>
  );
}
