import React from "react";
import { Handle, Position } from "reactflow";
import "../css/CustomNode.css"; // Custom CSS for your node
import chatImage from "../images/whatsapp.png";

const CustomNode = ({ id, data, deleteHandler }) => {
  const hasError = data.hasError || false;

  return (
    <div className={`custom-node ${hasError ? "error-node" : ""}`}>
      <div className="custom-node-header">
        {/* Node header with icon */}
        🗯️Send Messages
        <img src={chatImage} alt="Messages" />
        {/* Delete button with tooltip */}
        <button className="delete-button">
          {/* Delete icon */}X{/* Tooltip */}
          <span className="tooltip">
            To delete an element, select the element and press Backspace on your
            keyboard
          </span>
        </button>
      </div>
      {/* Node content */}
      <div className="custom-node-body">{data.content}</div>
      {/* Handles for connecting edges */}
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
      {/* Additional handles if needed */}
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
