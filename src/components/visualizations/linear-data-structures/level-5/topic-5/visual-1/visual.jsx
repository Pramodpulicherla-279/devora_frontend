/* Lesson: Python's Dictionary Under the Hood
 * 2D animated: modern dicts use a compact design — a sparse array of indices pointing into a
 * dense entries table that preserves insertion order. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const ENTRIES = [
  { k: 'name', v: "'Ana'", slot: 5 },
  { k: 'age', v: '30', slot: 1 },
  { k: 'city', v: "'Rome'", slot: 6 },
];
const SPARSE = 8;
export default function HtPythonDictVisualization() {
  const [n, setN] = useState(1);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setN(v => (v >= ENTRIES.length ? 1 : v + 1)), 1.2, auto);
  const shown = ENTRIES.slice(0, n);
  const slotToEntry = {}; shown.forEach((e, i) => { slotToEntry[e.slot] = i; });

  return (
    <Stage2D
      title="Python's Dict Internals"
      subtitle="Since 3.6, dicts store entries in a dense, insertion-ordered table, with a separate sparse index array holding hash slots. Compact memory AND ordered iteration."
      accent="#58a6ff"
      viewBox="0 0 640 270"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setN(v => (v >= ENTRIES.length ? 1 : v + 1))}>add key</button>
          <button className="dsa2d-btn" onClick={() => setN(1)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">{n} key{n > 1 ? 's' : ''} inserted</span>
        </>
      }
      legend={<>The <strong>sparse index array</strong> is hashed into (open addressing) and just stores a small integer pointing into the <strong>dense entries table</strong>. Entries are appended in insertion order — which is why iterating a dict yields keys in the order you added them. Lookups stay <strong>O(1)</strong> average.</>}
    >
      {/* sparse index array */}
      <text x="60" y="52" fill="#8b949e" fontSize="12" fontFamily="Consolas">sparse index (hash slots)</text>
      {Array.from({ length: SPARSE }).map((_, s) => {
        const ei = slotToEntry[s];
        const filled = ei !== undefined;
        return (
          <g key={s}>
            <rect x={60 + s * 62} y="60" width="54" height="40" rx="6" fill={filled ? 'rgba(88,166,255,.2)' : '#0d1117'} stroke={filled ? '#58a6ff' : '#30363d'} strokeWidth="2" />
            <text x={87 + s * 62} y="85" fill={filled ? '#79c0ff' : '#6e7681'} fontSize="14" textAnchor="middle" fontFamily="Consolas">{filled ? ei : '·'}</text>
            <text x={87 + s * 62} y="52" fill="#8b949e" fontSize="11" textAnchor="middle" fontFamily="Consolas">{s}</text>
          </g>
        );
      })}
      {/* dense entries */}
      <text x="60" y="150" fill="#8b949e" fontSize="12" fontFamily="Consolas">dense entries (insertion order)</text>
      {shown.map((e, i) => (
        <g key={e.k} className="dsa2d-fade">
          <rect x={60 + i * 180} y="160" width="168" height="52" rx="8" fill="#161b22" stroke="#56d364" strokeWidth="2" className={i === n - 1 ? 'dsa2d-pop' : ''} style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
          <text x={144 + i * 180} y="182" fill="#7ee787" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{e.k}: {e.v}</text>
          <text x={144 + i * 180} y="202" fill="#8b949e" fontSize="11" textAnchor="middle" fontFamily="Consolas">entry #{i} · slot {e.slot}</text>
        </g>
      ))}
      <text x="320" y="248" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">index array points into the ordered entries table</text>
    </Stage2D>
  );
}
