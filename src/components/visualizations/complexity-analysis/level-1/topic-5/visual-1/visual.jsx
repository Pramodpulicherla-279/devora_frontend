/* Lesson: Linear Time O(n) — When Work Grows With the Data
 * 2D animated: a loop touches every cell once; the step counter climbs to n as the
 * cursor sweeps. Grow n and the number of steps grows with it. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

export default function CaLinearTimeVisualization() {
  const [n, setN] = useState(8);
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % (n + 1)), 0.4, auto, [n]);
  const CW = Math.min(46, 520 / n), gap = 5;
  const startX = 320 - (n * (CW + gap) - gap) / 2;

  return (
    <Stage2D
      title="Linear Time O(n)"
      subtitle="An O(n) operation touches every item once. Double the data → double the steps. This is a single loop with no nesting."
      accent="#58a6ff"
      viewBox="0 0 640 210"
      controls={
        <>
          <div className="dsa2d-group"><span className="dsa2d-label">n = {n}</span><input className="dsa2d-slider" type="range" min="4" max="12" value={n} onChange={e => { setN(+e.target.value); setI(0); }} /></div>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">steps: {Math.min(i, n)} / {n}</span>
        </>
      }
      legend={<><code>for x in data: total += x</code> visits each of the <code>n</code> items exactly once → <strong>O(n)</strong>. Summing, finding a max, and linear search are all O(n). The step count rises in lockstep with the input.</>}
    >
      {Array.from({ length: n }).map((_, k) => {
        const done = k < i, cur = k === i && i < n;
        return (
          <g key={k} className="dsa2d-fade">
            <rect x={startX + k * (CW + gap)} y="66" width={CW} height="52" rx="7" fill={cur ? '#ffd43b' : done ? '#58a6ff' : '#161b22'} stroke={cur ? '#ffd43b' : '#30363d'} strokeWidth="2" />
          </g>
        );
      })}
      {i < n && <g style={{ transform: `translate(${startX + i * (CW + gap) + CW / 2}px, 42px)`, transition: 'transform .3s' }}><polygon points="-8,-13 8,-13 0,0" fill="#ffd43b" className="dsa2d-pulse" /></g>}
      {/* step bar */}
      <rect x="60" y="150" width="520" height="20" rx="6" fill="#161b22" />
      <rect x="60" y="150" width="520" height="20" rx="6" fill="#58a6ff" style={{ transform: `scaleX(${Math.min(i, n) / n})`, transformBox: 'fill-box', transformOrigin: 'left', transition: 'transform .3s' }} />
      <text x="320" y="192" fill="#c9d1d9" fontSize="12" textAnchor="middle" fontFamily="Consolas">steps grow linearly with n</text>
    </Stage2D>
  );
}
