/* Lesson: Stack Overflow — What Happens When Recursion Goes Too Far
 * 2D animated: a depth gauge fills as frames pile up. Cross Python's recursion limit and it
 * hits RecursionError. Contrast a shallow (safe) vs runaway (crash) recursion. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const LIMIT = 1000;
export default function CrStackOverflowVisualization() {
  const [depth, setDepth] = useState(0);
  const [runaway, setRunaway] = useState(true);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setDepth(d => {
    const cap = runaway ? 1120 : 300;
    return d >= cap ? 0 : d + 80;
  }), 0.4, auto, [runaway]);
  const crashed = runaway && depth > LIMIT;
  const pct = Math.min(depth / LIMIT, 1.12);

  return (
    <Stage2D
      title="Stack Overflow"
      subtitle="Python caps recursion depth (~1000 frames) to protect memory. A recursion that never shrinks toward its base case blows past the limit and crashes."
      accent="#f85149"
      viewBox="0 0 640 250"
      controls={
        <>
          <button className={`dsa2d-btn ${!runaway ? 'dsa2d-btn--on' : ''}`} onClick={() => { setRunaway(false); setDepth(0); }}>safe depth (~300)</button>
          <button className={`dsa2d-btn ${runaway ? 'dsa2d-btn--on' : ''}`} onClick={() => { setRunaway(true); setDepth(0); }}>runaway recursion</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">depth {Math.min(depth, 1120)} / limit {LIMIT}</span>
        </>
      }
      legend={crashed
        ? <><strong>RecursionError: maximum recursion depth exceeded.</strong> The stack ran out of room. Fixes: ensure the input shrinks toward the base case, convert to iteration, or (rarely) raise the limit with <code>sys.setrecursionlimit</code>.</>
        : <>Each frame consumes stack memory. Shallow recursion (well under ~1000) is fine. But depth that grows with input — or never terminates — will eventually overflow. Deep recursion is a reason to prefer iteration.</>}
    >
      {/* gauge */}
      <rect x="120" y="60" width="400" height="40" rx="10" fill="#0b0f15" stroke="#30363d" />
      <rect x="120" y="60" width="400" height="40" rx="10"
        fill={crashed ? '#f85149' : pct > 0.8 ? '#f0883e' : '#56d364'}
        style={{ transform: `scaleX(${Math.min(pct, 1)})`, transformBox: 'fill-box', transformOrigin: 'left', transition: 'transform .35s, fill .3s' }} />
      {/* limit marker */}
      <line x1="520" y1="50" x2="520" y2="110" stroke="#f85149" strokeWidth="2" strokeDasharray="4 3" />
      <text x="520" y="128" fill="#f85149" fontSize="12" textAnchor="middle" fontFamily="Consolas">limit ~1000</text>
      <text x="120" y="128" fill="#8b949e" fontSize="12" fontFamily="Consolas">0</text>
      {/* frames stacking preview */}
      {Array.from({ length: Math.min(Math.ceil(depth / 80), 14) }).map((_, k) => (
        <rect key={k} x={140 + k * 26} y="160" width="22" height="40" rx="4" fill={crashed && k >= 12 ? '#f85149' : '#161b22'} stroke={crashed && k >= 12 ? '#f85149' : '#a78bfa'} strokeWidth="1.5" className="dsa2d-fade" />
      ))}
      {crashed
        ? <text x="320" y="230" fill="#f85149" fontSize="16" textAnchor="middle" fontWeight="700" fontFamily="Consolas" className="dsa2d-pulse">💥 stack overflow</text>
        : <text x="320" y="230" fill="#56d364" fontSize="14" textAnchor="middle" fontFamily="Consolas">stack has room ✓</text>}
    </Stage2D>
  );
}
