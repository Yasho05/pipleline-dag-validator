import { DraggableNode } from "./draggableNode";

export const PipelineToolbar = () => {
  return (
    <div
      style={{
        padding: "14px 20px",
        background: "rgba(76, 29, 149, 0.4)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(139,92,246,0.3)",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <div
        style={{
          color: "#e2e8f0",
          fontWeight: "600",
          fontSize: "14px",
          letterSpacing: "0.3px",
        }}
      ></div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <DraggableNode type="customInput" label="Input" color="#3b82f6" />
        <DraggableNode type="llm" label="LLM" color="#8b5cf6" />
        <DraggableNode type="customOutput" label="Output" color="#10b981" />
        <DraggableNode type="text" label="Text" color="#f59e0b" />
      </div>
    </div>
  );
};
