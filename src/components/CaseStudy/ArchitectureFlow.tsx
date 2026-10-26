import React, { useMemo, useSyncExternalStore } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  Handle,
  Position,
  MarkerType,
  type Node,
  type Edge,
  type NodeProps,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import type { Project } from '../../data/projects';
import { layoutArchitecture, NODE_W, ROW_H } from './architectureLayout';

function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(query);
      mq.addEventListener('change', cb);
      return () => mq.removeEventListener('change', cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

const hiddenHandle: React.CSSProperties = { opacity: 0, pointerEvents: 'none' };

const ArchNodeView: React.FC<NodeProps> = ({ data }) => (
  <div
    className="rounded-xl border border-white/15 bg-[#0d0d14]/90 px-3 py-2.5 text-center text-[13px] leading-snug text-gray-100 shadow-lg shadow-black/40"
    style={{ width: NODE_W, minHeight: 52, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
  >
    <Handle id="t" type="target" position={Position.Top} style={hiddenHandle} isConnectable={false} />
    <Handle id="b" type="source" position={Position.Bottom} style={hiddenHandle} isConnectable={false} />
    <Handle id="rt" type="target" position={Position.Right} style={hiddenHandle} isConnectable={false} />
    <Handle id="rs" type="source" position={Position.Right} style={hiddenHandle} isConnectable={false} />
    {String(data.label)}
  </div>
);

const nodeTypes = { arch: ArchNodeView };

const FORWARD = '#64748b';
const BACK = '#a78bfa';

/** Readable text version of the diagram: used on phones and as a screen-reader alternative. */
export const ArchitectureList: React.FC<{ architecture: Project['architecture'] }> = ({ architecture }) => {
  const layout = useMemo(() => layoutArchitecture(architecture.nodes, architecture.edges), [architecture]);
  const labelOf = useMemo(() => new Map(layout.nodes.map((n) => [n.id, n.label])), [layout]);
  const ordered = useMemo(
    () => [...layout.nodes].sort((a, b) => a.row - b.row || a.x - b.x),
    [layout],
  );

  return (
    <ol className="space-y-3">
      {ordered.map((n, i) => {
        const outs = layout.edges.filter((e) => e.source === n.id);
        return (
          <li key={n.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                {i + 1}
              </span>
              <p className="text-sm font-medium leading-snug text-gray-100">{n.label}</p>
            </div>
            {outs.length > 0 && (
              <ul className="mt-3 space-y-1 pl-9 text-[13px] leading-snug text-gray-400">
                {outs.map((e) => (
                  <li key={e.id}>
                    <span aria-hidden="true" className="mr-1 text-primary">
                      {e.back ? '↺' : '→'}
                    </span>
                    {e.label && <span className="text-gray-300">{e.label}: </span>}
                    {labelOf.get(e.target)}
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ol>
  );
};

export const ArchitectureFlow: React.FC<{ architecture: Project['architecture']; title: string }> = ({
  architecture,
  title,
}) => {
  const isPhone = useMediaQuery('(max-width: 639px)');
  const isTouch = useMediaQuery('(pointer: coarse)');

  const { nodes, edges, height } = useMemo(() => {
    const layout = layoutArchitecture(architecture.nodes, architecture.edges);
    const rfNodes: Node[] = layout.nodes.map((n) => ({
      id: n.id,
      type: 'arch',
      position: { x: n.x, y: n.y },
      data: { label: n.label },
      draggable: false,
      selectable: false,
      focusable: false,
    }));
    const rfEdges: Edge[] = layout.edges.map((e) => {
      const color = e.back ? BACK : FORWARD;
      return {
        id: e.id,
        source: e.source,
        target: e.target,
        sourceHandle: e.back ? 'rs' : 'b',
        targetHandle: e.back ? 'rt' : 't',
        type: 'smoothstep',
        label: e.label,
        focusable: false,
        selectable: false,
        markerEnd: { type: MarkerType.ArrowClosed, color, width: 16, height: 16 },
        style: { stroke: color, strokeWidth: 1.5, strokeDasharray: e.back ? '5 4' : undefined },
        labelStyle: { fill: '#cbd5e1', fontSize: 11, fontWeight: 500 },
        labelBgStyle: { fill: '#07070b', fillOpacity: 0.95 },
        labelBgPadding: [6, 3] as [number, number],
        labelBgBorderRadius: 4,
      };
    });
    return {
      nodes: rfNodes,
      edges: rfEdges,
      height: Math.min(780, Math.max(380, layout.rows * ROW_H + 40)),
    };
  }, [architecture]);

  if (isPhone) return <ArchitectureList architecture={architecture} />;

  return (
    <div>
      <div
        className="overflow-hidden rounded-xl border border-white/10 bg-black/40"
        style={{ height }}
        role="group"
        aria-label={`${title} architecture diagram. A text version follows below.`}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.1, minZoom: 0.3, maxZoom: 1.1 }}
          minZoom={0.3}
          maxZoom={1.6}
          colorMode="dark"
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          nodesFocusable={false}
          edgesFocusable={false}
          zoomOnScroll={false}
          zoomOnDoubleClick={false}
          zoomOnPinch={!isTouch}
          panOnScroll={false}
          preventScrolling={false}
          panOnDrag={!isTouch}
        >
          <Background gap={18} size={1} color="#1f2937" />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>
      <p className="mt-3 text-center text-xs tracking-wide text-gray-400">
        {isTouch ? 'Use the + / − buttons to zoom.' : 'Drag to pan. Use the + / − buttons to zoom. Scrolling the page is not captured.'}
      </p>
      <details className="group mt-5 rounded-xl border border-white/10 bg-white/[0.02] p-4">
        <summary className="cursor-pointer list-none text-sm font-medium text-gray-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
          Text version of this diagram
          <span className="ml-2 text-gray-500 group-open:hidden">(show)</span>
        </summary>
        <div className="mt-4">
          <ArchitectureList architecture={architecture} />
        </div>
      </details>
    </div>
  );
};
