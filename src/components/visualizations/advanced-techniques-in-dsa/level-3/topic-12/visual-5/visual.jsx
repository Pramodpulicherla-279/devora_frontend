/* Problem: Min Cost to Connect All Points
 * 2D animated: points on a plane, edge cost = Manhattan distance — connecting everything at
 * least cost is literally an MST. Prim's grows it point by point. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const P = [[120, 90], [260, 60], [420, 100], [200, 210], [400, 220]];
const dist = (a, b) => Math.abs(P[a][0] - P[b][0]) / 20 + Math.abs(P[a][1] - P[b][1]) / 20 | 0;
const STEPS = [
  { tree: [0], edges: [], cost: 0, log: 'start Prim\'s at point 0' },
  { tree: [0, 1], edges: [[0, 1]], cost: dist(0, 1), log: `cheapest frontier edge: 0–1 (cost ${dist(0, 1)})` },
  { tree: [0, 1, 3], edges: [[0, 1], [0, 3]], cost: dist(0, 1) + dist(0, 3), log: `add 0–3 (cost ${dist(0, 3)})` },
  { tree: [0, 1, 3, 2], edges: [[0, 1], [0, 3], [1, 2]], cost: dist(0, 1) + dist(0, 3) + dist(1, 2), log: `add 1–2 (cost ${dist(1, 2)})` },
  { tree: [0, 1, 3, 2, 4], edges: [[0, 1], [0, 3], [1, 2], [2, 4]], cost: dist(0, 1) + dist(0, 3) + dist(1, 2) + dist(2, 4), done: true, log: `add 2–4 — all connected, total cost ${dist(0, 1) + dist(0, 3) + dist(1, 2) + dist(2, 4)}` },
];
export default function AgraphMinCostConnectVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % STEPS.length), 1.8, auto);
  const s = STEPS[i];
  return (
    <Stage2D title="Min Cost to Connect All Points" subtitle="Every pair of points is an implicit edge weighted by Manhattan distance — a complete graph. 'Connect all at minimum total cost' is the definition of a minimum spanning tree."
      accent="#4fce78" viewBox="0 0 640 280"
      controls={<>{STEPS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">{s.log}</span></>}
      legend={<>Recognition cue: "connect ALL nodes, minimise total cost, no path requirements" → <strong>MST</strong>, never shortest-path. With a complete graph (n² edges), Prim's with an array is O(n²) — better here than Kruskal's O(n² log n) sort. The grown tree uses n−1 = 4 edges.</>}>
      {/* implicit faint edges */}
      {P.map((_, a) => P.map((__, b) => a < b ? <line key={a + '-' + b} x1={P[a][0]} y1={P[a][1]} x2={P[b][0]} y2={P[b][1]} stroke="#21262d" strokeWidth="1" /> : null))}
      {/* MST edges */}
      {s.edges.map(([a, b], k) => <g key={'m' + k}><line x1={P[a][0]} y1={P[a][1]} x2={P[b][0]} y2={P[b][1]} stroke="#56d364" strokeWidth="4" className={k === s.edges.length - 1 ? 'dsa2d-pulse' : ''} /><circle cx={(P[a][0] + P[b][0]) / 2} cy={(P[a][1] + P[b][1]) / 2} r="11" fill="#0d1117" stroke="#56d364" /><text x={(P[a][0] + P[b][0]) / 2} y={(P[a][1] + P[b][1]) / 2 + 4} fill="#7ee787" fontSize="11" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{dist(a, b)}</text></g>)}
      {P.map(([x, y], k) => {
        const inTree = s.tree.includes(k);
        return <g key={k}><circle cx={x} cy={y} r="16" fill={inTree ? 'rgba(86,211,100,.28)' : '#161b22'} stroke={inTree ? '#56d364' : '#8b949e'} strokeWidth="2.5" style={{ transition: 'fill .3s' }} /><text x={x} y={y + 5} fill="#e6edf3" fontSize="12" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{k}</text></g>;
      })}
      <text x="320" y="268" fill={s.done ? '#56d364' : '#8b949e'} fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{s.done ? `✓ MST complete — total cable: ${s.cost}` : `running cost: ${s.cost} · faint lines = all possible connections`}</text>
    </Stage2D>
  );
}
