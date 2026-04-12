import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

interface ArchitectureDiagramProps {
  projectId: string;
}

const neofinNodes = [
  {
    id: 'user',
    position: { x: 50, y: 150 },
    data: { label: 'User / Dashboard' },
    style: { background: '#2563eb', color: 'white', borderRadius: '8px', border: 'none', padding: '10px 20px' },
  },
  {
    id: 'gateway',
    position: { x: 250, y: 150 },
    data: { label: 'API Gateway' },
    style: { background: '#1e293b', border: '1px solid #3b82f6', color: 'white' },
  },
  {
    id: 'langgraph',
    position: { x: 500, y: 150 },
    data: { label: 'LangGraph Orchestrator' },
    style: { background: '#8b5cf6', color: 'white', borderRadius: '8px', border: 'none', padding: '15px' },
  },
  {
    id: 'memory',
    position: { x: 500, y: 50 },
    data: { label: 'Semantic Memory (Vector DB)' },
    style: { background: '#0f172a', border: '1px dashed #8b5cf6', color: '#cbd5e1' },
  },
  {
    id: 'llm',
    position: { x: 750, y: 100 },
    data: { label: 'LLM Engine (GPT/Claude)' },
    style: { background: '#14b8a6', color: 'white', borderRadius: '8px', border: 'none' },
  },
  {
    id: 'db',
    position: { x: 750, y: 200 },
    data: { label: 'PostgreSQL (Transactions)' },
    style: { background: '#0f172a', border: '1px solid #14b8a6', color: 'white' },
  },
];

const neofinEdges = [
  { id: 'e1', source: 'user', target: 'gateway', animated: true, style: { stroke: '#3b82f6' } },
  { id: 'e2', source: 'gateway', target: 'langgraph', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed, color: '#8b5cf6' }, style: { stroke: '#8b5cf6' } },
  { id: 'e3', source: 'langgraph', target: 'memory', type: 'step', style: { stroke: '#64748b' } },
  { id: 'e4', source: 'memory', target: 'langgraph', type: 'step', style: { stroke: '#64748b' } },
  { id: 'e5', source: 'langgraph', target: 'llm', markerEnd: { type: MarkerType.ArrowClosed, color: '#14b8a6' }, style: { stroke: '#14b8a6' } },
  { id: 'e6', source: 'langgraph', target: 'db', type: 'smoothstep', style: { stroke: '#475569' } },
];

const indiamartNodes = [
  {
    id: 'cron',
    position: { x: 50, y: 100 },
    data: { label: 'Cron Scheduler' },
    style: { background: '#1e293b', border: '1px solid #64748b', color: 'white' },
  },
  {
    id: 'scraper',
    position: { x: 250, y: 100 },
    data: { label: 'Puppeteer/Playwright Scraper' },
    style: { background: '#f59e0b', color: 'white', borderRadius: '8px', border: 'none', padding: '10px' },
  },
  {
    id: 'queue',
    position: { x: 500, y: 100 },
    data: { label: 'Redis / Message Queue' },
    style: { background: '#ef4444', color: 'white', borderRadius: '8px', border: 'none' },
  },
  {
    id: 'worker',
    position: { x: 700, y: 100 },
    data: { label: 'LLM Summarization Worker' },
    style: { background: '#8b5cf6', color: 'white', border: 'none' },
  },
  {
    id: 'vectordb',
    position: { x: 900, y: 100 },
    data: { label: 'Pinecone Vector Matcher' },
    style: { background: '#10b981', color: 'white', border: 'none' },
  },
];

const indiamartEdges = [
  { id: 'i1', source: 'cron', target: 'scraper', animated: true },
  { id: 'i2', source: 'scraper', target: 'queue', style: { stroke: '#ef4444' } },
  { id: 'i3', source: 'queue', target: 'worker', animated: true, style: { stroke: '#8b5cf6' } },
  { id: 'i4', source: 'worker', target: 'vectordb', style: { stroke: '#10b981' } },
];

export function ArchitectureDiagram({ projectId }: ArchitectureDiagramProps) {
  const initialNodes = projectId === 'neofin' ? neofinNodes : projectId === 'indiamart' ? indiamartNodes : null;
  const initialEdges = projectId === 'neofin' ? neofinEdges : projectId === 'indiamart' ? indiamartEdges : null;

  if (!initialNodes) return null;

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges ?? []);

  return (
    <div style={{ width: '100%', height: '350px', background: 'rgba(0,0,0,0.5)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        colorMode="dark"
      >
        <Background gap={12} size={1} color="#ffffff10" />
      </ReactFlow>
    </div>
  );
}
