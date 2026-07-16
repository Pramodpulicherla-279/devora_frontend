/* Lesson: Detecting Negative Cycles in a Graph
 * 2D animated: a cycle whose weights sum below zero lets you "loop forever" lowering cost.
 * Bellman-Ford detects it: if the V-th relaxation pass still improves anything, a cycle exists. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const N = { S: [90, 150], A: [270, 70], B: [430, 150], C: [270, 230] };
const EDGES = [['S', 'A', 3], ['A', 'B', 2], ['B', 'C', -4], ['C', 'A', 1], ['B', 'T?', 0]].slice(0, 4);
const LOOPS = [
  { lap: 0, dist: { S: 0, A: 3, B: 5, C: 1 }, log: 'after normal passes: A=3, B=5, C=1' },
  { lap: 1, dist: { S: 0, A: 2, B: 4, C: 0 }, log: 'extra pass STILL improves: A 3→2 via C — suspicious…' },
  { lap: 2, dist: { S: 0, A: 1, B: 3, C: -1 }, log: 'and again: every lap around A→B→C subtracts 1' },
  { lap: 3, dist: { S: 0, A: 0, B: 2, C: -2 }, log: 'cycle sum = 2 + (−4) + 1 = −1 < 0 → NEGATIVE CYCLE detected' },
];
export default function AgraphNegativeCycleVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % LOOPS.length), 2.2, auto);
  const s = LOOPS[i];
  const cyc = ['A', 'B', 'C'];
  return (
    <Stage2D title="Detecting Negative Cycles" subtitle="A cycle with negative total weight makes 'shortest path' meaningless — each lap lowers the cost forever. Bellman-Ford's V-th pass is the detector: any improvement then proves a cycle."
      accent="#f85149" viewBox="0 0 640 300"
      controls={<>{LOOPS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>lap {k}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">{s.log}</span></>}
      legend={<>The cycle A→B→C→A sums to <strong>−1</strong>, so distances never converge — they just keep dropping. Bellman-Ford runs V−1 passes (enough for any real shortest path), then one <strong>extra</strong> pass: if anything still improves, report a negative cycle. Vital in currency-arbitrage detection.</>}>
      <defs><marker id="anc-arr" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L9,3 L0,6 Z" fill="#6e7681" /></marker></defs>
      {EDGES.map(([a, b, w], k) => {
        const [x1, y1] = N[a], [x2, y2] = N[b];
        const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy), ux = dx / len, uy = dy / len;
        const inCyc = cyc.includes(a) && cyc.includes(b);
        return (
          <g key={k}>
            <line x1={x1 + ux * 24} y1={y1 + uy * 24} x2={x2 - ux * 26} y2={y2 - uy * 26} stroke={inCyc ? (i > 0 ? '#f85149' : '#f0883e') : '#484f58'} strokeWidth={inCyc ? 3.5 : 2.5} markerEnd="url(#anc-arr)" className={inCyc && i > 0 ? 'dsa2d-pulse' : ''} style={{ transition: 'stroke .3s' }} />
            <circle cx={(x1 + x2) / 2} cy={(y1 + y2) / 2} r="12" fill="#0d1117" stroke={w < 0 ? '#f85149' : '#484f58'} strokeWidth="1.5" />
            <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 + 4} fill={w < 0 ? '#ff9d95' : '#c9d1d9'} fontSize="12" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{w}</text>
          </g>
        );
      })}
      {Object.entries(N).map(([id, [x, y]]) => (
        <g key={id}>
          <circle cx={x} cy={y} r="21" fill={cyc.includes(id) && i > 0 ? 'rgba(248,81,73,.16)' : '#161b22'} stroke={cyc.includes(id) ? '#f0883e' : '#8b949e'} strokeWidth="2.5" style={{ transition: 'fill .3s' }} />
          <text x={x} y={y + 5} fill="#e6edf3" fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{id}</text>
          <text x={x} y={y + 40} fill={i > 0 && cyc.includes(id) ? '#f85149' : '#79c0ff'} fontSize="13" textAnchor="middle" fontWeight="700" fontFamily="Consolas">d={s.dist[id]}</text>
        </g>
      ))}
      {i === LOOPS.length - 1 && <text x="320" y="290" fill="#f85149" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">⟳ distances fall every lap — no shortest path exists</text>}
    </Stage2D>
  );
}
