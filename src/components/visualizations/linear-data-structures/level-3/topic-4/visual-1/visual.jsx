/* Lesson: Insertion — Adding Nodes at the Start, End, and Middle
 * 2D animated: insert a new node at the head, tail, or a middle position. The animation shows
 * the pointer rewiring that splices it into the chain. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const BASE = [1, 2, 3];
const NEW = 9;
export default function LlInsertionVisualization() {
  const [pos, setPos] = useState('start');
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setPos(p => p === 'start' ? 'middle' : p === 'middle' ? 'end' : 'start'), 2.0, auto);
  const list = pos === 'start' ? [NEW, ...BASE] : pos === 'end' ? [...BASE, NEW] : [BASE[0], NEW, BASE[1], BASE[2]];
  const newIdx = pos === 'start' ? 0 : pos === 'end' ? list.length - 1 : 1;
  const NW = 78, gap = 30;
  const startX = 320 - (list.length * (NW + gap) - gap) / 2;
  const cost = pos === 'end' ? 'O(n) — walk to tail first' : pos === 'start' ? 'O(1)' : 'O(1) once you have the prev node';

  return (
    <Stage2D
      title="Inserting Into a Linked List"
      subtitle="Insertion is just pointer surgery: point the new node at what comes next, then point the previous node at the new node. No shifting of other elements."
      accent="#56d364"
      viewBox="0 0 640 220"
      controls={
        <>
          {['start', 'middle', 'end'].map(p => <button key={p} className={`dsa2d-btn ${pos === p ? 'dsa2d-btn--on' : ''}`} onClick={() => setPos(p)}>at {p}</button>)}
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">{cost}</span>
        </>
      }
      legend={<>Two pointer writes: <code>new.next = prev.next; prev.next = new</code>. Inserting at the <strong>head</strong> is O(1). At the <strong>tail</strong> it's O(n) unless you keep a tail pointer. In the <strong>middle</strong>, finding the spot is O(n) but the splice itself is O(1) — no elements move.</>}
    >
      {list.map((v, k) => {
        const x = startX + k * (NW + gap);
        const isNew = k === newIdx;
        return (
          <g key={k}>
            <rect x={x} y="80" width={NW} height="52" rx="8"
              fill={isNew ? 'rgba(86,211,100,.22)' : '#161b22'} stroke={isNew ? '#56d364' : '#a78bfa'} strokeWidth="2"
              className={isNew ? 'dsa2d-pop' : ''} style={{ transformBox: 'fill-box', transformOrigin: 'center', transform: isNew ? 'translateY(0)' : 'none' }} />
            <text x={x + NW / 2} y="112" fill="#e6edf3" fontSize="19" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
            {isNew && <text x={x + NW / 2} y="72" fill="#56d364" fontSize="12" textAnchor="middle" fontFamily="Consolas">new</text>}
            {k < list.length - 1
              ? <line x1={x + NW} y1="106" x2={x + NW + gap} y2="106" stroke={isNew || k + 1 === newIdx ? '#56d364' : '#a78bfa'} strokeWidth="2" markerEnd="url(#a4)" />
              : <text x={x + NW + gap - 6} y="111" fill="#8b949e" fontSize="13" fontFamily="Consolas">None</text>}
          </g>
        );
      })}
      <text x="320" y="176" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">green pointers = the two links rewired to splice the new node in</text>
      <defs><marker id="a4" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><polygon points="0,0 7,3 0,6" fill="#56d364" /></marker></defs>
    </Stage2D>
  );
}
