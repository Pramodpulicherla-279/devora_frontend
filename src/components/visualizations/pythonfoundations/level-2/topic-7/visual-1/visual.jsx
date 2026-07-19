/* Lesson: Sets — Storing Only Unique Values
 * 2D animated: values drop into the set; new ones land inside, duplicates bounce off.
 * Auto-drops a stream so uniqueness enforces itself. */
import { useState } from 'react';
import Stage2D from '../../../_shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../_shared/util';

const DROPS = [7, 2, 9, 5, 7, 9];

export default function PfSetsVisualization() {
  const [items, setItems] = useState([2, 5]);
  const [drop, setDrop] = useState({ v: null, rej: false });
  const [msg, setMsg] = useState('drop numbers in →');
  const [auto, setAuto] = useState(true);
  const [seq, setSeq] = useState(0);
  const tryAdd = v => {
    const dup = items.includes(v);
    setDrop({ v, rej: dup });
    if (dup) setMsg(`s.add(${v}) — already present, unchanged`);
    else { setItems(a => [...a, v].sort((x, y) => x - y)); setMsg(`s.add(${v}) — added ✓`); }
  };
  const reset = () => { setItems([2, 5]); setDrop({ v: null, rej: false }); setMsg('drop numbers in →'); };
  useAutoPlay(() => { if (seq % (DROPS.length + 1) === DROPS.length) reset(); else tryAdd(DROPS[seq % (DROPS.length + 1)]); setSeq(s => s + 1); }, 1.6, auto, [seq, items.length]);

  return (
    <Stage2D
      title="Sets: only unique values"
      subtitle="A set is a bag with a bouncer. Adding an existing value simply bounces off; membership checks are O(1), like dict keys."
      accent="#58a6ff"
      viewBox="0 0 640 260"
      controls={
        <>
          <span className="pf2d-label">s.add( ):</span>
          <div className="pf2d-group">{[2, 5, 7, 9].map(v => <button key={v} className="pf2d-btn" onClick={() => tryAdd(v)}>{v}</button>)}</div>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <button className="pf2d-btn" onClick={reset}>↺</button>
          <span className="pf2d-readout">s = {'{'}{items.join(', ')}{'}'}</span>
        </>
      }
      legend={<>Sets share the dict's hash-table engine — that's why <code>x in s</code> is <strong>O(1)</strong> vs a list's O(n) scan. DSA workhorse: dedup (<code>set(nums)</code>), "have I seen this?" checks in graph traversal, and set algebra <code>a | b</code>, <code>a &amp; b</code>, <code>a - b</code>.</>}
    >
      {/* bag */}
      <path d="M210 110 L430 110 L410 236 L230 236 Z" fill="#58a6ff" opacity="0.1" stroke="#58a6ff" strokeWidth="2" />
      <text x="320" y="256" fill="#58a6ff" fontSize="12" textAnchor="middle" fontFamily="system-ui">set — no duplicates</text>
      {items.map((v, i) => {
        const cols = 4; const cx = 250 + (i % cols) * 46; const cy = 150 + Math.floor(i / cols) * 46;
        return <g key={v} className="pf2d-pop" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
          <circle cx={cx} cy={cy} r="20" fill="#58a6ff" /><text x={cx} y={cy + 6} fill="#0d1117" fontSize="18" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text></g>;
      })}
      {/* dropping ball */}
      {drop.v !== null && (
        <g style={{ transform: drop.rej ? 'translate(470px, 150px)' : 'translate(320px, 170px)', transition: 'transform .5s cubic-bezier(.5,0,.7,1)' }}>
          <circle r="19" fill={drop.rej ? '#f85149' : '#ffd43b'} className="pf2d-pulse" />
          <text y="6" fill="#0d1117" fontSize="17" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{drop.v}</text>
        </g>
      )}
      {drop.rej && <text x="470" y="120" fill="#f85149" fontSize="12" textAnchor="middle" fontFamily="system-ui">duplicate — bounced!</text>}
      <text x="320" y="90" fill="#c9d1d9" fontSize="12" textAnchor="middle" fontFamily="Consolas">s.add(x)</text>
    </Stage2D>
  );
}
