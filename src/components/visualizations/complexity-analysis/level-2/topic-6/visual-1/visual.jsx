/* Lesson: Fibonacci Numbers — Recursion's Classic (and Costly) Example
 * 2D animated: the fib(5) call tree grows node by node, branching into fib(n-1) and fib(n-2).
 * You can see the tree fan out. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

// Pre-laid-out fib(5) tree nodes: {id, n, x, y, parent}
const NODES = [
  { id: 0, n: 5, x: 320, y: 40, p: null },
  { id: 1, n: 4, x: 200, y: 100, p: 0 }, { id: 2, n: 3, x: 440, y: 100, p: 0 },
  { id: 3, n: 3, x: 130, y: 165, p: 1 }, { id: 4, n: 2, x: 265, y: 165, p: 1 },
  { id: 5, n: 2, x: 390, y: 165, p: 2 }, { id: 6, n: 1, x: 510, y: 165, p: 2 },
  { id: 7, n: 2, x: 90, y: 235, p: 3 }, { id: 8, n: 1, x: 175, y: 235, p: 3 },
  { id: 9, n: 1, x: 240, y: 235, p: 4 }, { id: 10, n: 0, x: 305, y: 235, p: 4 },
  { id: 11, n: 1, x: 360, y: 235, p: 5 }, { id: 12, n: 0, x: 425, y: 235, p: 5 },
];
export default function CrFibonacciVisualization() {
  const [shown, setShown] = useState(1);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setShown(v => (v >= NODES.length ? 1 : v + 1)), 0.5, auto);

  return (
    <Stage2D
      title="Fibonacci as a Call Tree"
      subtitle="fib(n) = fib(n-1) + fib(n-2). Each call branches into two, so the recursion forms a binary tree that grows fast."
      accent="#f0883e"
      viewBox="0 0 640 290"
      controls={
        <>
          <div className="dsa2d-group"><span className="dsa2d-label">calls: {Math.min(shown, NODES.length)}</span><input className="dsa2d-slider" type="range" min="1" max="13" value={shown} onChange={e => setShown(+e.target.value)} /></div>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        </>
      }
      legend={<>Computing <code>fib(5)</code> alone spawns <strong>13</strong> calls. Each level roughly doubles the work, so naive Fibonacci is <strong>O(2ⁿ)</strong> — exponential. Notice <code>fib(2)</code> and <code>fib(1)</code> get computed again and again (the next lesson fixes this).</>}
    >
      {/* edges */}
      {NODES.map(nd => nd.p !== null && (() => {
        const par = NODES[nd.p];
        const on = nd.id < shown;
        return <line key={'e' + nd.id} x1={par.x} y1={par.y + 14} x2={nd.x} y2={nd.y - 14} stroke={on ? '#f0883e' : '#21262d'} strokeWidth="2" style={{ transition: 'stroke .3s' }} />;
      })())}
      {/* nodes */}
      {NODES.map(nd => {
        const on = nd.id < shown;
        const isBase = nd.n <= 1;
        return (
          <g key={nd.id} style={{ opacity: on ? 1 : 0.12, transition: 'opacity .3s' }}>
            <circle cx={nd.x} cy={nd.y} r="17" fill={isBase ? 'rgba(255,212,59,.16)' : '#161b22'} stroke={isBase ? '#ffd43b' : '#f0883e'} strokeWidth="2" className={on && nd.id === shown - 1 ? 'dsa2d-pulse' : ''} />
            <text x={nd.x} y={nd.y + 5} fill={isBase ? '#ffd43b' : '#f8c088'} fontSize="13" textAnchor="middle" fontFamily="Consolas">{nd.n}</text>
          </g>
        );
      })}
      <text x="320" y="280" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">yellow = base case (n ≤ 1) · orange = still branching</text>
    </Stage2D>
  );
}
