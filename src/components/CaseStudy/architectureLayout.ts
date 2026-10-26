import type { ArchEdge, ArchNode } from '../../data/projects';

// Simple layered (top-down) layout computed from the edges, so diagrams are
// always readable without hand-placed coordinates or a layout dependency.

export const NODE_W = 200;
export const COL_GAP = 28;
export const ROW_H = 132;
const MAX_PER_ROW = 4;

export interface LaidOutNode {
  id: string;
  label: string;
  x: number;
  y: number;
  row: number;
}

export interface LaidOutEdge extends ArchEdge {
  id: string;
  /** true when the edge points "upwards" (a loop / feedback edge) */
  back: boolean;
}

export interface ArchLayout {
  nodes: LaidOutNode[];
  edges: LaidOutEdge[];
  rows: number;
}

export function layoutArchitecture(nodes: ArchNode[], edges: ArchEdge[]): ArchLayout {
  const ids = new Set(nodes.map((n) => n.id));
  const valid = edges.filter((e) => ids.has(e.source) && ids.has(e.target) && e.source !== e.target);

  const outgoing = new Map<string, number[]>();
  nodes.forEach((n) => outgoing.set(n.id, []));
  valid.forEach((e, i) => outgoing.get(e.source)!.push(i));

  // 1. Find back edges (cycles) with a DFS, starting from nodes nobody points at.
  const hasIncoming = new Set(valid.map((e) => e.target));
  const roots = nodes.filter((n) => !hasIncoming.has(n.id)).map((n) => n.id);
  const order = [...roots, ...nodes.map((n) => n.id)];
  const state = new Map<string, 0 | 1 | 2>();
  const backEdges = new Set<number>();
  const dfs = (id: string) => {
    state.set(id, 1);
    for (const ei of outgoing.get(id) ?? []) {
      const t = valid[ei].target;
      const s = state.get(t) ?? 0;
      if (s === 1) backEdges.add(ei);
      else if (s === 0) dfs(t);
    }
    state.set(id, 2);
  };
  order.forEach((id) => {
    if ((state.get(id) ?? 0) === 0) dfs(id);
  });

  // 2. Layer = longest path over the forward edges.
  const parents = new Map<string, string[]>();
  nodes.forEach((n) => parents.set(n.id, []));
  valid.forEach((e, i) => {
    if (!backEdges.has(i)) parents.get(e.target)!.push(e.source);
  });
  const layerOf = new Map<string, number>();
  const layer = (id: string): number => {
    const cached = layerOf.get(id);
    if (cached !== undefined) return cached;
    const ps = parents.get(id) ?? [];
    const l = ps.length === 0 ? 0 : Math.max(...ps.map(layer)) + 1;
    layerOf.set(id, l);
    return l;
  };
  nodes.forEach((n) => layer(n.id));

  // 3. Order nodes inside each layer by the average position of their parents.
  const maxLayer = Math.max(0, ...layerOf.values());
  const layers: string[][] = Array.from({ length: maxLayer + 1 }, () => []);
  nodes.forEach((n) => layers[layerOf.get(n.id)!].push(n.id));
  const posIn = new Map<string, number>();
  const reindex = () => layers.forEach((l) => l.forEach((id, i) => posIn.set(id, i)));
  reindex();
  const children = new Map<string, string[]>();
  nodes.forEach((n) => children.set(n.id, []));
  valid.forEach((e, i) => {
    if (!backEdges.has(i)) children.get(e.source)!.push(e.target);
  });
  const bary = (id: string, rel: Map<string, string[]>) => {
    const r = rel.get(id) ?? [];
    return r.length === 0 ? posIn.get(id)! : r.reduce((a, p) => a + posIn.get(p)!, 0) / r.length;
  };
  for (let pass = 0; pass < 3; pass++) {
    for (let l = 1; l < layers.length; l++) {
      layers[l].sort((a, b) => bary(a, parents) - bary(b, parents));
      reindex();
    }
    for (let l = layers.length - 2; l >= 0; l--) {
      layers[l].sort((a, b) => bary(a, children) - bary(b, children));
      reindex();
    }
  }

  // 4. Split wide layers into rows, then place nodes centred on each row.
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const placed: LaidOutNode[] = [];
  let row = 0;
  for (const ids of layers) {
    for (let start = 0; start < ids.length; start += MAX_PER_ROW) {
      const chunk = ids.slice(start, start + MAX_PER_ROW);
      chunk.forEach((id, i) => {
        placed.push({
          id,
          label: byId.get(id)!.label,
          x: (i - (chunk.length - 1) / 2) * (NODE_W + COL_GAP),
          y: row * ROW_H,
          row,
        });
      });
      row++;
    }
  }
  const rowOf = new Map(placed.map((p) => [p.id, p.row]));

  const laidEdges: LaidOutEdge[] = valid.map((e, i) => ({
    ...e,
    id: `e${i}-${e.source}-${e.target}`,
    back: backEdges.has(i) || rowOf.get(e.target)! <= rowOf.get(e.source)!,
  }));

  return { nodes: placed, edges: laidEdges, rows: row };
}
