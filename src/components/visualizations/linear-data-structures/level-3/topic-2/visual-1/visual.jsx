/* Lesson: Building a Node Class and Your First Singly Linked List
 * 2D animated: assemble a list one node at a time. Each Node holds data + a next pointer; the
 * chain builds head → n1 → n2 → None. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const VALS = [10, 20, 30, 40];
export default function LlNodeClassVisualization() {
  const [n, setN] = useState(1);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setN(v => (v >= VALS.length ? 1 : v + 1)), 0.9, auto);
  const NW = 96, gap = 34;
  const startX = 320 - (VALS.length * (NW + gap) - gap) / 2;

  return (
    <Stage2D
      title="Node Class & Singly Linked List"
      subtitle="A Node bundles a value with a reference to the next node. Chaining nodes — and keeping a 'head' reference — gives you a singly linked list."
      accent="#a78bfa"
      viewBox="0 0 640 240"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setN(v => (v >= VALS.length ? 1 : v + 1))}>add node</button>
          <button className="dsa2d-btn" onClick={() => setN(1)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">{n} node{n > 1 ? 's' : ''} linked</span>
        </>
      }
      legend={<><code>class Node: def __init__(self, data): self.data = data; self.next = None</code>. Each node points to the next; the last node's <code>next</code> is <code>None</code>, marking the tail. You only hold the <strong>head</strong> — everything else is reached by following pointers.</>}
    >
      <text x={startX - 30} y="96" fill="#56d364" fontSize="13" textAnchor="end" fontFamily="Consolas">head</text>
      <line x1={startX - 26} y1="112" x2={startX} y2="112" stroke="#56d364" strokeWidth="2" markerEnd="url(#a2)" />
      {VALS.slice(0, n).map((v, k) => {
        const x = startX + k * (NW + gap);
        const isLast = k === n - 1;
        return (
          <g key={k} className="dsa2d-fade">
            <rect x={x} y="82" width={NW} height="60" rx="8" fill="#161b22" stroke="#a78bfa" strokeWidth="2" className={isLast ? 'dsa2d-pop' : ''} style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
            <line x1={x + NW * 0.62} y1="82" x2={x + NW * 0.62} y2="142" stroke="#30363d" />
            <text x={x + NW * 0.31} y="118" fill="#e6edf3" fontSize="20" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
            <text x={x + NW * 0.81} y="116" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="Consolas">next</text>
            {!isLast
              ? <line x1={x + NW} y1="112" x2={x + NW + gap} y2="112" stroke="#a78bfa" strokeWidth="2" markerEnd="url(#a2)" />
              : <text x={x + NW + gap} y="117" fill="#6b7785" fontSize="14" fontFamily="Consolas">None</text>}
            <text x={x + NW * 0.31} y="74" fill="#6b7785" fontSize="11" textAnchor="middle" fontFamily="Consolas">data</text>
          </g>
        );
      })}
      <defs><marker id="a2" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><polygon points="0,0 7,3 0,6" fill="#a78bfa" /></marker></defs>
    </Stage2D>
  );
}
