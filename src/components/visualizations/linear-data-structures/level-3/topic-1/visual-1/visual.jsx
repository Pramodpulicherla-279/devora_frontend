/* Lesson: What Is a Linked List, and Why Do We Need One When We Have Arrays?
 * 2D animated: contrast inserting at the FRONT. An array shifts every element (O(n)); a linked
 * list just creates a node and rewires one pointer (O(1)). */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

export default function LlIntroVisualization() {
  const [inserted, setInserted] = useState(false);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setInserted(v => !v), 2.0, auto);
  const arr = inserted ? [9, 3, 7, 1, 8] : [3, 7, 1, 8];
  const CW = 56, gap = 8;
  const aStart = 300 - (5 * (CW + gap)) / 2;

  return (
    <Stage2D
      title="Linked List vs Array"
      subtitle="Arrays store elements contiguously; linked lists scatter them and connect each to the next with a pointer. That changes what's cheap and what's costly."
      accent="#58a6ff"
      viewBox="0 0 640 270"
      controls={
        <>
          <button className={`dsa2d-btn ${!inserted ? 'dsa2d-btn--on' : ''}`} onClick={() => setInserted(false)}>before</button>
          <button className={`dsa2d-btn ${inserted ? 'dsa2d-btn--on' : ''}`} onClick={() => setInserted(true)}>insert 9 at front</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        </>
      }
      legend={<>Inserting at the front: the <strong>array</strong> must shift every element one slot right → <strong>O(n)</strong>. The <strong>linked list</strong> allocates a node and points it at the old head → <strong>O(1)</strong>. The trade-off: linked lists lose O(1) random access — reaching index i means walking i links.</>}
    >
      {/* Array row */}
      <text x="40" y="56" fill="#58a6ff" fontSize="14" fontWeight="700" fontFamily="system-ui">Array</text>
      {arr.map((v, k) => {
        const shifted = inserted && k > 0;
        const isNew = inserted && k === 0;
        return (
          <g key={k}>
            <rect x={aStart + k * (CW + gap)} y="66" width={CW} height="44" rx="6"
              fill={isNew ? 'rgba(86,211,100,.2)' : shifted ? 'rgba(240,136,62,.14)' : '#161b22'}
              stroke={isNew ? '#56d364' : shifted ? '#f0883e' : '#30363d'} strokeWidth="2" />
            <text x={aStart + k * (CW + gap) + CW / 2} y="94" fill="#e6edf3" fontSize="18" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
          </g>
        );
      })}
      <text x="560" y="94" fill={inserted ? '#f0883e' : '#8b949e'} fontSize="12" textAnchor="end" fontFamily="Consolas">{inserted ? 'shift 4 → O(n)' : ''}</text>
      {/* Linked list row */}
      <text x="40" y="166" fill="#a78bfa" fontSize="14" fontWeight="700" fontFamily="system-ui">Linked List</text>
      {arr.map((v, k) => {
        const isNew = inserted && k === 0;
        const x = aStart + k * (CW + gap);
        return (
          <g key={k}>
            <rect x={x} y="176" width={CW} height="44" rx="6"
              fill={isNew ? 'rgba(86,211,100,.2)' : '#161b22'} stroke={isNew ? '#56d364' : '#a78bfa'} strokeWidth="2"
              className={isNew ? 'dsa2d-pop' : ''} style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
            <text x={x + CW / 2} y="204" fill="#e6edf3" fontSize="18" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
            {k < arr.length - 1 && <line x1={x + CW} y1="198" x2={x + CW + gap} y2="198" stroke={isNew ? '#56d364' : '#a78bfa'} strokeWidth="2" markerEnd="url(#llarrow)" />}
          </g>
        );
      })}
      <defs><marker id="llarrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><polygon points="0,0 7,3 0,6" fill="#a78bfa" /></marker></defs>
      <text x="560" y="204" fill={inserted ? '#56d364' : '#8b949e'} fontSize="12" textAnchor="end" fontFamily="Consolas">{inserted ? 'rewire 1 → O(1)' : ''}</text>
    </Stage2D>
  );
}
