/* Lesson: Why Dijkstra's Fails With Negative Weights
 * 2D animated: Dijkstra greedily settles A at distance 2 — but a route through B with a
 * negative edge reaches A for 1. The settled commitment was premature. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const N = { S: [110, 150], A: [330, 70], B: [330, 230] };
const STEPS = [
  { hl: [], settled: [], dist: { S: 0, A: '∞', B: '∞' }, log: 'edges: S→A = 2, S→B = 5, B→A = −4' },
  { hl: [['S', 'A'], ['S', 'B']], settled: ['S'], dist: { S: 0, A: 2, B: 5 }, log: 'settle S; relax: A=2, B=5' },
  { hl: [], settled: ['S', 'A'], dist: { S: 0, A: 2, B: 5 }, log: 'Dijkstra: closest is A (2) → SETTLED, final. Right?' },
  { hl: [['S', 'B'], ['B', 'A']], settled: ['S', 'A'], dist: { S: 0, A: 2, B: 5 }, wrong: true, log: 'but S→B→A = 5 + (−4) = 1 < 2 — the "final" answer is wrong!' },
];
export default function AgraphNegativeWeightsVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % STEPS.length), 2.2, auto);
  const s = STEPS[i];
  const EDGES = [['S', 'A', '2'], ['S', 'B', '5'], ['B', 'A', '−4']];
  return (
    <Stage2D title="Dijkstra + Negative Weights = Broken" subtitle="Dijkstra's whole proof rests on 'a settled node can never be improved'. One negative edge destroys that guarantee — a longer-looking detour can end up cheaper."
      accent="#f85149" viewBox="0 0 640 300"
      controls={<>{STEPS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">{s.log}</span></>}
      legend={s.wrong
        ? <>The greedy settle assumed no path through a <em>farther</em> node could be shorter — true only when every edge adds distance. With <strong>−4</strong> in play, the detour wins and Dijkstra never revisits A. Fixes: <strong>Bellman-Ford</strong> (next lesson) or re-weighting (Johnson's algorithm).</>
        : <>Watch Dijkstra behave exactly as designed: settle S, relax, settle the closest node A. Every step is locally correct — the failure only appears when the negative edge is considered too late.</>}>
      <defs><marker id="anw-arr" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L9,3 L0,6 Z" fill="#6e7681" /></marker></defs>
      {EDGES.map(([a, b, w], k) => {
        const [x1, y1] = N[a], [x2, y2] = N[b];
        const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy), ux = dx / len, uy = dy / len;
        const hot = s.hl.some(([ha, hb]) => ha === a && hb === b);
        const neg = w.includes('−');
        return (
          <g key={k}>
            <line x1={x1 + ux * 24} y1={y1 + uy * 24} x2={x2 - ux * 26} y2={y2 - uy * 26} stroke={hot ? (s.wrong ? '#f85149' : '#58a6ff') : neg ? '#f0883e' : '#6e7681'} strokeWidth={hot ? 4 : 2.5} markerEnd="url(#anw-arr)" className={hot ? 'dsa2d-pulse' : ''} />
            <circle cx={(x1 + x2) / 2 + (neg ? 16 : 0)} cy={(y1 + y2) / 2} r="13" fill="#0d1117" stroke={neg ? '#f0883e' : '#6e7681'} strokeWidth="2" />
            <text x={(x1 + x2) / 2 + (neg ? 16 : 0)} y={(y1 + y2) / 2 + 4} fill={neg ? '#f8c088' : '#c9d1d9'} fontSize="12" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{w}</text>
          </g>
        );
      })}
      {Object.entries(N).map(([id, [x, y]]) => {
        const settled = s.settled.includes(id);
        const isBad = s.wrong && id === 'A';
        return (
          <g key={id}>
            <circle cx={x} cy={y} r="22" fill={isBad ? 'rgba(248,81,73,.22)' : settled ? 'rgba(88,166,255,.25)' : '#161b22'} stroke={isBad ? '#f85149' : settled ? '#58a6ff' : '#8b949e'} strokeWidth="2.5" className={isBad ? 'dsa2d-pulse' : ''} style={{ transition: 'fill .3s' }} />
            <text x={x} y={y + 5} fill="#e6edf3" fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{id}</text>
            <text x={x} y={y + 42} fill={isBad ? '#f85149' : '#79c0ff'} fontSize="13" textAnchor="middle" fontWeight="700" fontFamily="Consolas">d={s.dist[id]}{isBad ? ' ✗ (true: 1)' : ''}</text>
          </g>
        );
      })}
      {s.wrong && <text x="320" y="290" fill="#f85149" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">settled A=2 can never be revisited — but the true shortest is 1</text>}
    </Stage2D>
  );
}
