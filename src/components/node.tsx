import React, { Component } from "react";

import "./Node.css";

type NodeProps = {
  row: number;
  column: number;
};

export default function Node({ row, column }: NodeProps) {
  return <div id={`node-${row}-${column}`} className="node" />;
}
