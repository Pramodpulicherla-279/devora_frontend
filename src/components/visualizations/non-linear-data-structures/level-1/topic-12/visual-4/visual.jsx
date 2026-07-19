/* Problem: Lowest Common Ancestor (LCA)
 * 2D animated: trace the root-to-node path for both targets. The last node the two paths share
 * is their lowest common ancestor. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const P = { 50: [320, 46], 30: [190, 116], 70: [450, 116], 20: [120, 186], 40: [260, 186], 60: [380, 186], 80: [500, 186] };
const EDGES = [[50, 30], [50, 70], [30, 20], [30, 40], [70, 60], [70, 80]];
const PATH_A = [50, 30, 20];   // to 20
const PATH_B = [50, 30, 40];   // to 40  → LCA = 30
const LCA = 30;
export default function TreeLcaVisualization() {
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setStep(v => (v > 3 ? 0 : v + 1)), 1.1, auto);
  const aSet = new Set(PATH_A.slice(0, step));
  const bSet = new Set(PATH_B.slice(0, step));
  const done = step > 3;

  return (
    <Stage2D
      title="Lowest Common Ancestor"
      subtitle="The LCA of two nodes is the deepest node that has both as descendants. Trace each node's path from the root; the last shared node is the answer."
      accent="#58a6ff"
      viewBox="0 0 640 240"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setStep(v => (v > 3 ? 0 : v + 1))}>step</button>
          <button className="dsa2d-btn" onClick={() => setStep(0)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">targets 20 & 40 · {done ? `LCA = ${LCA}` : 'tracing paths…'}</span>
        </>
      }
      legend={<>Recursive view: if a node's left subtree contains one target and its right subtree the other (or the node <em>is</em> a target), it's the LCA. One traversal → <strong>O(n)</strong>. Here both 20 and 40 live under <strong>30</strong>, so 30 is their lowest common ancestor.</>}
    >
      {EDGES.map(([a, b], i) => {
        const onA = PATH_A.indexOf(a) !== -1 && PATH_A.indexOf(b) === PATH_A.indexOf(a) + 1 && aSet.has(b);
        const onB = PATH_B.indexOf(a) !== -1 && PATH_B.indexOf(b) === PATH_B.indexOf(a) + 1 && bSet.has(b);
        return <line key={i} x1={P[a][0]} y1={P[a][1]} x2={P[b][0]} y2={P[b][1]} stroke={onA || onB ? '#58a6ff' : '#30363d'} strokeWidth={onA || onB ? 3 : 2} style={{ transition: 'stroke .3s' }} />;
      })}
      {Object.entries(P).map(([val, [x, y]]) => {
        const v = +val;
        const isTarget = v === 20 || v === 40;
        const onPath = aSet.has(v) || bSet.has(v);
        const isLca = done && v === LCA;
        return (
          <g key={val}>
            <circle cx={x} cy={y} r="22"
              fill={isLca ? 'rgba(86,211,100,.35)' : isTarget ? 'rgba(240,136,62,.25)' : onPath ? 'rgba(88,166,255,.14)' : '#161b22'}
              stroke={isLca ? '#56d364' : isTarget ? '#f0883e' : onPath ? '#58a6ff' : '#7c6bb0'} strokeWidth="2" className={isLca ? 'dsa2d-pulse' : ''} />
            <text x={x} y={y + 5} fill="#e6edf3" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{val}</text>
          </g>
        );
      })}
      {done && <text x="320" y="224" fill="#56d364" fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">paths split at 30 → LCA(20, 40) = 30</text>}
    </Stage2D>
  );
}
