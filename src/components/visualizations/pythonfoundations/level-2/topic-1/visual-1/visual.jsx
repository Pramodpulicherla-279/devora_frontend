/* Lesson: Lists — Creating, Indexing, and Modifying
 * 2D animated: an index pointer glides across the cells (positive AND negative indexes),
 * mutate a slot in place, and out-of-range access flags IndexError. */
import { useState } from 'react';
import Stage2D from '../../../_shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../_shared/util';

export default function PfListsVisualization() {
  const [items, setItems] = useState([12, 7, 25, 3, 18]);
  const [idx, setIdx] = useState(2);
  const [auto, setAuto] = useState(true);
  const n = items.length;
  useAutoPlay(() => setIdx(i => (i + 1 > n - 1 ? -n : i + 1)), 1.4, auto, [n]);
  const norm = idx < 0 ? n + idx : idx;
  const valid = norm >= 0 && norm < n;
  const CW = 92, gap = 8;
  const startX = 320 - (n * (CW + gap) - gap) / 2;

  return (
    <Stage2D
      title="Lists: an indexed shelf"
      subtitle="A list is an ordered row of slots. Every slot has a positive index from the front and a negative index from the back — both O(1)."
      accent="#58a6ff"
      viewBox="0 0 640 260"
      controls={
        <>
          <div className="pf2d-group"><span className="pf2d-label">index = {idx}</span>
            <input className="pf2d-slider" type="range" min={-n} max={n} value={idx} onChange={e => setIdx(+e.target.value)} /></div>
          <button className="pf2d-btn pf2d-btn--primary" disabled={!valid} onClick={() => setItems(a => a.map((v, i) => i === norm ? 99 : v))}>nums[{idx}] = 99</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <button className="pf2d-btn" onClick={() => { setItems([12, 7, 25, 3, 18]); setIdx(2); }}>↺</button>
          <span className="pf2d-readout">{valid ? `nums[${idx}] → ${items[norm]}` : `nums[${idx}] 💥 IndexError`}</span>
        </>
      }
      legend={valid
        ? <>Indexing is O(1) — Python jumps straight to slot {norm}, no scanning. Negative indexes count from the end (<code>nums[-1]</code> is last). Lists are <strong>mutable</strong>, so assigning into a slot changes it in place.</>
        : <>Index {idx} is off the shelf — only {-n}…{n - 1} are valid. Out-of-range access raises <strong>IndexError</strong>, the classic off-by-one bug.</>}
    >
      {items.map((v, i) => {
        const x = startX + i * (CW + gap);
        const on = valid && i === norm;
        return (
          <g key={i} className="pf2d-fade">
            <rect x={x} y="90" width={CW} height="80" rx="10" fill={v === 99 ? '#f97316' : on ? '#58a6ff' : '#161b22'} stroke={on ? '#58a6ff' : '#30363d'} strokeWidth="2" />
            <text x={x + CW / 2} y="140" fill={on || v === 99 ? '#0d1117' : '#e6edf3'} fontSize="26" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
            <text x={x + CW / 2} y="192" fill="#56d364" fontSize="14" textAnchor="middle" fontFamily="Consolas">{i}</text>
            <text x={x + CW / 2} y="214" fill="#f97316" fontSize="12" textAnchor="middle" fontFamily="Consolas">{i - n}</text>
          </g>
        );
      })}
      {valid && (
        <g style={{ transform: `translate(${startX + norm * (CW + gap) + CW / 2}px, 74px)`, transition: 'transform .4s cubic-bezier(.4,1.2,.5,1)' }}>
          <polygon points="-9,-16 9,-16 0,0" fill="#ffd43b" className="pf2d-pulse" />
        </g>
      )}
      <text x={startX - 6} y="192" fill="#56d364" fontSize="11" textAnchor="end" fontFamily="system-ui">idx</text>
      <text x={startX - 6} y="214" fill="#f97316" fontSize="11" textAnchor="end" fontFamily="system-ui">neg</text>
    </Stage2D>
  );
}
