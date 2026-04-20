import { Handle, Position } from "reactflow";

const nodeColors = {
  input: "#3b82f6",
  output: "#10b981",
  llm: "#8b5cf6",
  text: "#f59e0b",
};

export const BaseNode = ({
  id,
  type = "default",
  label,
  inputs = [],
  outputs = [],
  children,
}) => {
  const color = nodeColors[type] || "#3b82f6";

  return (
    <div
      style={{
        position: "relative",
        background: "linear-gradient(145deg, #1e293b, #0f172a)",
        border: `1px solid ${color}33`,
        borderRadius: "16px",
        minWidth: "220px",
        overflow: "hidden",
        boxShadow: `
          0 10px 30px rgba(0,0,0,0.6),
          0 0 20px ${color}22
        `,
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.03)";
        e.currentTarget.style.boxShadow = `
          0 12px 40px rgba(0,0,0,0.8),
          0 0 30px ${color}55
        `;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = `
          0 10px 30px rgba(0,0,0,0.6),
          0 0 20px ${color}22
        `;
      }}
    >
      {inputs.map((_, idx) => (
        <Handle
          key={`input-${idx}`}
          type="target"
          position={Position.Left}
          id={`${id}-input-${idx}`}
          style={{
            top: `${((idx + 1) / (inputs.length + 1)) * 100}%`,
            background: color,
            width: "12px",
            height: "12px",
            border: "2px solid #020617",
            boxShadow: `0 0 8px ${color}`,
            transform: "translateY(-50%)",
          }}
        />
      ))}

      <div
        style={{
          background: `linear-gradient(135deg, ${color}, ${color}99)`,
          padding: "12px 16px",
          color: "white",
          fontWeight: "600",
          fontSize: "13px",
          letterSpacing: "0.5px",
        }}
      >
        {label}
      </div>

      <div
        style={{
          padding: "14px",
          color: "#e2e8f0",
          fontSize: "13px",
        }}
      >
        {children}
      </div>

      {outputs.map((_, idx) => (
        <Handle
          key={`output-${idx}`}
          type="source"
          position={Position.Right}
          id={`${id}-output-${idx}`}
          style={{
            top: `${((idx + 1) / (outputs.length + 1)) * 100}%`,
            background: color,
            width: "12px",
            height: "12px",
            border: "2px solid #020617",
            boxShadow: `0 0 8px ${color}`,
            transform: "translateY(-50%)",
          }}
        />
      ))}
    </div>
  );
};
