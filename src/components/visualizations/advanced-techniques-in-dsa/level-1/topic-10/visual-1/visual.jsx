/* Lesson: Why Dijkstra's Algorithm Is Greedy at Its Core
 * 2D animated: each round, Dijkstra permanently settles the CLOSEST unsettled node — a greedy
 * commitment that's safe because no shorter path can appear later (with non-negative weights). */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const N = { S: [90, 140], A: [280, 60], B: [280, 220], C: [480, 140] };
const EDGES = [['S', 'A', 2], ['S', 'B', 5], ['A', 'B', 1], ['A', 'C', 4], ['B', 'C', 2]];
// precomputed rounds: settle order + dist snapshots
const ROUNDS = [
  { settled: ['S'], dist: { S: 0, A: 2, B: 5, C: '∞' }, pick: 'S', log: 'settle S (dist 0); relax neighbours: A=2, B=5' },
  { settled: ['S', 'A'], dist: { S: 0, A: 2, B: 3, C: 6 }, pick: 'A', log: 'closest unsettled is A (2) — settle it; B improves to 3, C=6' },
  { settled: ['S', 'A', 'B'], dist: { S: 0, A: 2, B: 3, C: 5 }, pick: 'B', log: 'closest unsettled is B (3) — settle it; C improves to 5' },
  { settled: ['S', 'A', 'B', 'C'], dist: { S: 0, A: 2, B: 3, C: 5 }, pick: 'C', log: 'settle C (5) — all shortest paths final' },
];
export default function GreedyDijkstraVisualization() {
  const [r, setR] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setR(v => (v + 1) % ROUNDS.length), 1.9, auto);
  const round = ROUNDS[r];
  return (
    <Stage2D title="Dijkstra Is Greedy at Heart" subtitle="Every round makes one greedy, irreversible commitment: the unsettled node with the smallest known distance is declared FINAL. With no negative edges, nothing later can beat it."
      accent="#58a6ff" viewBox="0 0 640 290"
      controls={<><button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setR(v => (v + 1) % ROUNDS.length)}>next round</button><button className="dsa2d-btn" onClick={() => setR(0)}>↺</button><AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">{round.log}</span></>}
      legend={<>The greedy proof: when the closest node is settled, any alternative path to it would have to pass through a farther node first — impossible with non-negative weights. That's also exactly why <strong>negative edges break Dijkstra</strong> (next lessons). Full step-through comes in Advanced Graphs.</>}>
      {EDGES.map(([a, b, w], k) => {
        const [x1, y1] = N[a], [x2, y2] = N[b];
        const on = round.settled.includes(a) && round.settled.includes(b);
        return <g key={k}><line x1={x1} y1={y1} x2={x2} y2={y2} stroke={on ? '#58a6ff' : '#30363d'} strokeWidth={on ? 3.5 : 2} style={{ transition: 'stroke .3s' }} /><circle cx={(x1 + x2) / 2} cy={(y1 + y2) / 2} r="10" fill="#0d1117" stroke="#484f58" /><text x={(x1 + x2) / 2} y={(y1 + y2) / 2 + 4} fill="#c9d1d9" fontSize="11" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{w}</text></g>;
      })}
      {Object.entries(N).map(([id, [x, y]]) => {
        const settled = round.settled.includes(id), isPick = round.pick === id;
        return (
          <g key={id}>
            <circle cx={x} cy={y} r="22" fill={isPick ? '#ffd43b' : settled ? 'rgba(88,166,255,.28)' : '#161b22'} stroke={isPick ? '#ffd43b' : settled ? '#58a6ff' : '#8b949e'} strokeWidth="2.5" className={isPick ? 'dsa2d-pulse' : ''} style={{ transition: 'fill .3s' }} />
            <text x={x} y={y + 5} fill={isPick ? '#0d1117' : '#e6edf3'} fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{id}</text>
            <text x={x} y={y + 42} fill={settled ? '#79c0ff' : '#8b949e'} fontSize="13" textAnchor="middle" fontWeight="700" fontFamily="Consolas">d={round.dist[id]}</text>
          </g>
        );
      })}
    </Stage2D>
  );
}
