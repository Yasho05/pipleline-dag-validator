import { BaseNode } from "./BaseNode";
import { useState } from "react";

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_"),
  );
  const [outputType, setOutputType] = useState(data.outputType || "Text");

  return (
    <BaseNode
      id={id}
      data={data}
      type="output"
      label="Output"
      inputs={[{ id: "value" }]}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <label
          style={{
            fontSize: "12px",
            fontWeight: "500",
            color: "#94a3b8", // softer gray for dark UI
          }}
        >
          Name:
          <input
            type="text"
            value={currName}
            onChange={(e) => setCurrName(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "4px",
              background: "#020617",
              color: "#e2e8f0",
              border: "1px solid #334155",
              borderRadius: "6px",
              fontSize: "14px",
              outline: "none",
            }}
          />
        </label>

        <label
          style={{
            fontSize: "12px",
            fontWeight: "500",
            color: "#94a3b8",
          }}
        >
          Type:
          <select
            value={outputType}
            onChange={(e) => setOutputType(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "4px",
              background: "#020617",
              color: "#e2e8f0",
              border: "1px solid #334155",
              borderRadius: "6px",
              fontSize: "14px",
              outline: "none",
            }}
          >
            <option value="Text">Text</option>
            <option value="Image">Image</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
