// src/components/NodesPanel.jsx
import React, { useEffect, useState } from "react";
import chatImage from "../images/chat2.png";
import "../css/NodesPanel.css"; // Assuming you have a CSS file for styling

const NodesPanel = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  const [enter, setEnter] = useState(false);

  useEffect(() => {
    setEnter(true);
    return () => setEnter(false);
  }, []);
  return (
    <aside
      className={`nodes-panel ${
        enter ? "nodes-panel-enter" : "nodes-panel-exit"
      }`}
    >
      <div
        className="node-item"
        onDragStart={(event) => onDragStart(event, "Messages")}
        draggable
      >
        <img src={chatImage} alt="Messages" />
        <div>Messages</div>
      </div>
    </aside>
  );
};

export default NodesPanel;
