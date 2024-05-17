import CustomNode from "../components/CustomNode";
import { PositionLoggerNode } from "./PositionLoggerNode";
import { Position } from "reactflow";

const nodeDefaults = {
  sourcePosition: Position.Right,
  targetPosition: Position.Left,
};

export const initialNodes = [
  {
    id: "a",
    type: "input",
    position: { x: 0, y: 0 },
    data: { label: "wire" },
    ...nodeDefaults,
  },
  {
    id: "b",
    type: "position-logger",
    position: { x: -100, y: 100 },
    data: { label: "drag me!" },
    ...nodeDefaults,
  },
  {
    id: "c",
    position: { x: 100, y: 100 },
    data: { label: "your ideas" },
    ...nodeDefaults,
  },
  {
    id: "d",
    type: "output",
    position: { x: 0, y: 200 },
    data: { label: "with React Flow" },
    ...nodeDefaults,
  },
];

export const nodeTypes = {
  "position-logger": PositionLoggerNode,
  "custom-node": CustomNode,
  // Add any of your custom nodes here!
};
