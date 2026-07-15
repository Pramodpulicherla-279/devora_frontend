/* Lesson: Bipartite Graphs and How to Check for One
 * 2D animated: try to 2-colour the graph so no edge joins same-colour nodes. Toggle an extra
 * edge that creates an odd cycle — the colouring then hits an unavoidable conflict. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const NODES = [
  { id: 0, l: 'A', x: 130, y: 80 }, { id: 1, l: 'B', x: 130, y: 240 },
  { id: 2, l: 'C', x: 330, y: 80 }, { id: 3, l: 'D', x: 330, y: 240 },
  { id: 4, l: 'E', x: 530, y: 80 }, { id: 5, l: 'F', x: 530, y: 240 },
];
const BASE = { 0: [1, 3], 1: [0, 2], 2: [1, 5], 3: [0, 4], 4: [3, 5], 5: [2, 4] };
function adj(extra) { const a = JSON.parse(JSON.stringify(BASE)); if (extra) { a[0].push(2); a[2].push(0); } return a; }
function sim(extra) {
  const A = adj(extra), color = {}, steps = []; let conflict = null;
  const q = [0]; color[0] = 0;
  steps.push({ color: { ...color }, cur: 0, conflict: null });
  while (q.length) {
    const u = q.shift();
    for (const v of A[u]) {
      if (color[v] === undefined) { color[v] = color[u] ^ 1; q.push(v); steps.push({ color: { ...color }, cur: v, conflict: null }); }
      else if (color[v] === color[u] && !conflict) { conflict = [u, v]; steps.push({ color: { ...color }, cur: v, conflict }); }
    }
  }
  return steps;
}

export default function GraphBipartiteVisualization() {
  const [extra, setExtra] = useState(false);
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const steps = sim(extra);
  useAutoPlay(() => setI(v => (v >= steps.length - 1 ? 0 : v + 1)), 0.9, auto, [extra]);
  const s = steps[Math.min(i, steps.length - 1)];
  const A = adj(extra);
  const EDGES = []; { const seen = new Set(); for (const a in A) for (const b of A[a]) { const k = Math.min(a, b) + '-' + Math.max(a, b); if (!seen.has(k)) { seen.add(k); EDGES.push([+a, b]); } } }
  const COL = ['#58a6ff', '#f0883e'];

  return (
    <Stage2D
      title="Bipartite Check (2-Colouring)"
      subtitle="A graph is bipartite if its nodes split into two groups with edges only crossing between them. Try to colour it with two colours so no edge joins same-coloured nodes."
      accent="#58a6ff"
      viewBox="0 0 640 320"
      controls={
        <>
          <button className={`dsa2d-btn ${!extra ? 'dsa2d-btn--on' : ''}`} onClick={() => { setExtra(false); setI(0); }}>bipartite ✓</button>
          <button className={`dsa2d-btn ${extra ? 'dsa2d-btn--on' : ''}`} onClick={() => { setExtra(true); setI(0); }}>add edge A–C ✗</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">{s.conflict ? 'conflict — not bipartite' : 'colouring…'}</span>
        </>
      }
      legend={extra
        ? <>Adding <code>A–C</code> creates an <strong>odd-length cycle</strong> (A–B–C–A). BFS forces A and C to the same colour, but the new edge joins them → <span style={{ color: '#f85149' }}>conflict</span>. A graph is bipartite <em>iff</em> it has no odd cycle.</>
        : <>BFS assigns each node the <em>opposite</em> colour of its parent. If we finish with no same-colour edge, the graph is <strong>bipartite</strong>. Uses: matching problems, scheduling, "us vs them" partitioning. Time <code>O(V+E)</code>.</>}
    >
      {EDGES.map(([a, b], k) => {
        const na = NODES[a], nb = NODES[b];
        const bad = s.conflict && ((s.conflict[0] === a && s.conflict[1] === b) || (s.conflict[0] === b && s.conflict[1] === a));
        return <line key={k} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke={bad ? '#f85149' : '#30363d'} strokeWidth={bad ? 4 : 2} className={bad ? 'dsa2d-pulse' : ''} />;
      })}
      {NODES.map(n => {
        const c = s.color[n.id];
        return <g key={n.id}><circle cx={n.x} cy={n.y} r="21" fill={c === undefined ? '#161b22' : COL[c]} stroke={c === undefined ? '#8b949e' : COL[c]} strokeWidth="2.5" className={n.id === s.cur ? 'dsa2d-pulse' : ''} style={{ transition: 'fill .3s' }} /><text x={n.x} y={n.y + 6} fill={c === undefined ? '#e6edf3' : '#0d1117'} fontSize="16" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{n.l}</text></g>;
      })}
    </Stage2D>
  );
}
