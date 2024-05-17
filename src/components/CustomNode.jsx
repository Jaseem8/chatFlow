import React from "react";
import { Handle, Position } from "reactflow";
import "../css/CustomNode.css"; // Custom CSS for your node
import chatImage from "../images/whatsapp.png";
const CustomNode = ({ data }) => {
  return (
    <div className="custom-node">
      <div className="custom-node-header">
        🗯️Send Messages
        <img src={chatImage} alt="Messages" />
      </div>
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
