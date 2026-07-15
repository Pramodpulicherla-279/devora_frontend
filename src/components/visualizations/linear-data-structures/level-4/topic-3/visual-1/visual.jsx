/* Lesson: Implementing a Stack Using a Linked List
 * 2D animated: push creates a new node that becomes the head; pop removes the head. Both are
 * O(1) and never need to resize or shift. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const SNAPS = [
  { s: [3], op: 'push 3' },
  { s: [7, 3], op: 'push 7 (new head)' },
  { s: [1, 7, 3], op: 'push 1 (new head)' },
  { s: [7, 3], op: 'pop → 1 (old head)' },
  { s: [9, 7, 3], op: 'push 9' },
];
export default function SqStackLinkedVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % SNAPS.length), 1.2, auto);
  const { s, op } = SNAPS[i];
  const NW = 74, gap = 30, startX = 120;

  return (
    <Stage2D
      title="Stack From a Linked List"
      subtitle="Make the head of a singly linked list the top of the stack. Pushing prepends a node; popping removes the head — no array, no resizing."
      accent="#a78bfa"
      viewBox="0 0 640 210"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setI(v => (v + 1) % SNAPS.length)}>next op</button>
          <button className="dsa2d-btn" onClick={() => setI(0)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">{op}</span>
        </>
      }
      legend={<><code>push</code>: <code>new.next = head; head = new</code>. <code>pop</code>: <code>head = head.next</code>. Both are <strong>O(1)</strong> with <strong>no amortization</strong> — unlike a dynamic array, there's never a resize-and-copy spike. Cost: an extra pointer per element and worse cache locality.</>}
    >
      <text x={startX - 40} y="100" fill="#56d364" fontSize="13" fontFamily="Consolas">head</text>
      <line x1={startX - 12} y1="112" x2={startX} y2="112" stroke="#56d364" strokeWidth="2" markerEnd="url(#as3)" />
      {s.map((v, k) => {
        const x = startX + k * (NW + gap);
        const isHead = k === 0;
        return (
          <g key={k} className="dsa2d-fade">
            <rect x={x} y="86" width={NW} height="52" rx="8" fill={isHead ? 'rgba(167,139,250,.25)' : '#161b22'} stroke={isHead ? '#a78bfa' : '#7c6bb0'} strokeWidth="2" className={isHead ? 'dsa2d-pop' : ''} style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
            <text x={x + NW / 2} y="118" fill="#e6edf3" fontSize="19" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
            {isHead && <text x={x + NW / 2} y="78" fill="#a78bfa" fontSize="11" textAnchor="middle" fontFamily="Consolas">top</text>}
            {k < s.length - 1
              ? <line x1={x + NW} y1="112" x2={x + NW + gap} y2="112" stroke="#7c6bb0" strokeWidth="2" markerEnd="url(#as3)" />
              : <text x={x + NW + gap - 6} y="117" fill="#6b7785" fontSize="13" fontFamily="Consolas">None</text>}
          </g>
        );
      })}
      <text x="320" y="180" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">push/pop only touch the head → O(1), no resizing ever</text>
      <defs><marker id="as3" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><polygon points="0,0 7,3 0,6" fill="#a78bfa" /></marker></defs>
    </Stage2D>
  );
}
