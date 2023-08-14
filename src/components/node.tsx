import "./node.css";

type NodeProps = {
  row: number;
  column: number;
  isWall: string;
  onMouseDown: (row: number, column: number) => void;
  onMouseEnter: (row: number, column: number) => void;
  onMouseUp: () => void;
};

export default function Node({
  row,
  column,
  isWall,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}: NodeProps) {
  return (
    <div
      id={`node-${row}-${column}`}
      className={`node ${isWall}`}
      onMouseDown={() => onMouseDown(row, column)}
      onMouseEnter={() => onMouseEnter(row, column)}
      onMouseUp={() => onMouseUp()}
      role="presentation"
    />
  );
}
