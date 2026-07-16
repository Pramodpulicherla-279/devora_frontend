/* Lesson: Minimum Spanning Trees — An Introduction
 * 2D animated: connect every node with the least total edge weight. Consider edges cheapest
 * first, accepting any that don't form a cycle (Kruskal's idea, previewed). */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const N = { A: [100, 80], B: [280, 50], C: [460, 90], D: [180, 210], E: [380, 220] };
const EDGES = [
  { a: 'C', b: 'E', w: 1, ok: true }, { a: 'A', b: 'D', w: 2, ok: true },
  { a: 'B', b: 'C', w: 3, ok: true }, { a: 'A', b: 'B', w: 4, ok: true },
  { a: 'B', b: 'D', w: 5, ok: false }, { a: 'B', b: 'E', w: 6, ok: false }, { a: 'D', b: 'E', w: 7, ok: false },
]; // pre-sorted by weight; ok = accepted by Kruskal
export default function GreedyMstIntroVisualization() {
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setStep(v => (v >= EDGES.length ? 0 : v + 1)), 1.3, auto);
  const cost = EDGES.slice(0, step).filter(e => e.ok).reduce((s, e) => s + e.w, 0);
  return (
    <Stage2D title="Minimum Spanning Tree (Intro)" subtitle="Wire every city with the cheapest total cable: consider edges from cheapest to priciest, keep any edge that connects something new, reject any that would close a loop."
      accent="#4fce78" viewBox="0 0 640 270"
      controls={<><button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setStep(v => (v >= EDGES.length ? 0 : v + 1))}>next edge</button><button className="dsa2d-btn" onClick={() => setStep(0)}>↺</button><AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">MST cost so far: {cost}</span></>}
      legend={<>A spanning tree touches all <code>n</code> nodes with exactly <code>n−1</code> edges and no cycles; the <em>minimum</em> one has the least total weight. The greedy "cheapest safe edge" rule is provably optimal (the cut property). The next lessons build the two famous versions: <strong>Kruskal's</strong> and <strong>Prim's</strong>.</>}>
      {EDGES.map((e, k) => {
        const seen = k < step, isCur = k === step;
        const [x1, y1] = N[e.a], [x2, y2] = N[e.b];
        const col = isCur ? '#ffd43b' : seen ? (e.ok ? '#56d364' : '#30363d') : '#30363d';
        return (
          <g key={k}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={col} strokeWidth={seen && e.ok ? 4 : isCur ? 3 : 2} strokeDasharray={seen && !e.ok ? '4 5' : 'none'} className={isCur ? 'dsa2d-pulse' : ''} style={{ transition: 'stroke .3s', opacity: seen && !e.ok ? 0.4 : 1 }} />
            <circle cx={(x1 + x2) / 2} cy={(y1 + y2) / 2} r="11" fill="#0d1117" stroke={col} />
            <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 + 4} fill={seen && e.ok ? '#7ee787' : '#c9d1d9'} fontSize="11" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{e.w}</text>
          </g>
        );
      })}
      {Object.entries(N).map(([id, [x, y]]) => (
        <g key={id}><circle cx={x} cy={y} r="19" fill="#161b22" stroke="#4fce78" strokeWidth="2.5" /><text x={x} y={y + 5} fill="#e6edf3" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{id}</text></g>
      ))}
      <text x="320" y="262" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">solid green = in the MST · dashed = rejected (would form a cycle)</text>
    </Stage2D>
  );
}
