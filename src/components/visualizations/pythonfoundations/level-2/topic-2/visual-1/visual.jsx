/* Lesson: List Methods — append, insert, remove
 * 2D animated: cells physically slide. append/pop touch only the end (O(1)); insert(0)
 * and remove shift every later cell (O(n)) — shifted cells flash orange. */
import { useState } from 'react';
import Stage2D from '../../../_shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../_shared/util';

let uid = 0;
const mk = v => ({ id: ++uid, val: v });

export default function PfListMethodsVisualization() {
  const [items, setItems] = useState([mk(10), mk(20), mk(30)]);
  const [shifted, setShifted] = useState([]);
  const [msg, setMsg] = useState('run a method →');
  const [auto, setAuto] = useState(true);
  const [seq, setSeq] = useState(0);
  const nextV = () => 10 * (items.length + 4);

  const append = () => { if (items.length >= 6) return; setItems(a => [...a, mk(nextV())]); setShifted([]); setMsg('append(x) — O(1), nothing moves'); };
  const insert0 = () => { if (items.length >= 6) return; const ids = items.map(x => x.id); setItems(a => [mk(nextV()), ...a]); setShifted(ids); setMsg(`insert(0,x) — O(n), ${items.length} shifted`); };
  const removeMid = () => { if (!items.length) return; const m = Math.floor(items.length / 2); setShifted(items.slice(m + 1).map(x => x.id)); setItems(a => a.filter((_, i) => i !== m)); setMsg(`remove(mid) — shifts ${items.length - 1 - m} left`); };
  const pop = () => { if (!items.length) return; setItems(a => a.slice(0, -1)); setShifted([]); setMsg('pop() — O(1) from the end'); };
  const reset = () => { setItems([mk(10), mk(20), mk(30)]); setShifted([]); setMsg('run a method →'); };
  useAutoPlay(() => { [append, insert0, removeMid, pop][seq % 4](); setSeq(s => s + 1); }, 1.9, auto, [seq, items.length]);

  const CW = 84, gap = 10;
  const startX = 320 - (Math.max(items.length, 3) * (CW + gap) - gap) / 2;

  return (
    <Stage2D
      title="append · insert · remove · pop"
      subtitle="Operations at the END are cheap; operations at the FRONT/middle make every later cell slide. Shifted cells flash orange."
      accent="#56d364"
      viewBox="0 0 640 230"
      controls={
        <>
          <div className="pf2d-group">
            <button className="pf2d-btn" onClick={append}>append(x)</button>
            <button className="pf2d-btn" onClick={insert0}>insert(0,x)</button>
            <button className="pf2d-btn" onClick={removeMid}>remove(mid)</button>
            <button className="pf2d-btn" onClick={pop}>pop()</button>
          </div>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <button className="pf2d-btn" onClick={reset}>↺</button>
          <span className="pf2d-readout">{msg}</span>
        </>
      }
      legend={<>This is the seed of complexity analysis: <code>append</code>/<code>pop</code> touch only the end → <strong>O(1)</strong>. <code>insert(0,x)</code> and <code>remove</code> shift everything after them → <strong>O(n)</strong>. When fronts matter, DSA reaches for a deque or linked list.</>}
    >
      {items.map((it, i) => (
        <g key={it.id} style={{ transform: `translateX(${startX + i * (CW + gap)}px)`, transition: 'transform .45s cubic-bezier(.4,1.2,.5,1)' }}>
          <rect x="0" y="80" width={CW} height="80" rx="10" fill={shifted.includes(it.id) ? '#f97316' : '#161b22'} stroke={shifted.includes(it.id) ? '#f97316' : '#30363d'} strokeWidth="2" className="pf2d-fade" />
          <text x={CW / 2} y="128" fill={shifted.includes(it.id) ? '#0d1117' : '#e6edf3'} fontSize="24" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{it.val}</text>
          <text x={CW / 2} y="180" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="Consolas">{i}</text>
        </g>
      ))}
      <text x="320" y="46" fill="#c9d1d9" fontSize="13" textAnchor="middle" fontFamily="system-ui">{shifted.length ? `${shifted.length} cell(s) shifted (orange)` : 'no shifting needed'}</text>
    </Stage2D>
  );
}
