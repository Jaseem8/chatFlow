import React, { useState, useEffect } from "react";
import "../css/SettingsPanel.css"; // Assuming you have a CSS file for styling

const SettingsPanel = ({ node, onConfirm, onBack }) => {
  const [content, setContent] = useState(node.data.content);

  useEffect(() => {
    setContent(node.data.content);
  }, [node]);

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleConfirmClick = () => {
    onConfirm(node.id, content);
  };

  const handleBackClick = () => {
    onBack();
  };
  return (
    <div className="settings-panel">
      <button onClick={handleBackClick} className="back-button">
        ⬅️
      </button>
      <h3>Node Settings</h3>
      <label>Enter your Details:</label>
      <input
        type="text"
        value={content}
        onChange={handleContentChange}
        placeholder="Edit text here..."
      />

      <button onClick={handleConfirmClick} className="confirm">
        Confirm
      </button>
    </div>
  );
};

export default SettingsPanel;
