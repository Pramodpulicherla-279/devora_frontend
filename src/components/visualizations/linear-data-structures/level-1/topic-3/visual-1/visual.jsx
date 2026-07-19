/* Lesson: Time Complexity of Array Operations — Access, Insert, Delete
 * 2D animated: pick an operation and watch its cost. Access jumps (O(1)); insert/delete at
 * the front shift every following element (O(n)). */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const VALS = [10, 20, 30, 40, 50, 60];
const OPS = [
  { id: 'access', label: 'access [3]', cost: 'O(1)', c: '#56d364' },
  { id: 'insert', label: 'insert front', cost: 'O(n)', c: '#f85149' },
  { id: 'delete', label: 'delete front', cost: 'O(n)', c: '#f0883e' },
];
export default function ArrOperationsVisualization() {
  const [op, setOp] = useState('insert');
  const [t, setT] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setT(v => (v + 1) % (VALS.length + 2)), 0.6, auto, [op]);
  const active = OPS.find(o => o.id === op);
  const CW = 62, gap = 8;
  const startX = 320 - (VALS.length * (CW + gap) - gap) / 2;

  return (
    <Stage2D
      title="Array Ops: Access, Insert, Delete"
      subtitle="Indexing is instant, but inserting or deleting anywhere except the end forces every later element to shift over."
      accent={active.c}
      viewBox="0 0 640 230"
      controls={
        <>
          {OPS.map(o => <button key={o.id} className={`dsa2d-btn ${op === o.id ? 'dsa2d-btn--on' : ''}`} onClick={() => { setOp(o.id); setT(0); }}>{o.label}</button>)}
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout" style={{ color: active.c }}>{active.cost}</span>
        </>
      }
      legend={op === 'access'
        ? <><strong>Access</strong> uses the address formula to jump straight to index 3 — no shifting, <strong>O(1)</strong>.</>
        : op === 'insert'
        ? <><strong>Insert at front:</strong> every existing element must slide one slot right to make room → <strong>O(n)</strong>. Inserting at the <em>end</em> is O(1) (amortized).</>
        : <><strong>Delete at front:</strong> the gap must be closed by sliding every later element one slot left → <strong>O(n)</strong>. Deleting from the end is O(1).</>}
    >
      {VALS.map((v, k) => {
        const highlight = op === 'access' ? k === 3 : k >= 1 && k < t;
        const shift = op === 'access' ? 0 : (k >= 1 && k < t ? (op === 'insert' ? 12 : -12) : 0);
        return (
          <g key={k} style={{ transform: `translateX(${shift}px)`, transition: 'transform .3s' }}>
            <rect x={startX + k * (CW + gap)} y="80" width={CW} height="52" rx="8"
              fill={highlight ? active.c + '33' : '#161b22'} stroke={highlight ? active.c : '#30363d'} strokeWidth="2" />
            <text x={startX + k * (CW + gap) + CW / 2} y="113" fill="#e6edf3" fontSize="18" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
            <text x={startX + k * (CW + gap) + CW / 2} y="72" fill="#8b949e" fontSize="11" textAnchor="middle" fontFamily="Consolas">[{k}]</text>
          </g>
        );
      })}
      {op === 'access' && <g style={{ transform: `translate(${startX + 3 * (CW + gap) + CW / 2}px, 54px)` }}><polygon points="-8,-13 8,-13 0,0" fill="#56d364" className="dsa2d-pulse" /></g>}
      <text x="320" y="176" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">
        {op === 'access' ? 'direct jump — nothing else moves' : `${Math.max(0, Math.min(t - 1, VALS.length - 1))} elements shifted so far`}
      </text>
    </Stage2D>
  );
}
