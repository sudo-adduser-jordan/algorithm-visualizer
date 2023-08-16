import "./node.css";
import { VscDebugStart, VscDebugStop } from "react-icons/vsc";

type NodeProps = {
  row: number;
  column: number;
  isWall: boolean;
  isStart: boolean;
  isEnd: boolean;
  onMouseDown: (row: number, column: number) => void;
  onMouseEnter: (row: number, column: number) => void;
  onMouseUp: () => void;
};

export default function Node({
  row,
  column,
  isWall,
  isStart,
  isEnd,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}: NodeProps) {
  let wall = isWall ? "node-wall" : "";
  if (isWall) {
    wall = "node-wall";
  }
  if (isStart) {
    wall = "";
  }
  if (isWall && isEnd) {
    wall = "";
  }

  const start = isStart ? `node-start` : "";
  const end = isEnd ? "node-end" : "";
  return (
    <div
      id={`node-${row}-${column}`}
      className={`node ${wall} ${start} ${end}`}
      onMouseDown={() => onMouseDown(row, column)}
      onMouseEnter={() => onMouseEnter(row, column)}
      onMouseUp={() => onMouseUp()}
      role="presentation"
    >
      {start && <VscDebugStart size={20} />}
      {end && <VscDebugStop size={20} />}
    </div>
  );
}
