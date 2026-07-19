/* Lesson: Comparing Growth Rates — A Visual Guide to O(1) Through O(2^n)
 * 2D animated growth chart: all the common curves on one plot, with a sweeping n-marker
 * that shows how dramatically they diverge. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const CURVES = [
  { label: 'O(1)', c: '#56d364', f: () => 1 },
  { label: 'O(log n)', c: '#3fb950', f: n => Math.log2(n + 1) },
  { label: 'O(n)', c: '#58a6ff', f: n => n },
  { label: 'O(n log n)', c: '#a78bfa', f: n => n * Math.log2(n + 1) },
  { label: 'O(n²)', c: '#f0883e', f: n => n * n },
  { label: 'O(2^n)', c: '#f85149', f: n => Math.pow(2, n) },
];
const W = 400, H = 210, MAXN = 16, MAXY = 90;

export default function CaGrowthRatesVisualization() {
  const [n, setN] = useState(8);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setN(v => (v >= MAXN ? 2 : v + 1)), 0.7, auto);
  const px = i => 70 + (i / MAXN) * W;
  const py = y => 20 + H - Math.min(y, MAXY) / MAXY * H;

  return (
    <Stage2D
      title="Comparing Growth Rates"
      subtitle="All six on one chart. At small n they look similar — but as n grows, the gap between O(log n) and O(2^n) becomes astronomical."
      accent="#58a6ff"
      viewBox="0 0 640 300"
      controls={
        <>
          <div className="dsa2d-group"><span className="dsa2d-label">n = {n}</span><input className="dsa2d-slider" type="range" min="1" max="16" value={n} onChange={e => setN(+e.target.value)} /></div>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        </>
      }
      legend={<>Ranked from best to worst: <code>O(1)</code> &lt; <code>O(log n)</code> &lt; <code>O(n)</code> &lt; <code>O(n log n)</code> &lt; <code>O(n²)</code> &lt; <code>O(2^n)</code>. The red exponential curve shoots off the chart almost immediately — always a red flag. "Good enough" complexity is what turns a slow solution into a fast one.</>}
    >
      {/* axes */}
      <line x1="70" y1="20" x2="70" y2={20 + H} stroke="#30363d" /><line x1="70" y1={20 + H} x2="70" y2={20 + H} stroke="#30363d" />
      <line x1="70" y1={20 + H} x2={70 + W} y2={20 + H} stroke="#30363d" />
      <text x="40" y="30" fill="#8b949e" fontSize="11" fontFamily="system-ui">ops</text>
      <text x={70 + W} y={20 + H + 18} fill="#8b949e" fontSize="11" textAnchor="end" fontFamily="system-ui">n →</text>
      {/* sweep marker */}
      <line x1={px(n)} y1="20" x2={px(n)} y2={20 + H} stroke="#ffd43b" strokeWidth="1.5" strokeDasharray="3 3" />
      {/* curves */}
      {CURVES.map((cv, ci) => {
        const pts = Array.from({ length: n + 1 }, (_, i) => `${px(i)},${py(cv.f(i))}`).join(' ');
        return <g key={cv.label}>
          <polyline points={pts} fill="none" stroke={cv.c} strokeWidth="2.5" />
          <circle cx={px(n)} cy={py(cv.f(n))} r="4" fill={cv.c} className="dsa2d-pulse" />
          <text x={484} y={44 + ci * 26} fill={cv.c} fontSize="13" fontFamily="Consolas">{cv.label}</text>
          <line x1={468} y1={40 + ci * 26} x2={480} y2={40 + ci * 26} stroke={cv.c} strokeWidth="3" />
        </g>;
      })}
    </Stage2D>
  );
}
