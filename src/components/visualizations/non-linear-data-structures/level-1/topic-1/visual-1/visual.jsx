/* Lesson: What Is a Tree? From Family Trees to File Systems
 * 2D animated: a hierarchy of nodes connected by edges. Cycles through the core vocabulary —
 * root, parent/child, leaf, subtree — highlighting the relevant nodes. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const N = { 0: [320, 46], 1: [190, 120], 2: [450, 120], 3: [120, 194], 4: [260, 194], 5: [390, 194], 6: [520, 194] };
const EDGES = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6]];
const TERMS = [
  { t: 'Root', hi: [0], desc: 'The single top node — every other node descends from it.' },
  { t: 'Parent → Child', hi: [1, 3, 4], desc: 'A node directly above others; those below it are its children.' },
  { t: 'Leaf nodes', hi: [3, 4, 5, 6], desc: 'Nodes with no children — the ends of the branches.' },
  { t: 'Subtree', hi: [2, 5, 6], desc: 'Any node plus all its descendants forms a smaller tree.' },
];
export default function TreeIntroVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % TERMS.length), 2.0, auto);
  const term = TERMS[i];

  return (
    <Stage2D
      title="What Is a Tree?"
      subtitle="A tree is a hierarchy: one root node branches into children, which branch further. File systems, org charts, and the HTML DOM are all trees."
      accent="#56d364"
      viewBox="0 0 640 260"
      controls={
        <>
          {TERMS.map((tm, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{tm.t}</button>)}
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        </>
      }
      legend={<>Key terms: the <strong>root</strong> is the top; each node has one <strong>parent</strong> and zero or more <strong>children</strong>; nodes with no children are <strong>leaves</strong>. Unlike a linked list, a tree branches — enabling fast hierarchical search.</>}
    >
      {EDGES.map(([a, b], k) => {
        const on = term.hi.includes(a) && term.hi.includes(b);
        return <line key={k} x1={N[a][0]} y1={N[a][1]} x2={N[b][0]} y2={N[b][1]} stroke={on ? '#56d364' : '#30363d'} strokeWidth="2" style={{ transition: 'stroke .3s' }} />;
      })}
      {Object.entries(N).map(([id, [x, y]]) => {
        const on = term.hi.includes(+id);
        return (
          <g key={id}>
            <circle cx={x} cy={y} r="22" fill={on ? 'rgba(86,211,100,.25)' : '#161b22'} stroke={on ? '#56d364' : '#7c6bb0'} strokeWidth="2" className={on ? 'dsa2d-pulse' : ''} />
            <text x={x} y={y + 5} fill="#e6edf3" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{+id === 0 ? '/' : String.fromCharCode(65 + +id - 1)}</text>
          </g>
        );
      })}
      <text x="320" y="240" fill="#c9d1d9" fontSize="14" textAnchor="middle" fontFamily="system-ui"><tspan fill="#56d364" fontWeight="700">{term.t}: </tspan>{term.desc}</text>
    </Stage2D>
  );
}
