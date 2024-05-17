import React from "react";
import { Handle, Position } from "reactflow";
import "../css/CustomNode.css"; // Custom CSS for your node

const CustomNode = ({ data }) => {
  return (
    <div className="custom-node">
      <div className="custom-node-header">🗯️Send Messages</div>
      <div className="custom-node-body">{data.content}</div>
      <Handle
        type="source"
        position={Position.Right}
        className="custom-handle"
      />
      <Handle
        type="target"
        position={Position.Left}
        className="custom-handle"
      />
    </div>
  );
};

export default CustomNode;
