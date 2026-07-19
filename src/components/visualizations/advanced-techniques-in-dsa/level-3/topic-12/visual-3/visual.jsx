/* Problem: Cheapest Flights Within K Stops
 * 2D animated: Bellman-Ford with a PASS LIMIT — each pass allows one more flight leg, so
 * stopping after K+1 passes enforces the stop budget naturally. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const N = { S: [90, 140], A: [300, 60], B: [300, 220], D: [510, 140] };
const EDGES = [['S', 'A', 100], ['S', 'B', 500], ['A', 'B', 100], ['B', 'D', 100], ['A', 'D', 600]];
const PASSES = [
  { p: 1, dist: { S: 0, A: 100, B: 500, D: '∞' }, log: 'pass 1 (direct flights only): A=100, B=500' },
  { p: 2, dist: { S: 0, A: 100, B: 200, D: 600 }, log: 'pass 2 (≤1 stop): B via A = 200 · D via B = 600, via A = 700 → 600' },
  { p: 3, dist: { S: 0, A: 100, B: 200, D: 300 }, done: true, log: 'pass 3 (≤2 stops): D via A→B = 100+100+100 = 300 ✓ cheapest within K=2' },
];
export default function AgraphCheapestFlightsVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % PASSES.length), 2.2, auto);
  const s = PASSES[i];
  return (
    <Stage2D title="Cheapest Flights Within K Stops" subtitle="Dijkstra can't cap the number of legs — its greedy settle ignores hop counts. Bellman-Ford can: each relaxation pass extends paths by exactly one flight, so K stops = K+1 passes, then stop."
      accent="#f0a35e" viewBox="0 0 640 280"
      controls={<>{PASSES.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>pass {k + 1}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">{s.log}</span></>}
      legend={<>Crucial detail: relax from a <strong>copy</strong> of last pass's distances, or one pass could chain multiple new legs and break the stop budget. K+1 passes over E edges → <strong>O(K·E)</strong>. The cheap S→A→B→D route (300) needs 2 stops — visible only from pass 3.</>}>
      <defs><marker id="acf-arr" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L9,3 L0,6 Z" fill="#6e7681" /></marker></defs>
      {EDGES.map(([a, b, w], k) => {
        const [x1, y1] = N[a], [x2, y2] = N[b];
        const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy), ux = dx / len, uy = dy / len;
        const cheap = s.done && ((a === 'S' && b === 'A') || (a === 'A' && b === 'B') || (a === 'B' && b === 'D'));
        return <g key={k}><line x1={x1 + ux * 26} y1={y1 + uy * 26} x2={x2 - ux * 28} y2={y2 - uy * 28} stroke={cheap ? '#56d364' : '#6e7681'} strokeWidth={cheap ? 4 : 2.5} markerEnd="url(#acf-arr)" className={cheap ? 'dsa2d-pulse' : ''} style={{ transition: 'stroke .3s' }} /><circle cx={(x1 + x2) / 2} cy={(y1 + y2) / 2} r="14" fill="#0d1117" stroke={cheap ? '#56d364' : '#6e7681'} /><text x={(x1 + x2) / 2} y={(y1 + y2) / 2 + 4} fill="#c9d1d9" fontSize="11" textAnchor="middle" fontWeight="700" fontFamily="Consolas">${w}</text></g>;
      })}
      {Object.entries(N).map(([id, [x, y]]) => (
        <g key={id}>
          <circle cx={x} cy={y} r="23" fill={id === 'S' ? 'rgba(86,211,100,.16)' : id === 'D' ? 'rgba(240,163,94,.16)' : '#161b22'} stroke={id === 'S' ? '#56d364' : id === 'D' ? '#f0a35e' : '#8b949e'} strokeWidth="2.5" />
          <text x={x} y={y + 5} fill="#e6edf3" fontSize="13" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{id === 'S' ? '🛫S' : id === 'D' ? '🛬D' : id}</text>
          <text x={x} y={y + 42} fill="#f8c088" fontSize="12" textAnchor="middle" fontWeight="700" fontFamily="Consolas">${s.dist[id]}</text>
        </g>
      ))}
      <text x="320" y="270" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">each pass unlocks paths one leg longer — the pass counter IS the stop budget</text>
    </Stage2D>
  );
}
