import React, { useState, useEffect } from "react";
import "../css/SettingsPanel.css"; // Assuming you have a CSS file for styling

const SettingsPanel = ({ node, onConfirm, onBack }) => {
  // State to manage the content of the node
  const [content, setContent] = useState(node.data.content);

  // Update content state when the node prop changes
  useEffect(() => {
    setContent(node.data.content);
  }, [node]);

  // Event handler for content change
  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  // Event handler for confirming changes
  const handleConfirmClick = () => {
    onConfirm(node.id, content);
  };

  // Event handler for navigating back
  const handleBackClick = () => {
    onBack();
  };

  // State and effect for managing animation
  const [enter, setEnter] = useState(false);
  useEffect(() => {
    setEnter(true);
    return () => setEnter(false);
  }, [node]);

  return (
    <div
      className={`settings-panel ${
        enter ? "settings-panel-enter" : "settings-panel-exit"
      }`}
    >
      {/* Back button */}
      <button onClick={handleBackClick} className="back-button">
        ⬅️
      </button>
      {/* Heading */}
      <h3>Node Settings</h3>
      {/* Input field for editing content */}
      <label>Enter your Details:</label>
      <input
        type="text"
        value={content}
        onChange={handleContentChange}
        placeholder="Edit text here..."
      />
      {/* Confirm button */}
      <button onClick={handleConfirmClick} className="confirm">
        Confirm
      </button>
    </div>
  );
};

export default SettingsPanel;
