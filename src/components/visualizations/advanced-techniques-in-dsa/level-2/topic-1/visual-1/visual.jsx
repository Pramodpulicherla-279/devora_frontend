/* Lesson: What Is Dynamic Programming, Really? Solving Overlapping Subproblems
 * 2D animated: the naive fib(5) call tree with REPEATED subproblems colour-grouped — the
 * overlap is the reason DP exists. Toggle to collapse duplicates into one computation each. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const NODES = [
  { id: 0, n: 5, x: 320, y: 40, p: null },
  { id: 1, n: 4, x: 200, y: 100, p: 0 }, { id: 2, n: 3, x: 440, y: 100, p: 0 },
  { id: 3, n: 3, x: 130, y: 165, p: 1 }, { id: 4, n: 2, x: 265, y: 165, p: 1 },
  { id: 5, n: 2, x: 390, y: 165, p: 2 }, { id: 6, n: 1, x: 510, y: 165, p: 2 },
  { id: 7, n: 2, x: 90, y: 235, p: 3 }, { id: 8, n: 1, x: 175, y: 235, p: 3 },
  { id: 9, n: 1, x: 240, y: 235, p: 4 }, { id: 10, n: 0, x: 305, y: 235, p: 4 },
  { id: 11, n: 1, x: 360, y: 235, p: 5 }, { id: 12, n: 0, x: 425, y: 235, p: 5 },
];
const HUE = { 5: '#e6edf3', 4: '#79c0ff', 3: '#a78bfa', 2: '#f0883e', 1: '#ffd43b', 0: '#8b949e' };
export default function DpIntroVisualization() {
  const [collapse, setCollapse] = useState(false);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setCollapse(c => !c), 2.6, auto);
  const firstOf = {}; NODES.forEach(nd => { if (firstOf[nd.n] === undefined) firstOf[nd.n] = nd.id; });
  const unique = Object.keys(firstOf).length;
  return (
    <Stage2D title="Overlapping Subproblems" subtitle="Naive recursion recomputes fib(3) twice, fib(2) three times, fib(1) five times. Dynamic programming's whole idea: solve each distinct subproblem ONCE and reuse the answer."
      accent="#a78bfa" viewBox="0 0 640 290"
      controls={<><button className={`dsa2d-btn ${!collapse ? 'dsa2d-btn--on' : ''}`} onClick={() => setCollapse(false)}>naive: {NODES.length} calls</button><button className={`dsa2d-btn ${collapse ? 'dsa2d-btn--on' : ''}`} onClick={() => setCollapse(true)}>DP: {unique} computations</button><AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /></>}
      legend={collapse
        ? <>Cache each answer the first time (dimmed nodes become <strong>lookups</strong>, not work). {NODES.length} calls collapse to <strong>{unique}</strong> real computations → exponential becomes linear. DP = recursion + memory.</>
        : <>Same colour = the <strong>same subproblem</strong> computed again from scratch. This overlap is DP's tell: if a recursion tree repeats itself, caching (memoization) or a bottom-up table (tabulation) collapses the waste.</>}>
      {NODES.filter(n => n.p !== null).map(n => { const par = NODES[n.p]; const dim = collapse && firstOf[n.n] !== n.id; return <line key={n.id} x1={par.x} y1={par.y + 14} x2={n.x} y2={n.y - 14} stroke={dim ? '#21262d' : '#30363d'} strokeWidth="2" style={{ transition: 'stroke .4s' }} />; })}
      {NODES.map(n => {
        const dim = collapse && firstOf[n.n] !== n.id;
        return (
          <g key={n.id} style={{ opacity: dim ? 0.22 : 1, transition: 'opacity .4s' }}>
            <circle cx={n.x} cy={n.y} r="17" fill={dim ? '#161b22' : HUE[n.n] + '26'} stroke={HUE[n.n]} strokeWidth="2.5" />
            <text x={n.x} y={n.y + 5} fill={HUE[n.n]} fontSize="13" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{n.n}</text>
          </g>
        );
      })}
      <text x="320" y="282" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">{collapse ? 'dimmed = served from cache (no recomputation)' : 'same colour = duplicated work'}</text>
    </Stage2D>
  );
}
