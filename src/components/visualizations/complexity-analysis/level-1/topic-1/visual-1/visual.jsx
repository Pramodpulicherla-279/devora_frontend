/* Lesson: Why Your Code Slows Down — An Introduction to Time Complexity
 * 2D animated: as the input size n grows, the number of operations (and the bar) grows.
 * Auto-sweeps n so the relationship "more data → more work" plays out live. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

export default function CaIntroComplexityVisualization() {
  const [n, setN] = useState(4);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setN(v => (v >= 10 ? 2 : v + 1)), 0.9, auto);
  const ops = n; // one pass = n operations
  const CW = 30, gap = 6;
  const startX = 320 - (n * (CW + gap) - gap) / 2;

  return (
    <Stage2D
      title="Why code slows down: time complexity"
      subtitle="Complexity isn't about seconds — it's about how the amount of WORK grows as the input grows. Watch operations track the data size."
      accent="#58a6ff"
      viewBox="0 0 640 250"
      controls={
        <>
          <div className="dsa2d-group"><span className="dsa2d-label">n = {n}</span><input className="dsa2d-slider" type="range" min="1" max="10" value={n} onChange={e => setN(+e.target.value)} /></div>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">for x in data:  → {ops} operation{ops > 1 ? 's' : ''}</span>
        </>
      }
      legend={<>A single loop over <code>n</code> items does <code>n</code> operations — double the data, double the work. Complexity analysis measures this <strong>growth rate</strong> so you can predict performance <em>before</em> running code on a million items.</>}
    >
      {/* input cells */}
      <text x="24" y="46" fill="#8b949e" fontSize="13" fontFamily="system-ui">input (n items):</text>
      {Array.from({ length: n }).map((_, i) => (
        <g key={i} className="dsa2d-pop" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
          <rect x={startX + i * (CW + gap)} y="60" width={CW} height={CW} rx="6" fill="#58a6ff" />
        </g>
      ))}
      {/* work bar */}
      <text x="24" y="132" fill="#8b949e" fontSize="13" fontFamily="system-ui">work done:</text>
      <rect x="140" y="120" width="440" height="26" rx="6" fill="#161b22" />
      <rect x="140" y="120" width="440" height="26" rx="6" fill="#ffd43b" style={{ transform: `scaleX(${n / 10})`, transformBox: 'fill-box', transformOrigin: 'left', transition: 'transform .45s' }} />
      <text x={150 + (n / 10) * 440} y="139" fill="#afb5bf" fontSize="13" fontWeight="700" fontFamily="Consolas">{ops} ops</text>
      {/* growth dot */}
      <text x="24" y="196" fill="#8b949e" fontSize="12" fontFamily="system-ui">growth:</text>
      <polyline points={Array.from({ length: 10 }).map((_, k) => `${140 + k * 48},${230 - k * 15}`).join(' ')} fill="none" stroke="#30363d" strokeWidth="1.5" />
      <circle cx={140 + (n - 1) * 48} cy={230 - (n - 1) * 15} r="7" fill="#58a6ff" className="dsa2d-pulse" />
    </Stage2D>
  );
}
