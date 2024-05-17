import React, { useState } from "react";
import Cookies from "js-cookie"; // Import Cookies library for managing cookies
import "../css/SaveButton.css";

const Save = ({ nodes, edges }) => {
  const [saving, setSaving] = useState(false);

  const saveHandler = () => {
    setSaving(true); // Set saving state to true to indicate saving is in progress
    // Save nodes to cookies
    Cookies.set("savedNodes", JSON.stringify(nodes), { expires: 7 });
    Cookies.set("savedEdges", JSON.stringify(edges), { expires: 7 });

    // Simulate asynchronous saving with setTimeout
    setTimeout(() => {
      setSaving(false); // Set saving state back to false after saving is complete
      console.log("Nodes saved:", edges);
      console.log("Nodes saved:", nodes);
    }, 1000); // Simulate a 2-second delay
  };

  return (
    <div className="wrapper">
      <button className="save-button" onClick={saveHandler} disabled={saving}>
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

export default Save;
