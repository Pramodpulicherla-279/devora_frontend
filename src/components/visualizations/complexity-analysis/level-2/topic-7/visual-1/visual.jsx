/* Lesson: Why Naive Fibonacci Is Slow — An Early Look at Memoization
 * 2D animated: toggle between the naive tree (recomputes everything) and the memoized version
 * (each fib value computed once, then cached). The node count collapses. */
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
// In the memoized version only the FIRST occurrence of each n is truly computed.
const firstOf = {}; NODES.forEach(nd => { if (firstOf[nd.n] === undefined) firstOf[nd.n] = nd.id; });

export default function CrMemoizationVisualization() {
  const [memo, setMemo] = useState(false);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setMemo(m => !m), 2.4, auto);
  const activeCount = memo ? Object.keys(firstOf).length : NODES.length;

  return (
    <Stage2D
      title="Naive vs Memoized Fibonacci"
      subtitle="The naive tree recomputes the same fib values over and over. Memoization caches each result the first time — repeats become instant lookups."
      accent="#56d364"
      viewBox="0 0 640 290"
      controls={
        <>
          <button className={`dsa2d-btn ${!memo ? 'dsa2d-btn--on' : ''}`} onClick={() => setMemo(false)}>naive — O(2ⁿ)</button>
          <button className={`dsa2d-btn ${memo ? 'dsa2d-btn--on' : ''}`} onClick={() => setMemo(true)}>memoized — O(n)</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">{memo ? `${activeCount} real calls (rest cached)` : `${activeCount} calls`}</span>
        </>
      }
      legend={memo
        ? <>With a <code>memo</code> dict, each <code>fib(n)</code> is computed <strong>once</strong> (solid) and every repeat is a cached lookup (dimmed) → <strong>O(n)</strong> time. This is the leap from exponential to linear.</>
        : <>Grey nodes are <strong>duplicate work</strong> — <code>fib(3)</code>, <code>fib(2)</code>, <code>fib(1)</code> recomputed from scratch each time. The tree doubles each level → <strong>O(2ⁿ)</strong>. Toggle memoization to see the waste vanish.</>}
    >
      {NODES.map(nd => nd.p !== null && (() => {
        const par = NODES[nd.p];
        const cached = memo && firstOf[nd.n] !== nd.id;
        return <line key={'e' + nd.id} x1={par.x} y1={par.y + 14} x2={nd.x} y2={nd.y - 14} stroke={cached ? '#21262d' : '#56d364'} strokeWidth="2" style={{ transition: 'stroke .4s' }} />;
      })())}
      {NODES.map(nd => {
        const cached = memo && firstOf[nd.n] !== nd.id;
        const isBase = nd.n <= 1;
        return (
          <g key={nd.id} style={{ opacity: cached ? 0.25 : 1, transition: 'opacity .4s' }}>
            <circle cx={nd.x} cy={nd.y} r="17" fill={cached ? '#161b22' : isBase ? 'rgba(255,212,59,.16)' : 'rgba(86,211,100,.14)'} stroke={cached ? '#30363d' : isBase ? '#ffd43b' : '#56d364'} strokeWidth="2" />
            <text x={nd.x} y={nd.y + 5} fill={cached ? '#6b7785' : isBase ? '#ffd43b' : '#7ee787'} fontSize="13" textAnchor="middle" fontFamily="Consolas">{nd.n}</text>
          </g>
        );
      })}
      <text x="320" y="280" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">{memo ? 'dimmed = served from cache' : 'every node is real work'}</text>
    </Stage2D>
  );
}
