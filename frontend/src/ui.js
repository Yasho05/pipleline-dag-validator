import { useState, useRef, useCallback } from "react";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";

import { InputNode } from "./nodes/inputNode";
import { LLMNode } from "./nodes/llmNode";
import { OutputNode } from "./nodes/outputNode";
import { TextNode } from "./nodes/textNode";

import "reactflow/dist/style.css";

const gridSize = 20;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  input: InputNode,
  customInput: InputNode,
  llm: LLMNode,
  output: OutputNode,
  customOutput: OutputNode,
  text: TextNode,
  customText: TextNode,
};
const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      if (!reactFlowInstance) return;

      const bounds = reactFlowWrapper.current.getBoundingClientRect();

      const raw = event.dataTransfer.getData("application/reactflow");
      if (!raw) return;

      const { nodeType: type } = JSON.parse(raw);
      if (!type) return;

      const position = reactFlowInstance.project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      const id = getNodeID(type);

      addNode({
        id,
        type,
        position,
        data: { id, nodeType: type },
      });
    },
    [reactFlowInstance, getNodeID, addNode],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <div
      ref={reactFlowWrapper}
      style={{
        width: "100vw",
        height: "100vh",
        background:
          "radial-gradient(circle at center, #0b1220 0%, #020617 100%)",
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
        defaultEdgeOptions={{
          style: {
            stroke: "#93c5fd",
            strokeWidth: 2.5,
            filter: "drop-shadow(0 0 10px #3b82f6)",
          },
          animated: true,
        }}
      >
        <Background color="#1e293b" gap={25} />

        <Controls
          style={{
            background: "#020617",
            color: "white",
            borderRadius: "8px",
          }}
        />

        <MiniMap
          nodeColor={() => "#3b82f6"}
          style={{
            background: "#020617",
            borderRadius: "8px",
          }}
        />
      </ReactFlow>
    </div>
  );
};
