import { BaseNode } from "./BaseNode";

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      type="llm"
      label="LLM"
      inputs={[{ id: "system" }, { id: "prompt" }]}
      outputs={[{ id: "response" }]}
    >
      <div style={{ fontSize: "13px", color: "#64748b", lineHeight: "1.5" }}>
        <p style={{ margin: 0, fontWeight: "500" }}>This is a LLM.</p>
      </div>
    </BaseNode>
  );
};
