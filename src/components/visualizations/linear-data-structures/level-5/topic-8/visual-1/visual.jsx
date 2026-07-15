/* Lesson: Choosing Good Hash Keys
 * 2D animated: flip through candidate key types. Immutable values (int, str, tuple) are
 * hashable and safe; mutable ones (list, dict) can't be dict keys. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const TYPES = [
  { t: 'int  →  42', ok: true, why: 'Immutable; its hash never changes. Perfect key.' },
  { t: "str  →  'name'", ok: true, why: 'Immutable text — the most common dict key.' },
  { t: 'tuple  →  (1, 2)', ok: true, why: 'Hashable IF all its elements are hashable. Great for composite keys.' },
  { t: 'list  →  [1, 2]', ok: false, why: 'Mutable — its contents (and hash) could change, breaking lookups. TypeError: unhashable.' },
  { t: 'dict  →  {…}', ok: false, why: 'Mutable and unhashable — cannot be used as a key.' },
];
export default function HtGoodKeysVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % TYPES.length), 2.0, auto);
  const k = TYPES[i];

  return (
    <Stage2D
      title="Choosing Good Hash Keys"
      subtitle="A key must be hashable: its hash value has to stay constant for its lifetime. That means immutable — mutate a key and the table could never find it again."
      accent={k.ok ? '#56d364' : '#f85149'}
      viewBox="0 0 640 240"
      controls={
        <>
          {TYPES.map((_, n) => <button key={n} className={`dsa2d-btn ${n === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(n)}>{n + 1}</button>)}
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        </>
      }
      legend={<>The rule: a key must be <strong>immutable</strong> (int, str, float, bool, tuple of immutables). Mutable objects (list, dict, set) are <strong>unhashable</strong> because changing them would change their hash — so lookups would silently break. Good keys are also <strong>unique</strong> and <strong>evenly distributed</strong>.</>}
    >
      <rect x="90" y="50" width="460" height="140" rx="14" fill="#0b0f15" stroke={k.ok ? '#56d364' : '#f85149'} strokeWidth="1.5" />
      <text x="320" y="98" fill="#e6edf3" fontSize="22" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{k.t}</text>
      <rect x={k.ok ? 230 : 210} y="112" width={k.ok ? 180 : 220} height="32" rx="16" fill={k.ok ? 'rgba(86,211,100,.15)' : 'rgba(248,81,73,.15)'} stroke={k.ok ? '#56d364' : '#f85149'} />
      <text x="320" y="134" fill={k.ok ? '#7ee787' : '#ff9d95'} fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{k.ok ? '✓ hashable — valid key' : '✗ unhashable'}</text>
      <foreignObject x="118" y="152" width="404" height="34">
        <div xmlns="http://www.w3.org/1999/xhtml" style={{ color: '#c9d1d9', font: '14px system-ui', lineHeight: 1.3, textAlign: 'center' }}>{k.why}</div>
      </foreignObject>
      <text x="320" y="222" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">candidate {i + 1} of {TYPES.length}</text>
    </Stage2D>
  );
}
