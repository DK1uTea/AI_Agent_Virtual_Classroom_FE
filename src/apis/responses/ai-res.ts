import { Edge, Node } from "@xyflow/react";


export type AIChatRes = {
  reply: string;
  intent: 'normal' | 'deep';
  createdAt: string;
}

export type AIMindMapRes = {
  mindmap: {
    nodes: Node[];
    edges: Edge[];
  };
  topic: string;
}