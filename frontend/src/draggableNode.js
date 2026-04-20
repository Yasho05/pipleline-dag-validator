export const DraggableNode = ({ type, label, color = "#3b82f6" }) => {
  const onDragStart = (event) => {
    const appData = { nodeType: type };
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData),
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      onDragStart={onDragStart}
      draggable
      style={{
        padding: "10px 14px",
        borderRadius: "999px",
        border: `1px solid ${color}55`,
        background: "rgba(15, 23, 42, 0.7)",
        color: "#e2e8f0",
        fontSize: "13px",
        fontWeight: "500",
        cursor: "grab",
        backdropFilter: "blur(8px)",
        transition: "all 0.2s ease",
        boxShadow: `0 0 10px ${color}33`,
        userSelect: "none",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 20px ${color}66`;
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `0 0 10px ${color}33`;
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {label}
    </div>
  );
};
