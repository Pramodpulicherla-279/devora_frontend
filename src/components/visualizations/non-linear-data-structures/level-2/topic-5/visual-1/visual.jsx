/* Lesson: Inserting Into a Heap
 * 2D animated: add the new value at the end (next open slot), then "sift up" — swap with the
 * parent while it's smaller — until the heap property holds. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const POS = [[320, 40], [200, 100], [440, 100], [140, 160], [260, 160], [380, 160], [500, 160], [100, 216]];
const EDGES = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6], [3, 7]];
const SNAPS = [
  { v: [5, 8, 12, 15, 20, 30, 25, 4], a: 7, note: 'insert 4 at the end (next slot)' },
  { v: [5, 8, 12, 4, 20, 30, 25, 15], a: 3, note: '4 < parent 15 → swap up' },
  { v: [5, 4, 12, 8, 20, 30, 25, 15], a: 1, note: '4 < parent 8 → swap up' },
  { v: [4, 5, 12, 8, 20, 30, 25, 15], a: 0, note: '4 < parent 5 → swap up' },
  { v: [4, 5, 12, 8, 20, 30, 25, 15], a: -1, note: 'reached root → done ✓' },
];
export default function HeapInsertVisualization() {
  const [s, setS] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setS(v => (v + 1) % SNAPS.length), 1.3, auto);
  const { v, a, note } = SNAPS[s];
  const CW = 54, gap = 5;
  const startX = 320 - (v.length * (CW + gap) - gap) / 2;

  return (
    <Stage2D
      title="Inserting Into a Heap (Sift-Up)"
      subtitle="Always add the new element at the first empty slot to keep the tree complete, then bubble it upward until it's no longer smaller than its parent."
      accent="#56d364"
      viewBox="0 0 640 280"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setS(v => (v + 1) % SNAPS.length)}>step</button>
          <button className="dsa2d-btn" onClick={() => setS(0)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">{note}</span>
        </>
      }
      legend={<>Insertion appends to keep the tree <strong>complete</strong>, then sift-up restores order in <strong>O(log n)</strong> — at most one swap per level up to the root. Here 4 rises all the way to become the new minimum.</>}
    >
      {EDGES.map(([x, y], k) => <line key={k} x1={POS[x][0]} y1={POS[x][1]} x2={POS[y][0]} y2={POS[y][1]} stroke="#30363d" strokeWidth="2" />)}
      {v.map((val, k) => {
        const on = k === a;
        const isFour = val === 4;
        return (
          <g key={k}>
            <circle cx={POS[k][0]} cy={POS[k][1]} r="19" fill={on ? 'rgba(86,211,100,.35)' : isFour ? 'rgba(86,211,100,.15)' : '#161b22'} stroke={on || isFour ? '#56d364' : '#7c6bb0'} strokeWidth="2" className={on ? 'dsa2d-pulse' : ''} />
            <text x={POS[k][0]} y={POS[k][1] + 5} fill="#e6edf3" fontSize="13" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{val}</text>
          </g>
        );
      })}
      {v.map((val, k) => {
        const on = k === a;
        return (
          <g key={'a' + k}>
            <rect x={startX + k * (CW + gap)} y="236" width={CW} height="38" rx="6" fill={on ? 'rgba(86,211,100,.25)' : '#161b22'} stroke={on ? '#56d364' : '#30363d'} strokeWidth="2" />
            <text x={startX + k * (CW + gap) + CW / 2} y="261" fill="#e6edf3" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{val}</text>
          </g>
        );
      })}
    </Stage2D>
  );
}
