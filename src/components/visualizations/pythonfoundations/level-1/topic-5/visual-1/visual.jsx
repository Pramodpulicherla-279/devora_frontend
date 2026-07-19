/* Lesson: Loops — Repeating Work With for and while
 * 2D animated: a cursor marches across range(n) cells (for), or an accumulator halves
 * until the condition fails (while). Auto-steps so the iteration plays itself. */
import { useState } from 'react';
import Stage2D from '../../../_shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../_shared/util';

export default function PfLoopsVisualization() {
  const [mode, setMode] = useState('for');
  const [n, setN] = useState(6);
  const [i, setI] = useState(0);
  const [wSteps, setWSteps] = useState([64]);
  const [auto, setAuto] = useState(true);

  const reset = () => { setI(0); setWSteps([64]); };
  const step = () => {
    if (mode === 'for') setI(v => (v + 1) % (n + 1));
    else setWSteps(s => (s[s.length - 1] > 1 ? [...s, Math.floor(s[s.length - 1] / 2)] : [64]));
  };
  useAutoPlay(step, 1.1, auto, [mode, n, i, wSteps]);

  const cells = mode === 'for'
    ? Array.from({ length: n }, (_, k) => ({ label: k, done: k < i, cur: k === i && i < n }))
    : wSteps.map((v, k) => ({ label: v, done: k < wSteps.length - 1, cur: k === wSteps.length - 1 }));
  const CW = 74, gap = 8;
  const startX = 320 - (cells.length * (CW + gap) - gap) / 2;
  const curIdx = mode === 'for' ? Math.min(i, n - 1) : wSteps.length - 1;

  return (
    <Stage2D
      title="Loops: for and while"
      subtitle="for marches over a known sequence; while repeats until a condition fails. Watch the cursor step through each iteration."
      accent="#a78bfa"
      viewBox="0 0 640 250"
      controls={
        <>
          <div className="pf2d-group">
            <button className={`pf2d-btn ${mode === 'for' ? 'pf2d-btn--on' : ''}`} onClick={() => { setMode('for'); reset(); }}>for i in range(n)</button>
            <button className={`pf2d-btn ${mode === 'while' ? 'pf2d-btn--on' : ''}`} onClick={() => { setMode('while'); reset(); }}>while x&gt;1: x//=2</button>
          </div>
          {mode === 'for' && <div className="pf2d-group"><span className="pf2d-label">n={n}</span><input className="pf2d-slider" type="range" min="3" max="7" value={n} onChange={e => { setN(+e.target.value); setI(0); }} /></div>}
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <button className="pf2d-btn" onClick={reset}>↺</button>
          <span className="pf2d-readout">{mode === 'for' ? (i < n ? `i = ${i}` : 'loop done') : (wSteps[wSteps.length - 1] > 1 ? `x = ${wSteps[wSteps.length - 1]}` : 'x = 1 → stop')}</span>
        </>
      }
      legend={mode === 'for'
        ? <><code>for i in range({n})</code> visits {n} known positions in order — ideal for arrays and strings. Purple cells are finished, the yellow marker is the current <code>i</code>.</>
        : <><code>while</code> doesn't know its trip count up front — it halves 64 until the condition fails. Counting the cells (~{Math.log2(64)}) IS the intuition behind <strong>O(log n)</strong> algorithms like binary search.</>}
    >
      <text x="24" y="60" fill="#8b949e" fontSize="13" fontFamily="Consolas">{mode === 'for' ? `range(${n}) → 0 … ${n - 1}` : 'each cell = one iteration'}</text>
      {cells.map((c, k) => {
        const x = startX + k * (CW + gap);
        return (
          <g key={k}>
            <rect x={x} y="100" width={CW} height={CW} rx="10" fill={c.cur ? '#ffd43b' : c.done ? '#a78bfa' : '#161b22'} stroke={c.cur ? '#ffd43b' : '#30363d'} strokeWidth="2" className="pf2d-fade" />
            <text x={x + CW / 2} y="145" fill={c.cur || c.done ? '#0d1117' : '#e6edf3'} fontSize="24" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{c.label}</text>
          </g>
        );
      })}
      {/* cursor */}
      {cells.length > 0 && (
        <g style={{ transform: `translate(${startX + curIdx * (CW + gap) + CW / 2}px, 80px)`, transition: 'transform .4s cubic-bezier(.4,1.2,.5,1)' }}>
          <polygon points="-10,-18 10,-18 0,0" fill="#ffd43b" className="pf2d-pulse" />
        </g>
      )}
    </Stage2D>
  );
}
