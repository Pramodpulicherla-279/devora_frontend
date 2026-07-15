/* Lesson: Loop Control — break, continue, and Avoiding Infinite Loops
 * 2D animated: a token walks a row of iterations. break ejects it out of the loop,
 * continue skips a station's work, an infinite loop never changes its condition. */
import { useState } from 'react';
import Stage2D from '../../../_shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../_shared/util';

const ITEMS = [4, 7, 2, 9, 5, 8];

export default function PfLoopControlVisualization() {
  const [mode, setMode] = useState('break');
  const [k, setK] = useState(0);
  const [ejected, setEjected] = useState(false);
  const [auto, setAuto] = useState(true);

  const reset = () => { setK(0); setEjected(false); };
  const step = () => {
    if (ejected) { reset(); return; }
    const next = k + 1;
    if (next >= ITEMS.length) { if (mode === 'infinite') { setK(0); return; } reset(); return; }
    if (mode === 'break' && ITEMS[next] === 9) { setK(next); setEjected(true); return; }
    setK(next);
  };
  useAutoPlay(step, 1.1, auto, [k, ejected, mode]);

  const CW = 78, gap = 12;
  const startX = 320 - (ITEMS.length * (CW + gap) - gap) / 2;
  const tokenX = startX + k * (CW + gap) + CW / 2;

  return (
    <Stage2D
      title="break, continue & infinite loops"
      subtitle="Watch the token walk the loop. break exits entirely; continue skips a station's work; a loop that never changes its condition circles forever."
      accent="#f97316"
      viewBox="0 0 640 250"
      controls={
        <>
          <div className="pf2d-group">
            <button className={`pf2d-btn ${mode === 'break' ? 'pf2d-btn--on' : ''}`} onClick={() => { setMode('break'); reset(); }}>break at 9</button>
            <button className={`pf2d-btn ${mode === 'continue' ? 'pf2d-btn--on' : ''}`} onClick={() => { setMode('continue'); reset(); }}>continue on odd</button>
            <button className={`pf2d-btn ${mode === 'infinite' ? 'pf2d-btn--on' : ''}`} onClick={() => { setMode('infinite'); reset(); }}>infinite loop</button>
          </div>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <button className="pf2d-btn" onClick={reset}>↺</button>
        </>
      }
      legend={mode === 'break'
        ? <><code>break</code> is the emergency exit: the instant it runs the whole loop ends and the token leaves the row. Classic use — stop searching the moment you find the target.</>
        : mode === 'continue'
          ? <><code>continue</code> skips only the <em>rest of this iteration</em>: the token glides past dimmed odd stations without doing their work, but the loop keeps going.</>
          : <>An infinite loop never changes its exit condition, so the token wraps forever. Fix: mutate the loop variable, or guard with a <code>break</code>.</>}
    >
      {/* loop back-arrow */}
      {mode === 'infinite' && (
        <>
          <path d={`M${startX} 160 Q${startX - 40} 90 320 60 Q${startX + ITEMS.length * (CW + gap)} 90 ${startX + ITEMS.length * (CW + gap) - gap} 116`} fill="none" stroke="#f85149" strokeWidth="2" className="pf2d-flow" />
          <text x="320" y="46" fill="#f85149" fontSize="22" textAnchor="middle">∞</text>
        </>
      )}
      {ITEMS.map((v, idx) => {
        const x = startX + idx * (CW + gap);
        const isBreak = mode === 'break' && v === 9;
        const skip = mode === 'continue' && v % 2 === 1;
        return (
          <g key={idx} className="pf2d-fade">
            <rect x={x} y="118" width={CW} height={CW} rx="10"
              fill={isBreak ? '#f85149' : skip ? '#161b22' : '#58a6ff'} opacity={skip ? 0.4 : 1}
              stroke={isBreak ? '#f85149' : '#30363d'} strokeWidth="2" />
            <text x={x + CW / 2} y="164" fill={skip ? '#8b949e' : '#0d1117'} fontSize="26" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
          </g>
        );
      })}
      {/* token */}
      <g style={{ transform: ejected ? `translate(${tokenX}px, 40px)` : `translate(${tokenX}px, 100px)`, transition: 'transform .5s cubic-bezier(.4,1.3,.5,1)' }}>
        <circle r="13" fill="#ffd43b" className="pf2d-pulse" />
      </g>
      {ejected && <text x={tokenX} y="30" fill="#f85149" fontSize="13" textAnchor="middle" fontFamily="system-ui">out of the loop!</text>}
    </Stage2D>
  );
}
