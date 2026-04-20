import { create } from "zustand";
import { addEdge, applyNodeChanges, applyEdgeChanges } from "reactflow";

let id = 0;
const getId = (type) => `${type}-${id++}`;

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],

  getNodeID: (type) => {
    return getId(type);
  },

  addNode: (node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },

  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection) => {
    set({
      edges: addEdge(
        {
          ...connection,
          type: "smoothstep",
          animated: true,
          style: {
            stroke: "#93c5fd",
            strokeWidth: 2.5,
          },
        },
        get().edges,
      ),
    });
  },
}));
