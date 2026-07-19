/* Problem: Search Insert Position
 * 2D animated: lower-bound binary search — find the first index where a[i] >= target. That
 * index is where the target lives, or where it should be inserted. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const A = [1, 3, 5, 7, 9, 11];
const T = 6;
const STEPS = [
  { lo: 0, hi: 6, mid: 3, log: 'mid=3, a[3]=7 ≥ 6 → answer is here or left: hi=3' },
  { lo: 0, hi: 3, mid: 1, log: 'mid=1, a[1]=3 < 6 → answer is right: lo=2' },
  { lo: 2, hi: 3, mid: 2, log: 'mid=2, a[2]=5 < 6 → lo=3' },
  { lo: 3, hi: 3, mid: null, done: true, log: 'lo == hi → insert position = 3' },
];
const CW = 74, gap = 12, startX = (640 - (A.length * (CW + gap) - gap)) / 2;
export default function SrchInsertPositionVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % STEPS.length), 1.6, auto);
  const s = STEPS[i];
  return (
    <Stage2D title="Search Insert Position" subtitle="A 'lower bound' binary search on a half-open range [lo, hi): shrink toward the FIRST index whose value is ≥ target. Works whether the target exists or not."
      accent="#58a6ff" viewBox="0 0 640 200"
      controls={<>{STEPS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">{s.log}</span></>}
      legend={<>Unlike plain binary search, there's no early "found" exit — the loop runs until <code>lo == hi</code>, which lands exactly on the boundary between "&lt; target" and "≥ target". Inserting 6 at index 3 keeps [1,3,5,<strong>6</strong>,7,9,11] sorted. <strong>O(log n)</strong>.</>}>
      {A.map((v, k) => {
        const inRange = k >= s.lo && k < s.hi, isMid = k === s.mid, isAns = s.done && k === s.lo;
        return (
          <g key={k} opacity={inRange || isAns || s.done ? 1 : 0.35}>
            <rect x={startX + k * (CW + gap)} y="60" width={CW} height="52" rx="8" fill={isAns ? 'rgba(86,211,100,.25)' : isMid ? 'rgba(255,212,59,.2)' : inRange ? '#161b22' : '#0d1117'} stroke={isAns ? '#56d364' : isMid ? '#ffd43b' : inRange ? '#6e7681' : '#30363d'} strokeWidth={isMid || isAns ? 3 : 2} className={isMid || isAns ? 'dsa2d-pulse' : ''} style={{ transition: 'fill .3s, opacity .3s' }} />
            <text x={startX + k * (CW + gap) + CW / 2} y="93" fill="#e6edf3" fontSize="19" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
            <text x={startX + k * (CW + gap) + CW / 2} y="128" fill="#8b949e" fontSize="11" textAnchor="middle" fontFamily="Consolas">{k}</text>
          </g>
        );
      })}
      {s.done && <g className="dsa2d-pulse"><line x1={startX + 3 * (CW + gap) - 6} y1="52" x2={startX + 3 * (CW + gap) - 6} y2="120" stroke="#56d364" strokeWidth="3" /><text x={startX + 3 * (CW + gap) - 6} y="44" fill="#56d364" fontSize="12" textAnchor="middle" fontWeight="700" fontFamily="Consolas">insert 6 here</text></g>}
      <text x="320" y="168" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">target {T} isn't present — the search still converges on its rightful slot</text>
    </Stage2D>
  );
}
