/* Problem: Maximum Depth of a Binary Tree
 * 2D animated: depth computed bottom-up — a node's depth is 1 + max(child depths). Leaves are
 * 1; the root's value is the answer. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const P = { 50: [320, 46], 30: [190, 116], 70: [450, 116], 20: [120, 186], 40: [260, 186], 60: [380, 186] };
const EDGES = [[50, 30], [50, 70], [30, 20], [30, 40], [70, 60]];
const DEPTH = { 20: 1, 40: 1, 60: 1, 30: 2, 70: 2, 50: 3 };
const REVEAL = [20, 40, 60, 30, 70, 50];   // bottom-up order
export default function TreeMaxDepthVisualization() {
  const [k, setK] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setK(v => (v > REVEAL.length ? 0 : v + 1)), 0.9, auto);
  const shown = new Set(REVEAL.slice(0, Math.min(k, REVEAL.length)));
  const done = k > REVEAL.length;

  return (
    <Stage2D
      title="Maximum Depth of a Binary Tree"
      subtitle="Depth is defined recursively: an empty subtree is 0, otherwise 1 + the deeper of its two children. Computed from the leaves upward."
      accent="#56d364"
      viewBox="0 0 640 240"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setK(v => (v > REVEAL.length ? 0 : v + 1))}>compute next</button>
          <button className="dsa2d-btn" onClick={() => setK(0)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">{done ? 'max depth = 3' : k > 0 ? `depth(${REVEAL[k - 1]}) = ${DEPTH[REVEAL[k - 1]]}` : ''}</span>
        </>
      }
      legend={<><code>maxDepth(node) = 1 + max(maxDepth(left), maxDepth(right))</code>, with empty = 0. It's a single post-order recursion → <strong>O(n)</strong> time and O(h) call-stack space. The root's returned value (here <strong>3</strong>) is the tree's depth.</>}
    >
      {EDGES.map(([a, b], i) => <line key={i} x1={P[a][0]} y1={P[a][1]} x2={P[b][0]} y2={P[b][1]} stroke="#30363d" strokeWidth="2" />)}
      {Object.entries(P).map(([val, [x, y]]) => {
        const on = shown.has(+val);
        const isRoot = +val === 50 && done;
        return (
          <g key={val}>
            <circle cx={x} cy={y} r="22" fill={isRoot ? 'rgba(86,211,100,.35)' : on ? 'rgba(86,211,100,.14)' : '#161b22'} stroke={on ? '#56d364' : '#7c6bb0'} strokeWidth="2" className={on && REVEAL[k - 1] == val ? 'dsa2d-pulse' : ''} />
            <text x={x} y={y + 5} fill="#e6edf3" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{val}</text>
            {on && <text x={x + 24} y={y - 14} fill="#56d364" fontSize="13" fontFamily="Consolas">d{DEPTH[+val]}</text>}
          </g>
        );
      })}
      <text x="320" y="224" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">leaves depth 1 → parents 1 + max(children) → root = 3</text>
    </Stage2D>
  );
}
