/* Lesson: Binary Trees — Nodes, Roots, Leaves, and Height
 * 2D animated: a binary tree (≤2 children per node). Cycles through height, depth, and levels
 * so each measurement is visually clear. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const N = { 0: [320, 46], 1: [200, 116], 2: [440, 116], 3: [140, 186], 4: [260, 186], 5: [500, 186] };
const EDGES = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5]];
const LEVEL = { 0: 0, 1: 1, 2: 1, 3: 2, 4: 2, 5: 2 };
const MODES = [
  { t: 'Levels', hi: 'all', desc: 'Nodes at the same depth form a level. This tree has 3 levels (0, 1, 2).' },
  { t: 'Height = 2', hi: [0, 1, 3], desc: 'Height = longest path from root down to a leaf (edges counted).' },
  { t: 'Leaves', hi: [3, 4, 5], desc: 'Leaves have no children. A binary node has at most two children.' },
];
export default function TreeBinaryVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % MODES.length), 2.0, auto);
  const m = MODES[i];
  const isHi = id => m.hi === 'all' ? true : m.hi.includes(id);

  return (
    <Stage2D
      title="Binary Trees"
      subtitle="A binary tree restricts each node to at most two children — a left and a right. This simple rule powers search trees, heaps, and expression trees."
      accent="#58a6ff"
      viewBox="0 0 640 260"
      controls={
        <>
          {MODES.map((mm, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{mm.t}</button>)}
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        </>
      }
      legend={<><strong>Depth</strong> of a node = edges from the root to it. <strong>Height</strong> of the tree = the deepest such path. A tree with n nodes can be as short as <code>log₂(n)</code> (balanced) or as tall as <code>n</code> (a degenerate chain) — and height determines operation speed.</>}
    >
      {/* level bands */}
      {i === 0 && [0, 1, 2].map(lv => <g key={lv}><line x1="40" y1={46 + lv * 70} x2="600" y2={46 + lv * 70} stroke="#21262d" strokeDasharray="4 4" /><text x="48" y={42 + lv * 70} fill="#8b949e" fontSize="11" fontFamily="Consolas">level {lv}</text></g>)}
      {EDGES.map(([a, b], k) => {
        const on = isHi(a) && isHi(b) && m.hi !== 'all';
        return <line key={k} x1={N[a][0]} y1={N[a][1]} x2={N[b][0]} y2={N[b][1]} stroke={on ? '#58a6ff' : '#30363d'} strokeWidth={on ? 3 : 2} style={{ transition: 'stroke .3s' }} />;
      })}
      {Object.entries(N).map(([id, [x, y]]) => {
        const on = isHi(+id);
        const leaf = !EDGES.some(([a]) => a === +id);
        return (
          <g key={id}>
            <circle cx={x} cy={y} r="21" fill={on && m.hi !== 'all' ? 'rgba(88,166,255,.25)' : leaf ? 'rgba(86,211,100,.1)' : '#161b22'} stroke={on && m.hi !== 'all' ? '#58a6ff' : leaf ? '#3fb950' : '#7c6bb0'} strokeWidth="2" />
            <text x={x} y={y + 5} fill="#e6edf3" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{+id + 1}</text>
          </g>
        );
      })}
      <text x="320" y="244" fill="#c9d1d9" fontSize="13" textAnchor="middle" fontFamily="system-ui"><tspan fill="#58a6ff" fontWeight="700">{m.t}: </tspan>{m.desc}</text>
    </Stage2D>
  );
}
