/* Lesson: Best, Worst, and Average Case — Which One Actually Matters?
 * 2D animated: linear search scans for a target. Best case finds it first, worst case
 * scans everything, average lands in the middle. Auto-cycles the three cases. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const ARR = [4, 8, 15, 16, 23, 42, 7, 9];
const CASES = { best: { idx: 0, label: 'Best case — O(1)', c: '#56d364' }, avg: { idx: 3, label: 'Average — O(n/2) → O(n)', c: '#ffd43b' }, worst: { idx: 8, label: 'Worst — O(n), not found', c: '#f85149' } };
const CK = Object.keys(CASES);

export default function CaCasesVisualization() {
  const [cse, setCse] = useState('avg');
  const [scan, setScan] = useState(0);
  const [auto, setAuto] = useState(true);
  const target = CASES[cse].idx;
  useAutoPlay(() => { setScan(s => { if (s < target) return s + 1; setCse(c => CK[(CK.indexOf(c) + 1) % CK.length]); return 0; }); }, 0.5, auto, [cse, target]);
  const CW = 62, gap = 8;
  const startX = 320 - (ARR.length * (CW + gap) - gap) / 2;

  return (
    <Stage2D
      title="Best, Worst & Average Case"
      subtitle="The same linear search behaves very differently depending on WHERE the target sits. Watch the scanner sweep for each case."
      accent="#ffd43b"
      viewBox="0 0 640 220"
      controls={
        <>
          <div className="dsa2d-group">{CK.map(k => <button key={k} className={`dsa2d-btn ${cse === k ? 'dsa2d-btn--on' : ''}`} onClick={() => { setCse(k); setScan(0); }}>{k}</button>)}</div>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">{CASES[cse].label}</span>
        </>
      }
      legend={<>Best case is often misleading — a lucky first hit is O(1), but you can't rely on luck. Interviews and real analysis focus on the <strong>worst case</strong> (the guarantee) and sometimes the <strong>average</strong>. Linear search is O(1) best, O(n) worst/average.</>}
    >
      {ARR.map((v, i) => {
        const scanned = i < scan;
        const hit = i === target && scan >= target && target < ARR.length;
        return (
          <g key={i} className="dsa2d-fade">
            <rect x={startX + i * (CW + gap)} y="90" width={CW} height="60" rx="9" fill={hit ? CASES[cse].c : scanned ? '#30363d' : '#161b22'} stroke={hit ? CASES[cse].c : '#30363d'} strokeWidth="2" />
            <text x={startX + i * (CW + gap) + CW / 2} y="127" fill={hit ? '#0d1117' : '#e6edf3'} fontSize="20" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
          </g>
        );
      })}
      {/* scanner */}
      <g style={{ transform: `translate(${startX + Math.min(scan, ARR.length - 1) * (CW + gap) + CW / 2}px, 74px)`, transition: 'transform .35s' }}>
        <polygon points="-9,-14 9,-14 0,0" fill={CASES[cse].c} className="dsa2d-pulse" />
      </g>
      <text x="320" y="185" fill="#8b949e" fontSize="13" textAnchor="middle" fontFamily="Consolas">searching for target… {scan >= target && target < ARR.length ? 'found!' : target >= ARR.length ? 'scanning all…' : ''}</text>
    </Stage2D>
  );
}
