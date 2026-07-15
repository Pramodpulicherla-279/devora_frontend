/* Problem: Diameter of a Binary Tree
 * 2D animated: the diameter is the longest path between any two nodes. At each node it equals
 * leftHeight + rightHeight; the maximum over all nodes is the answer. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const P = { 50: [320, 46], 30: [190, 116], 70: [450, 116], 20: [120, 186], 40: [260, 186], 80: [500, 186] };
const EDGES = [[50, 30], [50, 70], [30, 20], [30, 40], [70, 80]];
const DIAM_PATH = [20, 30, 50, 70, 80];   // longest path, 4 edges
const DIAM_EDGES = [[20, 30], [30, 50], [50, 70], [70, 80]];
export default function TreeDiameterVisualization() {
  const [k, setK] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setK(v => (v > DIAM_PATH.length ? 0 : v + 1)), 0.8, auto);
  const shown = DIAM_PATH.slice(0, Math.min(k, DIAM_PATH.length));
  const done = k > DIAM_PATH.length;

  return (
    <Stage2D
      title="Diameter of a Binary Tree"
      subtitle="The diameter is the longest path between any two nodes, measured in edges. It may or may not pass through the root — here it does."
      accent="#f0883e"
      viewBox="0 0 640 240"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setK(v => (v > DIAM_PATH.length ? 0 : v + 1))}>trace path</button>
          <button className="dsa2d-btn" onClick={() => setK(0)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">{done ? 'diameter = 4 edges' : `path length ${Math.max(0, shown.length - 1)}`}</span>
        </>
      }
      legend={<>Compute height recursively; at each node the longest path <em>through</em> it is <code>leftHeight + rightHeight</code>. Track the max while computing heights → a single <strong>O(n)</strong> pass. The winning path here is <strong>20–30–50–70–80</strong> (4 edges).</>}
    >
      {EDGES.map(([a, b], i) => {
        const onDiam = DIAM_EDGES.some(([x, y]) => (x === a && y === b) || (x === b && y === a)) && shown.includes(a) && shown.includes(b);
        return <line key={i} x1={P[a][0]} y1={P[a][1]} x2={P[b][0]} y2={P[b][1]} stroke={onDiam ? '#f0883e' : '#30363d'} strokeWidth={onDiam ? 4 : 2} style={{ transition: 'stroke .3s' }} />;
      })}
      {Object.entries(P).map(([val, [x, y]]) => {
        const on = shown.includes(+val);
        return (
          <g key={val}>
            <circle cx={x} cy={y} r="22" fill={on ? 'rgba(240,136,62,.28)' : '#161b22'} stroke={on ? '#f0883e' : '#7c6bb0'} strokeWidth="2" className={on && shown[shown.length - 1] == val ? 'dsa2d-pulse' : ''} />
            <text x={x} y={y + 5} fill="#e6edf3" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{val}</text>
          </g>
        );
      })}
      <text x="320" y="224" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">longest path through root = leftHeight(2) + rightHeight(2) = 4 edges</text>
    </Stage2D>
  );
}
