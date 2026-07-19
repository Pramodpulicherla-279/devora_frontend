/* Lesson: Doubly Linked Lists — Moving in Both Directions
 * 2D animated: each node keeps prev AND next pointers, so a cursor can walk forward and
 * backward. Costs extra memory per node but enables O(1) delete-when-you-have-the-node. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const VALS = [10, 20, 30, 40];
export default function LlDoublyVisualization() {
  const [cur, setCur] = useState(0);
  const [dir, setDir] = useState(1);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setCur(v => {
    let d = dir;
    if (v + d >= VALS.length) { d = -1; setDir(-1); } else if (v + d < 0) { d = 1; setDir(1); }
    return v + d;
  }), 0.9, auto, [dir]);
  const NW = 80, gap = 40;
  const startX = 320 - (VALS.length * (NW + gap) - gap) / 2;

  return (
    <Stage2D
      title="Doubly Linked List"
      subtitle="Every node stores two pointers — prev and next — so you can traverse in either direction and delete a node in O(1) without hunting for its predecessor."
      accent="#a78bfa"
      viewBox="0 0 640 220"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setCur(v => Math.min(v + 1, VALS.length - 1))}>next →</button>
          <button className="dsa2d-btn" onClick={() => setCur(v => Math.max(v - 1, 0))}>← prev</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">at node {VALS[cur]} · moving {dir > 0 ? 'forward' : 'backward'}</span>
        </>
      }
      legend={<>The trade-off vs a singly linked list: <strong>+1 pointer of memory per node</strong>, but you gain backward traversal and O(1) deletion given a node reference (no need to find prev). Python's <code>collections.deque</code> and many LRU caches are built on doubly linked lists.</>}
    >
      {VALS.map((v, i) => {
        const x = startX + i * (NW + gap);
        const on = i === cur;
        return (
          <g key={i}>
            <rect x={x} y="82" width={NW} height="54" rx="8" fill={on ? 'rgba(167,139,250,.25)' : '#161b22'} stroke={on ? '#a78bfa' : '#7c6bb0'} strokeWidth="2" className={on ? 'dsa2d-pulse' : ''} />
            <text x={x + NW / 2} y="115" fill="#e6edf3" fontSize="19" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
            {/* next (top) */}
            {i < VALS.length - 1 && <line x1={x + NW} y1="96" x2={x + NW + gap} y2="96" stroke="#58a6ff" strokeWidth="2" markerEnd="url(#a8n)" />}
            {/* prev (bottom) */}
            {i < VALS.length - 1 && <line x1={x + NW + gap} y1="122" x2={x + NW} y2="122" stroke="#f0883e" strokeWidth="2" markerEnd="url(#a8p)" />}
          </g>
        );
      })}
      <text x={startX} y="72" fill="#58a6ff" fontSize="11" fontFamily="Consolas">← next points forward</text>
      <text x={startX} y="158" fill="#f0883e" fontSize="11" fontFamily="Consolas">← prev points backward</text>
      {/* cursor */}
      <g style={{ transform: `translate(${startX + cur * (NW + gap) + NW / 2}px, 60px)`, transition: 'transform .3s' }}><polygon points="-8,-13 8,-13 0,0" fill="#a78bfa" /></g>
      <defs>
        <marker id="a8n" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><polygon points="0,0 7,3 0,6" fill="#58a6ff" /></marker>
        <marker id="a8p" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><polygon points="0,0 7,3 0,6" fill="#f0883e" /></marker>
      </defs>
    </Stage2D>
  );
}
