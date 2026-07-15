/* Lesson: Deleting a Node From a BST Without Breaking It
 * 2D animated: the hardest case — deleting a node with two children. Replace it with its
 * inorder successor (smallest value in the right subtree), preserving the BST order. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const P = { 50: [320, 46], 30: [190, 116], 70: [450, 116], 20: [120, 186], 40: [260, 186], 60: [390, 186], 80: [520, 186] };
const EDGES = [[50, 30], [50, 70], [30, 20], [30, 40], [70, 60], [70, 80]];
const PHASES = ['target 30 (two children)', 'find successor = 40 (min of right subtree)', "copy 40 up, remove old 40", 'done — BST still valid'];
export default function TreeBstDeleteVisualization() {
  const [ph, setPh] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setPh(v => (v + 1) % PHASES.length), 1.6, auto);
  // display value at position of node 30
  const label30 = ph >= 2 ? '40' : '30';
  const removed40 = ph >= 2;

  return (
    <Stage2D
      title="Deleting From a BST"
      subtitle="Deleting a leaf is trivial; one child, just splice. The tricky case is TWO children — swap in the inorder successor so the ordering stays intact."
      accent="#f0883e"
      viewBox="0 0 640 260"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setPh(v => (v + 1) % PHASES.length)}>step</button>
          <button className="dsa2d-btn" onClick={() => setPh(0)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">{PHASES[ph]}</span>
        </>
      }
      legend={<>Three cases: <strong>leaf</strong> → remove it; <strong>one child</strong> → link the child to the parent; <strong>two children</strong> → replace the node's value with its <strong>inorder successor</strong> (smallest in the right subtree, or largest in the left), then delete that successor. All O(h).</>}
    >
      {EDGES.map(([a, b], k) => {
        if (removed40 && b === 40) return null;
        return <line key={k} x1={P[a][0]} y1={P[a][1]} x2={P[b][0]} y2={P[b][1]} stroke="#30363d" strokeWidth="2" />;
      })}
      {Object.entries(P).map(([val, [x, y]]) => {
        const v = +val;
        if (v === 40 && removed40) return (
          <g key={val} style={{ opacity: 0.2 }}><circle cx={x} cy={y} r="22" fill="#161b22" stroke="#484f58" strokeWidth="2" strokeDasharray="3 3" /><text x={x} y={y + 5} fill="#484f58" fontSize="14" textAnchor="middle" fontFamily="Consolas">40</text></g>
        );
        const isTarget = v === 30;
        const isSucc = v === 40 && ph === 1;
        return (
          <g key={val}>
            <circle cx={x} cy={y} r="22"
              fill={isTarget ? 'rgba(240,136,62,.28)' : isSucc ? 'rgba(86,211,100,.25)' : '#161b22'}
              stroke={isTarget ? '#f0883e' : isSucc ? '#56d364' : '#7c6bb0'} strokeWidth="2"
              className={isTarget || isSucc ? 'dsa2d-pulse' : ''} />
            <text x={x} y={y + 5} fill="#e6edf3" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v === 30 ? label30 : val}</text>
          </g>
        );
      })}
      {ph === 3 && <text x="320" y="238" fill="#56d364" fontSize="13" textAnchor="middle" fontFamily="Consolas">inorder still sorted: 20 · 40 · 50 · 60 · 70 · 80 ✓</text>}
    </Stage2D>
  );
}
