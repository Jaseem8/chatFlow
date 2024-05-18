import React, { useState } from "react";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/SaveButton.css";

const SaveButton = ({ nodes, edges, setNodes }) => {
  const [isSaving, setIsSaving] = useState(false);

  const hasEmptyHandles = (node) => {
    const hasSourceHandle = edges.some((edge) => edge.source === node.id);
    const hasTargetHandle = edges.some((edge) => edge.target === node.id);
    return !(hasSourceHandle || hasTargetHandle);
  };

  const validateNodes = () => {
    if (nodes.length <= 1) return true;

    const nodesWithEmptyHandles = nodes.filter(hasEmptyHandles);
    return nodesWithEmptyHandles.length === 0;
  };

  const saveHandler = () => {
    if (!validateNodes()) {
      // Set hasError property to true for nodes with empty handles
      const updatedNodes = nodes.map((node) => {
        if (hasEmptyHandles(node)) {
          return { ...node, data: { ...node.data, hasError: true } };
        }
        return node;
      });

      // Update nodes state
      setNodes(updatedNodes);
      toast.error("Error: There is a Node with empty handle.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    // Reset hasError property for all nodes to false
    const updatedNodes = nodes.map((node) => ({
      ...node,
      data: { ...node.data, hasError: false },
    }));
    setNodes(updatedNodes);
    setIsSaving(true);

    // Save nodes and edges to cookies
    localStorage.setItem("savedNodes", JSON.stringify(updatedNodes));
    localStorage.setItem("savedEdges", JSON.stringify(edges));

    setTimeout(() => {
      setIsSaving(false);
      toast.success("Your Current WorkFlow Is Saved", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      console.log("Nodes and edges saved:", { nodes, edges });
    }, 1000);
  };

  return (
    <div className="wrapper">
      <ToastContainer />
      <button className="save-button" onClick={saveHandler}>
        {isSaving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

export default SaveButton;
