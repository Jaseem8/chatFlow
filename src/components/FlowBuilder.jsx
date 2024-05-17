// src/components/FlowBuilder.jsx
import React, { useRef, useState } from "react";
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
import { initialNodes, nodeTypes } from "../nodes";
import { initialEdges, edgeTypes } from "../edges";
import Cookies from "js-cookie";
let id = 0;
const getId = () => `dndnode_${id++}`;

const FlowBuilder = () => {
  const savedNodesCookie = Cookies.get("savedNodes");
  let savedNodes;
  if (savedNodesCookie) {
    // If the cookie exists, parse its value to retrieve the saved nodes
    savedNodes = JSON.parse(savedNodesCookie);
    console.log("Saved nodes:", savedNodes);
  } else {
    savedNodes = [];
  }

  const savedEdgesCookie = Cookies.get("savedEdges");
  let savedEdges;
  if (savedEdgesCookie) {
    // If the cookie exists, parse its value to retrieve the saved edges
    savedEdges = JSON.parse(savedEdgesCookie);
    console.log("Saved edges:", savedEdges);
  } else {
    savedEdges = [];
  }

  const [nodes, setNodes, onNodesChange] = useNodesState(savedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(savedEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [isNodeSelected, setisNodeSelected] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const dropPosition = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type: "custom-node",
        position: dropPosition,
        data: { label: `${type} node`, content: "Hello" },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );
  const onNodeClick = (event, node) => {
    setSelectedNode(node);
    setisNodeSelected(true);
    console.log(node);
  };
  const handleConfirm = (id, content) => {
    console.log(id, content);
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, content } } : node
      )
    );
    setSelectedNode(null);
  };
  const handleBack = () => {
    setSelectedNode(null);
  };
  return (
    <>
      <Save nodes={nodes} edges={edges} />
      <div className="flow-builder">
        <div className="reactflow-wrapper">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
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
        {!selectedNode && <NodesPanel />}
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
