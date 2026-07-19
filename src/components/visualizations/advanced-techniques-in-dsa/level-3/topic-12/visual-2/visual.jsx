/* Problem: Network Delay Time
 * 2D animated: Dijkstra from the signal source; the answer is the LARGEST shortest-distance —
 * when the farthest node hears the signal, everyone has. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const N = { K: [100, 140], A: [280, 60], B: [280, 220], C: [480, 140] };
const EDGES = [['K', 'A', 1], ['K', 'B', 4], ['A', 'B', 2], ['A', 'C', 5], ['B', 'C', 1]];
const ROUNDS = [
  { settled: ['K'], dist: { K: 0, A: 1, B: 4, C: '∞' }, log: 'signal starts at K: relax → A=1, B=4' },
  { settled: ['K', 'A'], dist: { K: 0, A: 1, B: 3, C: 6 }, log: 'settle A (1): B improves to 3, C=6' },
  { settled: ['K', 'A', 'B'], dist: { K: 0, A: 1, B: 3, C: 4 }, log: 'settle B (3): C improves to 4' },
  { settled: ['K', 'A', 'B', 'C'], dist: { K: 0, A: 1, B: 3, C: 4 }, done: true, log: 'settle C (4) → answer = max(1, 3, 4) = 4 time units' },
];
export default function AgraphNetworkDelayVisualization() {
  const [r, setR] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setR(v => (v + 1) % ROUNDS.length), 1.9, auto);
  const round = ROUNDS[r];
  return (
    <Stage2D title="Network Delay Time" subtitle="A signal leaves node K and travels along weighted edges. When does the LAST node receive it? Run Dijkstra from K; the answer is the maximum of all shortest distances."
      accent="#6b8cff" viewBox="0 0 640 280"
      controls={<>{ROUNDS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === r ? 'dsa2d-btn--on' : ''}`} onClick={() => setR(k)}>{k + 1}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">{round.log}</span></>}
      legend={<>Recognition cue: "time for a signal to reach ALL nodes" = single-source shortest paths + a max at the end. If any node stays at ∞ (unreachable), return −1. Standard heap Dijkstra: <strong>O((V+E) log V)</strong>.</>}>
      {EDGES.map(([a, b, w], k) => {
        const [x1, y1] = N[a], [x2, y2] = N[b];
        const on = round.settled.includes(a) && round.settled.includes(b);
        return <g key={k}><line x1={x1} y1={y1} x2={x2} y2={y2} stroke={on ? '#6b8cff' : '#30363d'} strokeWidth={on ? 3.5 : 2} style={{ transition: 'stroke .3s' }} /><circle cx={(x1 + x2) / 2} cy={(y1 + y2) / 2} r="10" fill="#0d1117" stroke="#6e7681" /><text x={(x1 + x2) / 2} y={(y1 + y2) / 2 + 4} fill="#c9d1d9" fontSize="11" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{w}</text></g>;
      })}
      {Object.entries(N).map(([id, [x, y]]) => {
        const settled = round.settled.includes(id);
        const isMax = round.done && id === 'C';
        return (
          <g key={id}>
            <circle cx={x} cy={y} r="23" fill={isMax ? 'rgba(86,211,100,.28)' : settled ? 'rgba(107,140,255,.25)' : '#161b22'} stroke={isMax ? '#56d364' : settled ? '#6b8cff' : '#8b949e'} strokeWidth="2.5" className={isMax ? 'dsa2d-pulse' : ''} style={{ transition: 'fill .3s' }} />
            <text x={x} y={y + 5} fill="#e6edf3" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{id === 'K' ? '📡K' : id}</text>
            <text x={x} y={y + 42} fill={settled ? '#79c0ff' : '#8b949e'} fontSize="13" textAnchor="middle" fontWeight="700" fontFamily="Consolas">t={round.dist[id]}</text>
          </g>
        );
      })}
      {round.done && <text x="320" y="268" fill="#56d364" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">network fully reached at t = 4 (the farthest node decides)</text>}
    </Stage2D>
  );
}
