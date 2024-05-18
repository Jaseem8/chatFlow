import React from "react";
import { Handle, Position } from "reactflow";
import "../css/CustomNode.css"; // Custom CSS for your node
import chatImage from "../images/whatsapp.png";

const CustomNode = ({ data }) => {
  const hasError = data.hasError || false;
  return (
    <div className={`custom-node ${hasError ? "error-node" : ""}`}>
      <div className="custom-node-header">
        🗯️Send Messages
        <img src={chatImage} alt="Messages" />
      </div>
      <div className="custom-node-body">{data.content}</div>
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className="custom-handle1"
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        className="custom-handle2"
      />
      {/* <Handle
        type="target"
        position={Position.Left}
        id="bottom-left"
        className="custom-handle-bottom"
      /> */}
    </div>
  );
};

export default CustomNode;
