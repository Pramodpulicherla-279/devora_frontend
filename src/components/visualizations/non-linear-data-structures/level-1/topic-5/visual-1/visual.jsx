/* Lesson: What Makes a Binary Search Tree Special
 * 2D animated: the BST ordering invariant — everything in a node's LEFT subtree is smaller,
 * everything in its RIGHT subtree is larger. Cycles through nodes showing the rule. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const P = { 50: [320, 46], 30: [190, 116], 70: [450, 116], 20: [120, 186], 40: [260, 186], 60: [390, 186], 80: [520, 186] };
const EDGES = [[50, 30], [50, 70], [30, 20], [30, 40], [70, 60], [70, 80]];
const LEFT = { 50: [30, 20, 40], 30: [20], 70: [60] };
const RIGHT = { 50: [70, 60, 80], 30: [40], 70: [80] };
const FOCUS = [50, 30, 70];
export default function TreeBstPropertyVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % FOCUS.length), 2.0, auto);
  const node = FOCUS[i];
  const leftSet = LEFT[node] || [], rightSet = RIGHT[node] || [];

  return (
    <Stage2D
      title="The BST Invariant"
      subtitle="A binary SEARCH tree adds one rule: for every node, all values in its left subtree are smaller, and all values in its right subtree are larger."
      accent="#56d364"
      viewBox="0 0 640 260"
      controls={
        <>
          {FOCUS.map((f, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>node {f}</button>)}
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">left &lt; {node} &lt; right</span>
        </>
      }
      legend={<>This ordering is what makes search fast: at each node you can discard an entire subtree. <code>left &lt; node &lt; right</code> holds <strong>recursively</strong> for every node. Break the invariant anywhere and BST search/insert stop working.</>}
    >
      {EDGES.map(([a, b], k) => <line key={k} x1={P[a][0]} y1={P[a][1]} x2={P[b][0]} y2={P[b][1]} stroke="#30363d" strokeWidth="2" />)}
      {Object.entries(P).map(([val, [x, y]]) => {
        const v = +val;
        const isNode = v === node;
        const isLeft = leftSet.includes(v);
        const isRight = rightSet.includes(v);
        return (
          <g key={val}>
            <circle cx={x} cy={y} r="22"
              fill={isNode ? 'rgba(255,212,59,.25)' : isLeft ? 'rgba(88,166,255,.2)' : isRight ? 'rgba(240,136,62,.2)' : '#161b22'}
              stroke={isNode ? '#ffd43b' : isLeft ? '#58a6ff' : isRight ? '#f0883e' : '#7c6bb0'} strokeWidth="2" className={isNode ? 'dsa2d-pulse' : ''} />
            <text x={x} y={y + 5} fill="#e6edf3" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{val}</text>
          </g>
        );
      })}
      <text x="150" y="238" fill="#58a6ff" fontSize="13" textAnchor="middle" fontFamily="Consolas">◀ smaller (left)</text>
      <text x="320" y="238" fill="#ffd43b" fontSize="13" textAnchor="middle" fontFamily="Consolas">node {node}</text>
      <text x="500" y="238" fill="#f0883e" fontSize="13" textAnchor="middle" fontFamily="Consolas">larger (right) ▶</text>
    </Stage2D>
  );
}
