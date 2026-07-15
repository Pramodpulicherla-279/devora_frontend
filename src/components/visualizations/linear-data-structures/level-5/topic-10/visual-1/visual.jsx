/* Lesson: Detecting Duplicates Efficiently
 * 2D animated: scan a list, adding each value to a set. The moment a value is already in the
 * set, you've found a duplicate — O(n) instead of O(n²). */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const DATA = [4, 2, 7, 5, 2, 9];
export default function HtDuplicatesVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  // first duplicate index
  const seenTmp = new Set(); let dupIdx = DATA.length;
  for (let k = 0; k < DATA.length; k++) { if (seenTmp.has(DATA[k])) { dupIdx = k; break; } seenTmp.add(DATA[k]); }
  useAutoPlay(() => setI(v => (v >= dupIdx ? 0 : v + 1)), 0.8, auto);
  const seen = new Set(DATA.slice(0, i));
  const found = i === dupIdx;
  const CW = 58, gap = 8;
  const startX = 320 - (DATA.length * (CW + gap) - gap) / 2;

  return (
    <Stage2D
      title="Detecting Duplicates"
      subtitle="Comparing every pair is O(n²). A set remembers what you've already seen, so each new value is checked in O(1) — the first repeat is the duplicate."
      accent="#58a6ff"
      viewBox="0 0 640 240"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setI(v => (v >= dupIdx ? 0 : v + 1))}>check next</button>
          <button className="dsa2d-btn" onClick={() => setI(0)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">{found ? `duplicate ${DATA[i]} found!` : `${DATA[Math.min(i, DATA.length - 1)]} not seen yet`}</span>
        </>
      }
      legend={<><code>if x in seen: return True; seen.add(x)</code>. Set membership is O(1), so the whole scan is <strong>O(n)</strong> time and <strong>O(n)</strong> space — a classic time/space trade against the O(n²), O(1)-space nested-loop approach.</>}
    >
      {DATA.map((v, k) => {
        const scanned = k < i;
        const cur = k === i && !found;
        const dup = found && k === dupIdx;
        return (
          <g key={k}>
            <rect x={startX + k * (CW + gap)} y="50" width={CW} height="52" rx="8"
              fill={dup ? 'rgba(248,81,73,.25)' : cur ? 'rgba(88,166,255,.22)' : scanned ? '#161b22' : '#0d1117'}
              stroke={dup ? '#f85149' : cur ? '#58a6ff' : scanned ? '#484f58' : '#30363d'} strokeWidth="2"
              className={cur || dup ? 'dsa2d-pulse' : ''} />
            <text x={startX + k * (CW + gap) + CW / 2} y="83" fill="#e6edf3" fontSize="19" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
          </g>
        );
      })}
      {/* set */}
      <text x="320" y="140" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">seen = {'{'} {[...seen].join(', ')} {'}'}</text>
      {[...seen].map((v, si) => (
        <g key={si} className="dsa2d-fade">
          <rect x={200 + si * 54} y="152" width="46" height="40" rx="20" fill="rgba(88,166,255,.14)" stroke="#58a6ff" strokeWidth="1.5" />
          <text x={223 + si * 54} y="178" fill="#79c0ff" fontSize="16" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
        </g>
      ))}
      {found && <text x="320" y="222" fill="#f85149" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{DATA[dupIdx]} was already in the set → duplicate</text>}
    </Stage2D>
  );
}
