# VectorShift Technical Assessment

## Overview

This project is a node-based pipeline builder built using **React (frontend)** and **FastAPI (backend)**. It allows users to visually construct workflows, connect nodes, and analyze the pipeline structure.

---

## Features

- Drag-and-drop node system using React Flow
- Custom nodes: Input, Text, LLM, Output
- Dynamic Text Node:
  - Supports `{{variable}}` syntax
  - Automatically generates input handles
  - Auto-resizes based on content
- Backend integration with FastAPI
- DAG validation using topological sort
- Modern dark-themed UI with animated edges

---

## Tech Stack

- **Frontend:** React, React Flow, Zustand
- **Backend:** FastAPI (Python)

---

## How to Run

### 1. Start Frontend

```bash
cd frontend
npm install
npm start
```
