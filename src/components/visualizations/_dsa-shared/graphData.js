/* Shared sample graph used across the Graph-part visuals so learners see the SAME graph
 * for BFS, DFS, cycle detection, components, etc. Undirected, connected, contains a cycle. */
export const GNODES = [
  { id: 0, label: 'A', x: 110, y: 90 },
  { id: 1, label: 'B', x: 300, y: 60 },
  { id: 2, label: 'C', x: 500, y: 95 },
  { id: 3, label: 'D', x: 180, y: 220 },
  { id: 4, label: 'E', x: 370, y: 195 },
  { id: 5, label: 'F', x: 545, y: 225 },
  { id: 6, label: 'G', x: 330, y: 300 },
];
// undirected adjacency (sorted for deterministic traversal order)
export const GADJ = {
  0: [1, 3],
  1: [0, 2, 4],
  2: [1, 5],
  3: [0, 4],
  4: [1, 3, 5, 6],
  5: [2, 4],
  6: [4],
};
export const GEDGES = (() => {
  const seen = new Set(), out = [];
  for (const a in GADJ) for (const b of GADJ[a]) {
    const key = Math.min(a, b) + '-' + Math.max(a, b);
    if (!seen.has(key)) { seen.add(key); out.push([+a, b]); }
  }
  return out;
})();
export const nodeById = id => GNODES.find(n => n.id === id);
