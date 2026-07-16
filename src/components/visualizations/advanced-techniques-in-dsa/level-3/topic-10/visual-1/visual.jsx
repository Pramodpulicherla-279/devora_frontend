/* Lesson: Network Flow — An Introduction to Max Flow Problems
 * 2D animated: push flow along augmenting paths from source to sink until no path with spare
 * capacity remains. Shows flow/capacity on each edge building to the maximum. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const N = { S: [80, 150], A: [280, 60], B: [280, 240], T: [520, 150] };
const CAP = { 'S-A': 10, 'S-B': 5, 'A-B': 4, 'A-T': 6, 'B-T': 8 };
const STEPS = [
  { flow: {}, path: null, total: 0, log: 'capacities set — find a path with spare room' },
  { flow: { 'S-A': 6, 'A-T': 6 }, path: ['S-A', 'A-T'], total: 6, log: 'augment S→A→T by 6 (A→T is the bottleneck)' },
  { flow: { 'S-A': 6, 'A-T': 6, 'S-B': 5, 'B-T': 5 }, path: ['S-B', 'B-T'], total: 11, log: 'augment S→B→T by 5 (S→B is the bottleneck)' },
  { flow: { 'S-A': 9, 'A-T': 6, 'S-B': 5, 'B-T': 8, 'A-B': 3 }, path: ['S-A', 'A-B', 'B-T'], total: 14, log: 'augment S→A→B→T by 3 → no spare path remains: max flow = 14' },
];
const EDGES = [['S', 'A'], ['S', 'B'], ['A', 'B'], ['A', 'T'], ['B', 'T']];
export default function AgraphMaxFlowVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % STEPS.length), 2.4, auto);
  const s = STEPS[i];
  return (
    <Stage2D title="Max Flow (Ford-Fulkerson Idea)" subtitle="Treat edges as pipes with capacities. Repeatedly find a source→sink path with spare capacity and push as much flow as its tightest pipe allows. When no such path exists, the flow is maximal."
      accent="#58a6ff" viewBox="0 0 640 300"
      controls={<>{STEPS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">total flow: {s.total}</span></>}
      legend={<>Each augmenting path is limited by its <strong>bottleneck</strong> (minimum spare capacity). The famous <strong>max-flow = min-cut</strong> theorem says the answer equals the tightest "waistline" of the network. Applications: matching, scheduling, image segmentation, traffic.</>}>
      <defs><marker id="amf-arr" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L9,3 L0,6 Z" fill="#6e7681" /></marker></defs>
      {EDGES.map(([a, b], k) => {
        const key = a + '-' + b;
        const [x1, y1] = N[a], [x2, y2] = N[b];
        const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy), ux = dx / len, uy = dy / len;
        const fl = s.flow[key] || 0, cap = CAP[key];
        const onPath = s.path && s.path.includes(key);
        const full = fl === cap;
        return (
          <g key={k}>
            <line x1={x1 + ux * 26} y1={y1 + uy * 26} x2={x2 - ux * 28} y2={y2 - uy * 28} stroke={onPath ? '#58a6ff' : full ? '#f0883e' : '#484f58'} strokeWidth={2 + (fl / cap) * 5} markerEnd="url(#amf-arr)" className={onPath ? 'dsa2d-pulse' : ''} style={{ transition: 'stroke .3s, stroke-width .3s' }} />
            <rect x={(x1 + x2) / 2 - 26} y={(y1 + y2) / 2 - 12} width="52" height="22" rx="6" fill="#0d1117" stroke={onPath ? '#58a6ff' : '#30363d'} />
            <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 + 4} fill={full ? '#f8c088' : '#c9d1d9'} fontSize="12" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{fl}/{cap}</text>
          </g>
        );
      })}
      {Object.entries(N).map(([id, [x, y]]) => (
        <g key={id}>
          <circle cx={x} cy={y} r="24" fill={id === 'S' ? 'rgba(86,211,100,.2)' : id === 'T' ? 'rgba(88,166,255,.2)' : '#161b22'} stroke={id === 'S' ? '#56d364' : id === 'T' ? '#58a6ff' : '#8b949e'} strokeWidth="2.5" />
          <text x={x} y={y + 5} fill="#e6edf3" fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{id}</text>
        </g>
      ))}
      <text x="320" y="292" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">pipe thickness = flow · orange = saturated · flow/capacity on each edge</text>
    </Stage2D>
  );
}
