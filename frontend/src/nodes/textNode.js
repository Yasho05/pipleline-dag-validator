import { useState, useEffect } from "react";
import { Handle, Position } from "reactflow";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const [variables, setVariables] = useState([]);

  useEffect(() => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const matches = [...currText.matchAll(regex)];
    const foundVars = matches.map((match) => match[1]);

    const uniqueVars = [...new Set(foundVars)];
    setVariables(uniqueVars);
  }, [currText]);

  return (
    <div
      style={{
        background: "linear-gradient(145deg, #1e293b 0%, #0f172a 100%)",
        border: "2px solid #f59e0b",
        borderRadius: "16px",
        minWidth: "300px",
        minHeight: "150px",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)",
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      {variables.map((varName, idx) => (
        <Handle
          key={varName}
          type="target"
          position={Position.Left}
          id={`${id}-${varName}`}
          style={{
            top: `${((idx + 1) / (variables.length + 1)) * 100}%`,
            background: "#3b82f6",
            width: "14px",
            height: "14px",
            border: "3px solid #1e293b",
          }}
        />
      ))}

      <div
        style={{
          background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
          padding: "12px 16px",
          borderRadius: "14px 14px 0 0",
          color: "white",
          fontWeight: "600",
          fontSize: "14px",
        }}
      >
        <span
          style={{
            background: "rgba(255, 255, 255, 0.3)",
            padding: "4px 8px",
            borderRadius: "6px",
            fontSize: "10px",
            fontWeight: "700",
            marginRight: "8px",
          }}
        ></span>
        Text
      </div>

      <div style={{ padding: "16px" }}>
        <label
          style={{
            fontSize: "12px",
            fontWeight: "500",
            color: "#94a3b8",
            display: "block",
            marginBottom: "8px",
          }}
        >
          Text:
        </label>
        <textarea
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          placeholder="Type {{ variableName }} for inputs"
          style={{
            width: "100%",
            minHeight: "80px",
            padding: "12px",
            background: "rgba(15, 23, 42, 0.6)",
            border: "1px solid rgba(100, 116, 139, 0.3)",
            borderRadius: "8px",
            fontSize: "14px",
            color: "#e2e8f0",
            resize: "vertical",
            fontFamily: "monospace",
            outline: "none",
          }}
        />
        {variables.length > 0 && (
          <div
            style={{
              marginTop: "8px",
              fontSize: "11px",
              color: "#60a5fa",
            }}
          >
            Variables: {variables.join(", ")}
          </div>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{
          background: "#10b981",
          width: "14px",
          height: "14px",
          border: "3px solid #1e293b",
        }}
      />
    </div>
  );
};
