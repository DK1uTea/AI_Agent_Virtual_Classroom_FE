'use client'
import { useAIMindMap } from '@/hooks/useAIAgent';
import { useAuthStore } from '@/stores/auth-store';
import { useLessonStore } from '@/stores/lesson-store';
import {
  Background,
  Controls,
  MiniMap,
  Node,
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  NodeChange,
  EdgeChange,
  Connection,
  Edge,
  Panel,
  useReactFlow,
  ReactFlowProvider,
  useNodesState,
  useEdgesState
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useShallow } from 'zustand/shallow';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import ELK, { ElkNode } from 'elkjs/lib/elk.bundled.js';

const elk = new ELK();

const useLayoutedElements = () => {
  const { getNodes, setNodes, getEdges, fitView } = useReactFlow();
  const defaultOptions = {
    'elk.algorithm': 'layered',
    'elk.layered.spacing.nodeNodeBetweenLayers': '100',
    'elk.spacing.nodeNode': '80',
  };

  const getLayoutedElements = useCallback((options: Record<string, string>) => {
    const layoutOptions = { ...defaultOptions, ...options };
    const graph: ElkNode = {
      id: 'root',
      layoutOptions,
      children: getNodes()
        .filter((node) => node.measured?.width && node.measured?.height)
        .map((node) => ({
          ...node,
          width: node.measured!.width,
          height: node.measured!.height,
        })),
      edges: getEdges().map((edge) => ({
        id: edge.id,
        sources: [edge.source],
        targets: [edge.target],
      })),
    };

    elk.layout(graph).then(({ children }) => {
      // By mutating the children in-place we save ourselves from creating a
      // needless copy of the nodes array.
      if (children) {
        children.forEach((node: any) => {
          node.position = { x: node.x, y: node.y };
        });

        setNodes(children as Node[]);
        fitView();
      }
    });
  }, [getNodes, getEdges, setNodes, fitView]);

  return { getLayoutedElements };
};

const LayoutFlow = ({ isLayout }: { isLayout: boolean }) => {

  const { theme, systemTheme } = useTheme();

  const actualTheme = useMemo(() => {
    return theme === "system" ? systemTheme : theme;
  }, [theme, systemTheme]);

  const {
    accessToken,
  } = useAuthStore(useShallow((state) => ({
    accessToken: state.accessToken,
  })));

  const {
    currentLesson,
    isMindMapDialogOpen,
    toggleMindMapDialog
  } = useLessonStore(useShallow((state) => ({
    currentLesson: state.currentLesson,
    isMindMapDialogOpen: state.ui.isMindMapDialogOpen,
    toggleMindMapDialog: state.toggleMindMapDialog,
  })));

  // const [nodesData, setNodesData] = useState<Node[]>([]);
  // const [edgesData, setEdgesData] = useState<Edge[]>([]);


  // const onNodesChange = useCallback(
  //   (changes: NodeChange[]) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
  //   [],
  // );
  // const onEdgesChange = useCallback(
  //   (changes: EdgeChange[]) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
  //   [],
  // );
  // const onConnect = useCallback(
  //   (params: Connection) => setEdgesData((edgesSnapshot) => addEdge(params, edgesSnapshot)),
  //   [],
  // );

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const { getLayoutedElements } = useLayoutedElements();

  const mindMapQuery = useAIMindMap(
    {
      accessToken: accessToken,
      lessonId: String(currentLesson?.id),
    },
  )

  useEffect(() => {
    if (mindMapQuery.data) {
      setNodes(mindMapQuery.data.mindmap.nodes);
      setEdges(mindMapQuery.data.mindmap.edges.map((edge) => ({
        ...edge,
        animated: true,
        style: { strokeWidth: 2 },
      })));
    }
  }, [mindMapQuery.data])


  if (mindMapQuery.isLoading) {
    return (
      <div className="flex flex-col items-center gap-6 animate-fade-in h-full justify-center">

        {/* Spinner wrapper */}
        <div className="relative h-12 w-12 flex items-center justify-center">

          {/* Spinner border */}
          <div className="absolute inset-0 rounded-full border-[16px] border-transparent border-t-primary border-r-purple-500 animate-spin" />

          {/* Inner circle with spacing */}
          <div className="relative z-10 h-10 w-10 rounded-full bg-background flex items-center justify-center shadow-md">

            {/* Logo */}
            <Image
              src="/AI_Classroom_Logo.png"
              alt="logo"
              width={64}
              height={64}
              className="rounded-full object-cover"
              priority
            />
          </div>
        </div>

        <p className="text-base text-muted-foreground tracking-wide">
          Generating mind map...
        </p>
      </div>
    )
  }

  return (
    <ReactFlow
      colorMode={actualTheme as "light" | "dark"}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
    >
      <Controls />
      <MiniMap />
      <Background gap={12} size={1} />
      <Panel className='flex items-center justify-start gap-2'>
        <Button variant="outline" onClick={() => toggleMindMapDialog(!isMindMapDialogOpen)}>
          <Eye className="h-4 w-4" />
        </Button>
        {isLayout && (
          <>
            <Button
              variant="outline"
              onClick={() =>
                getLayoutedElements({
                  'elk.algorithm': 'layered',
                  'elk.direction': 'DOWN',
                })
              }
            >
              vertical layout
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                getLayoutedElements({
                  'elk.algorithm': 'layered',
                  'elk.direction': 'RIGHT',
                })
              }
            >
              horizontal layout
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                getLayoutedElements({
                  'elk.algorithm': 'org.eclipse.elk.radial',
                })
              }
            >
              radial layout
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                getLayoutedElements({
                  'elk.algorithm': 'org.eclipse.elk.force',
                })
              }
            >
              force layout
            </Button>
          </>
        )}
      </Panel>
    </ReactFlow>
  );
}

const MindMap = ({ isLayout }: { isLayout: boolean }) => {
  return (
    <ReactFlowProvider>
      <LayoutFlow isLayout={isLayout} />
    </ReactFlowProvider>
  );
}

export default MindMap;