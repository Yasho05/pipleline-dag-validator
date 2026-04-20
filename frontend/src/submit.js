import { useState } from "react";
import { useStore } from "./store";

export const SubmitButton = () => {
  const { nodes, edges } = useStore();

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null); // ✅ NEW

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://127.0.0.1:8000/pipelines/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nodes, edges }),
      });

      const data = await response.json();

      const resultText = `Pipeline Analysis

Nodes: ${data.num_nodes}
Edges: ${data.num_edges}
Is DAG: ${data.is_dag}`;

      setResult(resultText);

      setTimeout(() => {
        setResult(null);
      }, 4000);
    } catch (err) {
      setResult("❌ Something went wrong while submitting.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            padding: "14px 28px",
            fontSize: "15px",
            fontWeight: "600",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: loading ? "not-allowed" : "pointer",
            background: loading
              ? "#334155"
              : "linear-gradient(135deg, #3b82f6, #8b5cf6)",
            boxShadow: "0 0 35px rgba(139,92,246,0.6)",
            letterSpacing: "0.5px",
            transition: "all 0.25s ease",
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 0 40px rgba(139,92,246,0.7)";
            }
          }}
          onMouseLeave={(e) => {
            if (!loading) {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "0 0 25px rgba(59,130,246,0.5)";
            }
          }}
        >
          {loading ? "⏳ Processing..." : "🚀 Submit Pipeline"}
        </button>
      </div>

      {result && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            background: "#020617",
            padding: "16px",
            borderRadius: "10px",
            border: "1px solid #3b82f6",
            color: "white",
            boxShadow: "0 0 20px rgba(59,130,246,0.3)",
            whiteSpace: "pre-line",
            minWidth: "220px",
            fontSize: "13px",
          }}
        >
          {result}
        </div>
      )}
    </>
  );
};
