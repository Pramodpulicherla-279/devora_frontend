/* Lesson: Common Advanced Graph Interview Problems, Solved Step by Step (overview)
 * 2D animated: flip through the classics and the advanced-graph tool each one calls for. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const PROBS = [
  { t: 'Network Delay Time', pat: "Dijkstra from the source", c: '#6b8cff', why: 'Single-source shortest paths with positive weights — the textbook Dijkstra setup.' },
  { t: 'Cheapest Flights Within K Stops', pat: 'Bellman-Ford, K+1 passes', c: '#f0a35e', why: 'The pass limit naturally bounds the number of edges (stops) a path may use.' },
  { t: 'Min Cost to Connect All Points', pat: "MST (Prim's or Kruskal's)", c: '#4fce78', why: 'Connecting everything at minimum total cost is the literal MST definition.' },
  { t: 'Redundant Connection', pat: 'union-find', c: '#a78bfa', why: 'Add edges one by one; the first edge whose endpoints already share a root closes the cycle.' },
  { t: 'Course Schedule II', pat: 'topological sort', c: '#e46e9b', why: 'Output a valid ordering of a DAG — Kahn\'s queue or DFS post-order reversed.' },
];
export default function AgraphInterviewVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % PROBS.length), 2.3, auto);
  const p = PROBS[i];
  return (
    <Stage2D title="Advanced Graph Interview Problems" subtitle="The advanced-graph toolbox has one tool per job. Match the problem's key phrase — 'shortest with weights', 'connect all', 'at most K stops' — to the right algorithm and the rest is implementation."
      accent={p.c} viewBox="0 0 640 300"
      controls={<>{PROBS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /></>}
      legend={<>Cheat sheet: weighted shortest path → <strong>Dijkstra</strong> (no negatives) or <strong>Bellman-Ford</strong> (negatives / bounded hops) · connect everything cheaply → <strong>MST</strong> · dynamic connectivity / cycle spotting → <strong>union-find</strong> · dependency order → <strong>topological sort</strong>.</>}>
      <rect x="60" y="46" width="520" height="150" rx="14" fill="#0b0f15" stroke={p.c} strokeWidth="1.5" />
      <text x="320" y="88" fill="#e6edf3" fontSize="19" textAnchor="middle" fontWeight="700" fontFamily="system-ui">{p.t}</text>
      <rect x="170" y="104" width="300" height="32" rx="16" fill={p.c + '22'} stroke={p.c} />
      <text x="320" y="125" fill={p.c} fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{p.pat}</text>
      <foreignObject x="86" y="146" width="468" height="46"><div xmlns="http://www.w3.org/1999/xhtml" style={{ color: '#c9d1d9', font: '14px system-ui', lineHeight: 1.4, textAlign: 'center' }}>{p.why}</div></foreignObject>
      {PROBS.map((_, k) => <circle key={k} cx={320 - (PROBS.length - 1) * 12 + k * 24} cy="228" r="5" fill={k === i ? p.c : '#30363d'} />)}
      <text x="320" y="266" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">problem {i + 1} of {PROBS.length} — each detailed step-by-step in the lesson below</text>
    </Stage2D>
  );
}
