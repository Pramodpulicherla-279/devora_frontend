/* Lesson: Kruskal's vs Prim's — When to Use Which
 * 2D animated: cycle through the practical trade-offs between the two MST builders. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const ROWS = [
  { k: 'Greedy over…', kr: 'EDGES (global, cheapest anywhere)', pr: 'the FRONTIER (grows one blob)' },
  { k: 'Data structures', kr: 'sorted edge list + union-find', pr: 'adjacency list + min-heap' },
  { k: 'Complexity', kr: 'O(E log E) — sorting dominates', pr: 'O(E log V) with a binary heap' },
  { k: 'Shines on', kr: 'sparse graphs / plain edge lists', pr: 'dense graphs / adjacency ready' },
  { k: 'Mid-run state', kr: 'a forest of fragments', pr: 'one connected tree' },
];
export default function AgraphKruskalVsPrimVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % ROWS.length), 2.3, auto);
  const r = ROWS[i];
  return (
    <Stage2D title="Kruskal's vs Prim's" subtitle="Both produce a minimum spanning tree of identical total weight. The choice is about your graph's shape and the data structures you already have on hand."
      accent="#58a6ff" viewBox="0 0 640 270"
      controls={<>{ROWS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /></>}
      legend={<>Interview shortcut: given an <strong>edge list</strong>, reach for <strong>Kruskal's</strong> (sort + union-find is quick to write); given an <strong>adjacency structure</strong> or a dense graph, <strong>Prim's</strong> with a heap flows more naturally. Correctness-wise they're interchangeable.</>}>
      <text x="180" y="46" fill="#4fce78" fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="system-ui">Kruskal's</text>
      <text x="460" y="46" fill="#a78bfa" fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="system-ui">Prim's</text>
      <line x1="320" y1="34" x2="320" y2="200" stroke="#30363d" strokeDasharray="4 4" />
      <rect x="46" y="60" width="268" height="126" rx="12" fill="#0b0f15" stroke="#4fce78" strokeWidth="1.5" />
      <rect x="326" y="60" width="268" height="126" rx="12" fill="#0b0f15" stroke="#a78bfa" strokeWidth="1.5" />
      <foreignObject x="60" y="80" width="240" height="96"><div xmlns="http://www.w3.org/1999/xhtml" style={{ color: '#c9d1d9', font: '13.5px system-ui', lineHeight: 1.45, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>{r.kr}</div></foreignObject>
      <foreignObject x="340" y="80" width="240" height="96"><div xmlns="http://www.w3.org/1999/xhtml" style={{ color: '#c9d1d9', font: '13.5px system-ui', lineHeight: 1.45, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>{r.pr}</div></foreignObject>
      <text x="320" y="216" fill="#e6edf3" fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="system-ui">{r.k}</text>
      <text x="320" y="248" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">aspect {i + 1} of {ROWS.length}</text>
    </Stage2D>
  );
}
