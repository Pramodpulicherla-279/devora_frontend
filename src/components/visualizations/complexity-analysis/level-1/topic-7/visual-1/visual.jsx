/* Lesson: Quadratic Time O(n²) — Nested Loops and Why They're Dangerous
 * 2D animated: a nested loop fills an n×n grid cell by cell; the counter races to n².
 * Grow n a little and the work explodes. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

export default function CaQuadraticTimeVisualization() {
  const [n, setN] = useState(6);
  const [k, setK] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setK(v => (v + 1) % (n * n + 1)), 0.12, auto, [n]);
  const cell = Math.min(30, 200 / n), gap = 3;
  const grid = n * (cell + gap) - gap;
  const ox = 320 - grid / 2, oy = 30;

  return (
    <Stage2D
      title="Quadratic Time O(n²)"
      subtitle="A loop inside a loop runs the inner work n times for each of n outer passes — n × n = n² operations. It grows dangerously fast."
      accent="#f85149"
      viewBox="0 0 640 300"
      controls={
        <>
          <div className="dsa2d-group"><span className="dsa2d-label">n = {n}</span><input className="dsa2d-slider" type="range" min="3" max="8" value={n} onChange={e => { setN(+e.target.value); setK(0); }} /></div>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">{Math.min(k, n * n)} / {n}² = {n * n} ops</span>
        </>
      }
      legend={<>Each of the <code>n²</code> cells is one operation — <code>for i in range(n): for j in range(n): …</code>. At n=8 that's 64 ops; at n=1000 it's a <strong>million</strong>. Bubble sort and naive pair-checking are O(n²) — fine for small inputs, deadly at scale.</>}
    >
      {Array.from({ length: n }).map((_, r) => Array.from({ length: n }).map((_, c) => {
        const idx = r * n + c; const done = idx < k;
        return <rect key={`${r}-${c}`} x={ox + c * (cell + gap)} y={oy + r * (cell + gap)} width={cell} height={cell} rx="4" fill={done ? '#f85149' : '#161b22'} stroke="#30363d" className="dsa2d-fade" />;
      }))}
      <text x="320" y={oy + grid + 34} fill="#c9d1d9" fontSize="14" textAnchor="middle" fontFamily="Consolas">outer × inner = {n} × {n} = {n * n} operations</text>
      <text x="320" y={oy + grid + 58} fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">add just 1 to n and the whole grid gets bigger</text>
    </Stage2D>
  );
}
