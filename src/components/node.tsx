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
  if (isStart) {
    wall = "";
  }
  if (isWall && isEnd) {
    wall = "";
  }

  return (
    <div
      id={`node-${row}-${column}`}
      className={`node ${wall}`}
      onMouseDown={() => onMouseDown(row, column)}
      onMouseEnter={() => onMouseEnter(row, column)}
      onMouseUp={() => onMouseUp()}
      role="presentation"
    >
      {isStart && <VscDebugStart size={20} />}
      {isEnd && <VscDebugStop size={20} />}
    </div>
  );
}
