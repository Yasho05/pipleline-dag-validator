import { BaseNode } from "./BaseNode";
import { useState } from "react";

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_"),
  );
  const [inputType, setInputType] = useState(data.inputType || "Text");

  return (
    <BaseNode
      id={id}
      data={data}
      type="input"
      label="Input"
      outputs={[{ id: "value" }]}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <label
          style={{ fontSize: "12px", fontWeight: "500", color: "#64748b" }}
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
            }}
          />
        </label>
        <label
          style={{ fontSize: "12px", fontWeight: "500", color: "#64748b" }}
        >
          Type:
          <select
            value={inputType}
            onChange={(e) => setInputType(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "4px",
              border: "1px solid #e2e8f0",
              borderRadius: "6px",
              fontSize: "14px",
            }}
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
