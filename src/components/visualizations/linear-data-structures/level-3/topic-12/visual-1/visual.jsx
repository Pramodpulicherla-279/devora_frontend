/* Lesson: Linked Lists vs Arrays — Choosing the Right Tool
 * 2D animated: a comparison table that highlights, row by row, which structure wins on each
 * operation. Neither is universally better — it depends on your access pattern. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const ROWS = [
  { op: 'Access by index', arr: 'O(1)', ll: 'O(n)', win: 'arr' },
  { op: 'Insert / delete at front', arr: 'O(n)', ll: 'O(1)', win: 'll' },
  { op: 'Insert / delete at end', arr: 'O(1)*', ll: 'O(1)†', win: 'tie' },
  { op: 'Search (unsorted)', arr: 'O(n)', ll: 'O(n)', win: 'tie' },
  { op: 'Memory per element', arr: 'compact', ll: '+pointer', win: 'arr' },
  { op: 'Cache friendliness', arr: 'high', ll: 'low', win: 'arr' },
];
export default function LlVsArrayVisualization() {
  const [r, setR] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setR(v => (v + 1) % ROWS.length), 1.5, auto);

  return (
    <Stage2D
      title="Linked List vs Array"
      subtitle="There's no universal winner. Arrays win on indexing and cache locality; linked lists win on cheap insertion/deletion at the ends and unknown size."
      accent="#58a6ff"
      viewBox="0 0 640 290"
      controls={
        <>
          {ROWS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === r ? 'dsa2d-btn--on' : ''}`} onClick={() => setR(k)}>{k + 1}</button>)}
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        </>
      }
      legend={<>Choose an <strong>array/list</strong> for indexed access, tight memory, and cache-friendly scanning (the common default). Choose a <strong>linked list</strong> when you insert/remove at the ends constantly and rarely index. <em>*amortized · †with a tail pointer.</em></>}
    >
      {/* header */}
      <text x="60" y="46" fill="#8b949e" fontSize="13" fontFamily="system-ui">operation</text>
      <text x="400" y="46" fill="#58a6ff" fontSize="13" textAnchor="middle" fontWeight="700" fontFamily="system-ui">Array</text>
      <text x="520" y="46" fill="#a78bfa" fontSize="13" textAnchor="middle" fontWeight="700" fontFamily="system-ui">Linked List</text>
      <line x1="50" y1="56" x2="590" y2="56" stroke="#30363d" />
      {ROWS.map((row, k) => {
        const y = 82 + k * 34;
        const on = k === r;
        return (
          <g key={k} style={{ opacity: on ? 1 : 0.5, transition: 'opacity .3s' }}>
            {on && <rect x="50" y={y - 22} width="540" height="30" rx="6" fill="rgba(88,166,255,.08)" />}
            <text x="60" y={y} fill="#e6edf3" fontSize="14" fontFamily="system-ui">{row.op}</text>
            <rect x="360" y={y - 20} width="80" height="26" rx="6" fill={row.win === 'arr' ? 'rgba(86,211,100,.16)' : 'transparent'} stroke={row.win === 'arr' ? '#56d364' : 'transparent'} />
            <text x="400" y={y} fill={row.win === 'arr' ? '#7ee787' : '#c9d1d9'} fontSize="14" textAnchor="middle" fontFamily="Consolas">{row.arr}</text>
            <rect x="478" y={y - 20} width="84" height="26" rx="6" fill={row.win === 'll' ? 'rgba(86,211,100,.16)' : 'transparent'} stroke={row.win === 'll' ? '#56d364' : 'transparent'} />
            <text x="520" y={y} fill={row.win === 'll' ? '#7ee787' : '#c9d1d9'} fontSize="14" textAnchor="middle" fontFamily="Consolas">{row.ll}</text>
          </g>
        );
      })}
      <text x="320" y="284" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">green = the structure that wins this row</text>
    </Stage2D>
  );
}
