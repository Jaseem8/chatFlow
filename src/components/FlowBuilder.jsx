// src/components/FlowBuilder.jsx
import React, { useState } from "react";
import { useCallback } from "react";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";
import NodesPanel from "./NodesPanel";
import SettingsPanel from "./SettingsPanel";
import Save from "./Save";
import "../css/FlowBuilder.css";
import { nodeTypes } from "../nodes";

import { toast } from "react-toastify";

// Initialize ID counter for nodes
let id;
// Load saved nodes from local storage if available
const savedNodesCookie = localStorage.getItem("savedNodes");
let savedNodes;
if (savedNodesCookie) {
  savedNodes = JSON.parse(savedNodesCookie);
  console.log("loaded Nodes", savedNodes);
  id = savedNodes.length;
} else {
  id = 0;
  savedNodes = [];
}

// Load saved edges from local storage if available
const savedEdgesCookie = localStorage.getItem("savedEdges");
let savedEdges;
if (savedEdgesCookie) {
  savedEdges = JSON.parse(savedEdgesCookie);
  console.log("Saved edges:", savedEdges);
} else {
  savedEdges = [];
}

// Function to generate a unique ID for nodes
const getId = () => `dndnode_${id++}`;

const FlowBuilder = () => {
  // State management for nodes, edges, and React Flow instance
  const [nodes, setNodes, onNodesChange] = useNodesState(savedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(savedEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);

  // Function to handle edge creation when connecting nodes
  const onConnect = useCallback(
    (params) => {
      const sourceHandleHasEdge = edges.some(
        (edge) =>
          edge.source === params.source &&
          edge.sourceHandle === params.sourceHandle
      );
      if (sourceHandleHasEdge) {
        toast.error(
          "Each Source can only have one handle originating from it",
          {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          }
        );
        return;
      }
      setEdges((eds) => addEdge(params, eds));
    },
    [edges, setEdges]
  );

  // Function to handle drag over event
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // Function to handle drop event
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

      if (type === "source" || type === "target") {
        return;
      }

      const dropPosition = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getId(),
        type: "custom-node",
        position: dropPosition,
        data: {
          label: `${type} node`,
          content: `Default Text ${id}`,
          hasError: false,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  // Function to handle node click event
  const onNodeClick = (event, node) => {
    setSelectedNode(node);
    console.log(node);
  };

  // Function to handle confirm action
  const handleConfirm = (id, content) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, content } } : node
      )
    );

    setSelectedNode(null);
  };

  // Function to handle back action
  const handleBack = () => {
    setSelectedNode(null);
  };

  return (
    <>
      {/* Save component to save the state of nodes and edges */}
      <Save nodes={nodes} edges={edges} setNodes={setNodes} />
      <div className="flow-builder">
        <div className="reactflow-wrapper">
          {/* React Flow component */}
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onNodesDelete={() => setSelectedNode(null)}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
          >
            <Background />
            <MiniMap />
            <Controls />
          </ReactFlow>
        </div>
        {/* Render NodesPanel if no node is selected */}
        {!selectedNode && <NodesPanel />}
        {/* Render SettingsPanel if a node is selected */}
        {selectedNode && (
          <SettingsPanel
            node={selectedNode}
            onConfirm={handleConfirm}
            onBack={handleBack}
          />
        )}
      </div>
    </>
  );
};

export default FlowBuilder;
