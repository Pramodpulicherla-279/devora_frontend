/* Lesson: Space Complexity — Measuring Memory, Not Just Time
 * 2D animated: compare an in-place reverse (O(1) extra memory) with a copy-based reverse
 * (O(n) extra memory). Grow n and watch only the copy's memory bar grow. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

export default function CaSpaceComplexityVisualization() {
  const [n, setN] = useState(6);
  const [mode, setMode] = useState('copy');
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setN(v => (v >= 10 ? 3 : v + 1)), 1.1, auto);
  const extra = mode === 'copy' ? n : 1;
  const CW = Math.min(40, 360 / n), gap = 5;

  return (
    <Stage2D
      title="Space Complexity O(1) vs O(n)"
      subtitle="Complexity isn't only about time — it's also about the EXTRA memory an algorithm allocates as the input grows."
      accent="#56d364"
      viewBox="0 0 640 260"
      controls={
        <>
          <div className="dsa2d-group">
            <button className={`dsa2d-btn ${mode === 'inplace' ? 'dsa2d-btn--on' : ''}`} onClick={() => setMode('inplace')}>in-place — O(1)</button>
            <button className={`dsa2d-btn ${mode === 'copy' ? 'dsa2d-btn--on' : ''}`} onClick={() => setMode('copy')}>make a copy — O(n)</button>
          </div>
          <div className="dsa2d-group"><span className="dsa2d-label">n = {n}</span><input className="dsa2d-slider" type="range" min="3" max="10" value={n} onChange={e => setN(+e.target.value)} /></div>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">extra memory: {extra} cell{extra > 1 ? 's' : ''}</span>
        </>
      }
      legend={mode === 'inplace'
        ? <>Reversing with two swapping pointers uses <strong>O(1)</strong> extra space — a couple of variables, no matter how big the array. The memory bar stays flat.</>
        : <>Building a reversed <em>copy</em> allocates a whole new array of size <code>n</code> → <strong>O(n)</strong> extra space. As n grows, so does the memory bar. Time and space are separate budgets — sometimes you trade one for the other.</>}
    >
      {/* input array */}
      <text x="24" y="46" fill="#8b949e" fontSize="12" fontFamily="system-ui">input (always here):</text>
      {Array.from({ length: n }).map((_, i) => <rect key={i} x={200 + i * (CW + gap)} y="30" width={CW} height="28" rx="5" fill="#30363d" />)}
      {/* extra memory */}
      <text x="24" y="120" fill="#8b949e" fontSize="12" fontFamily="system-ui">extra memory used:</text>
      {Array.from({ length: extra }).map((_, i) => <rect key={i} x={200 + i * (CW + gap)} y="104" width={CW} height="28" rx="5" fill="#56d364" className="dsa2d-pop" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />)}
      {/* memory bar */}
      <text x="24" y="188" fill="#8b949e" fontSize="12" fontFamily="system-ui">space:</text>
      <rect x="200" y="176" width="380" height="22" rx="6" fill="#161b22" />
      <rect x="200" y="176" width="380" height="22" rx="6" fill={mode === 'copy' ? '#f0883e' : '#56d364'} style={{ transform: `scaleX(${extra / 10})`, transformBox: 'fill-box', transformOrigin: 'left', transition: 'transform .4s, fill .3s' }} />
      <text x="320" y="232" fill="#c9d1d9" fontSize="13" textAnchor="middle" fontFamily="Consolas">{mode === 'copy' ? 'O(n) extra space' : 'O(1) extra space'}</text>
    </Stage2D>
  );
}
