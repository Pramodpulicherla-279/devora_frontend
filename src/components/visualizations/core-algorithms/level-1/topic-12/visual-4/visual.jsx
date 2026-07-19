/* Problem: Sqrt(x) — Integer Square Root
 * 2D animated: binary-search the answer space [0..x] for the largest k with k² ≤ x. The
 * feasibility flips exactly once, so halving homes in fast. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const X = 40;
const STEPS = [
  { lo: 0, hi: 40, mid: 20, best: 0, log: '20² = 400 > 40 → too big: hi=19' },
  { lo: 0, hi: 19, mid: 9, best: 0, log: '9² = 81 > 40 → hi=8' },
  { lo: 0, hi: 8, mid: 4, best: 4, log: '4² = 16 ≤ 40 → feasible, record 4, lo=5' },
  { lo: 5, hi: 8, mid: 6, best: 6, log: '6² = 36 ≤ 40 → record 6, lo=7' },
  { lo: 7, hi: 8, mid: 7, best: 6, log: '7² = 49 > 40 → hi=6' },
  { lo: 7, hi: 6, mid: null, best: 6, done: true, log: 'lo > hi → isqrt(40) = 6' },
];
const AX = a => 60 + (a / X) * 520;
export default function SrchSqrtVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % STEPS.length), 1.5, auto);
  const s = STEPS[i];
  return (
    <Stage2D title="Sqrt(x) Without sqrt()" subtitle="The answer to isqrt(40) is somewhere in 0..40, and 'k² ≤ 40' is true for small k, false for large — a monotonic flip. That's the licence to binary-search the answers themselves."
      accent="#6b8cff" viewBox="0 0 640 170"
      controls={<>{STEPS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">{s.log}</span></>}
      legend={<>The template detail worth memorising: on feasible mids <strong>record then go higher</strong> (<code>best = mid; lo = mid+1</code>), on infeasible go lower. <code>best</code> holds the last feasible value when the range empties. <strong>O(log x)</strong> — Newton's method is the fancy alternative.</>}>
      <line x1={AX(0)} y1="80" x2={AX(X)} y2="80" stroke="#30363d" strokeWidth="3" />
      {s.lo <= s.hi && <rect x={AX(s.lo)} y="70" width={Math.max(3, AX(s.hi) - AX(s.lo))} height="20" rx="5" fill="rgba(107,140,255,.22)" stroke="#6b8cff" style={{ transition: 'x .3s, width .3s' }} />}
      {[0, 10, 20, 30, 40].map(a => <text key={a} x={AX(a)} y="112" fill="#8b949e" fontSize="11" textAnchor="middle" fontFamily="Consolas">{a}</text>)}
      {s.mid != null && <g className="dsa2d-pulse"><line x1={AX(s.mid)} y1="60" x2={AX(s.mid)} y2="98" stroke={s.mid * s.mid <= X ? '#56d364' : '#f85149'} strokeWidth="3" /><text x={AX(s.mid)} y="52" fill={s.mid * s.mid <= X ? '#56d364' : '#f85149'} fontSize="12" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{s.mid}²={s.mid * s.mid}</text></g>}
      <circle cx={AX(s.best)} cy="80" r="8" fill="#56d364" />
      <text x={AX(s.best)} y="134" fill="#56d364" fontSize="12" textAnchor="middle" fontWeight="700" fontFamily="Consolas">best={s.best}</text>
      {s.done && <text x="320" y="158" fill="#56d364" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">isqrt(40) = 6   (6²=36 ≤ 40 &lt; 49=7²)</text>}
    </Stage2D>
  );
}
