/* Problem: Validate a Binary Search Tree
 * 2D animated: each node must fall within a (min, max) range inherited from its ancestors.
 * Toggle a valid tree and one with a sneaky violation deep in a subtree. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const P = { A: [320, 46], B: [190, 116], C: [450, 116], D: [120, 186], E: [260, 186], F: [380, 186], G: [500, 186] };
const EDGES = [['A', 'B'], ['A', 'C'], ['B', 'D'], ['B', 'E'], ['C', 'F'], ['C', 'G']];
const VALID = { A: 50, B: 30, C: 70, D: 20, E: 40, F: 60, G: 80 };
const BAD = { A: 50, B: 30, C: 70, D: 20, E: 40, F: 45, G: 80 };   // 45 in right subtree but < 50
export default function TreeValidateBstVisualization() {
  const [bad, setBad] = useState(false);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setBad(v => !v), 2.2, auto);
  const vals = bad ? BAD : VALID;

  return (
    <Stage2D
      title="Validate a Binary Search Tree"
      subtitle="It's not enough to check parent vs child. Every node must lie within a range (min, max) set by ALL its ancestors — a common trap."
      accent={bad ? '#f85149' : '#56d364'}
      viewBox="0 0 640 250"
      controls={
        <>
          <button className={`dsa2d-btn ${!bad ? 'dsa2d-btn--on' : ''}`} onClick={() => setBad(false)}>valid BST</button>
          <button className={`dsa2d-btn ${bad ? 'dsa2d-btn--on' : ''}`} onClick={() => setBad(true)}>invalid</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">{bad ? '✗ 45 violates (50, 70)' : '✓ every node in range'}</span>
        </>
      }
      legend={bad
        ? <>Node <strong>45</strong> is greater than its parent 70's… wait — it's in the <em>right</em> subtree of 50, so it must be &gt; 50, but 45 &lt; 50. A naive parent-only check misses this; you must pass down bounds → <strong>O(n)</strong>.</>
        : <>Recurse with an allowed range: going left tightens the max, going right tightens the min. A node is valid only if <code>min &lt; val &lt; max</code>. Equivalent to checking the inorder traversal is strictly increasing.</>}
    >
      {EDGES.map(([a, b], i) => <line key={i} x1={P[a][0]} y1={P[a][1]} x2={P[b][0]} y2={P[b][1]} stroke="#30363d" strokeWidth="2" />)}
      {Object.entries(P).map(([id, [x, y]]) => {
        const isBadNode = bad && id === 'F';
        return (
          <g key={id}>
            <circle cx={x} cy={y} r="22" fill={isBadNode ? 'rgba(248,81,73,.3)' : bad ? '#161b22' : 'rgba(86,211,100,.12)'} stroke={isBadNode ? '#f85149' : bad ? '#7c6bb0' : '#56d364'} strokeWidth="2" className={isBadNode ? 'dsa2d-pulse' : ''} />
            <text x={x} y={y + 5} fill="#e6edf3" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{vals[id]}</text>
            {isBadNode && <text x={x} y={y + 42} fill="#f85149" fontSize="11" textAnchor="middle" fontFamily="Consolas">must be &gt; 50</text>}
          </g>
        );
      })}
      <text x="320" y="234" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">right subtree of 50 must hold values &gt; 50 — all the way down</text>
    </Stage2D>
  );
}
