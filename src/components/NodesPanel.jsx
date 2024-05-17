// src/components/NodesPanel.jsx
import React from "react";

import "../css/NodesPanel.css"; // Assuming you have a CSS file for styling

const NodesPanel = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="nodes-panel">
      <div
        className="node-item"
        onDragStart={(event) => onDragStart(event, "Messages")}
        draggable
      >
        <img src="../images/chat2.png" />
        <div>Messages</div>
      </div>
    </aside>
  );
};

export default NodesPanel;