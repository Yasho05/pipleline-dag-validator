from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from collections import defaultdict, deque

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Node(BaseModel):
    id: str

class Edge(BaseModel):
    source: str
    target: str

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]



def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    node_ids = {node.id for node in nodes}
    graph = defaultdict(list)
    indegree = {node.id: 0 for node in nodes}

    for edge in edges:
        if edge.source not in node_ids or edge.target not in node_ids:
            raise ValueError(f"Invalid edge: {edge.source} -> {edge.target}")

        graph[edge.source].append(edge.target)
        indegree[edge.target] += 1

    queue = deque([n for n in indegree if indegree[n] == 0])
    visited = 0

    while queue:
        node = queue.popleft()
        visited += 1

        for neighbor in graph[node]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)

    return visited == len(nodes)



@app.get("/")
def read_root():
    return {"Ping": "Pong"}

@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):
    try:
        num_nodes = len(pipeline.nodes)
        num_edges = len(pipeline.edges)

        dag = is_dag(pipeline.nodes, pipeline.edges)

        return {
            "num_nodes": num_nodes,
            "num_edges": num_edges,
            "is_dag": dag,
            "message": "Valid DAG" if dag else "Cycle detected",
        }

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))