/* Lesson: Variable Scope — Local vs Global
 * 2D animated: a lookup pointer starts in the inner room and walks outward (LEGB),
 * stopping at the first x it finds. Toggle whether a local x exists / global keyword. */
import { useState, useEffect } from 'react';
import Stage2D from '../../../_shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../_shared/util';

export default function PfScopeVisualization() {
  const [readInside, setReadInside] = useState(true);
  const [localExists, setLocalExists] = useState(true);
  const [globalKw, setGlobalKw] = useState(false);
  const [auto, setAuto] = useState(true);
  const [seq, setSeq] = useState(0);
  useAutoPlay(() => setSeq(s => (s + 1) % 4), 2.3, auto);
  useEffect(() => {
    if (!auto) return;
    const combo = [[true, true, false], [true, false, false], [false, true, false], [true, true, true]][seq];
    setReadInside(combo[0]); setLocalExists(combo[1]); setGlobalKw(combo[2]);
  }, [seq, auto]);

  const effLocal = localExists && !globalKw;
  const found = readInside ? (effLocal ? 'local' : 'global') : 'global';
  const shown = found === 'local' ? '"inner"' : '"outer"';
  // pointer target
  const eyePos = readInside ? (found === 'local' ? [300, 150] : [140, 210]) : [140, 210];

  return (
    <Stage2D
      title="Variable Scope: Local vs Global (LEGB)"
      subtitle="Python looks in the innermost room first. Only if the name isn't there does the pointer walk outward to the global room."
      accent="#a78bfa"
      viewBox="0 0 640 290"
      controls={
        <>
          <div className="pf2d-group"><span className="pf2d-label">print(x) from:</span>
            <button className={`pf2d-btn ${readInside ? 'pf2d-btn--on' : ''}`} onClick={() => setReadInside(true)}>inside func()</button>
            <button className={`pf2d-btn ${!readInside ? 'pf2d-btn--on' : ''}`} onClick={() => setReadInside(false)}>module level</button></div>
          <div className="pf2d-group">
            <button className={`pf2d-btn ${localExists ? 'pf2d-btn--on' : ''}`} onClick={() => setLocalExists(v => !v)}>{localExists ? '✓ local x' : 'no local x'}</button>
            <button className={`pf2d-btn ${globalKw ? 'pf2d-btn--on' : ''}`} onClick={() => setGlobalKw(v => !v)}>global x</button></div>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="pf2d-readout">print(x) → {shown} · {found}</span>
        </>
      }
      legend={globalKw
        ? <><code>global x</code> tells the function to skip its own room and bind the outer x directly. Use sparingly — functions that quietly mutate globals are hard to debug.</>
        : <>The <strong>LEGB</strong> rule: Local → Enclosing → Global → Built-in. {effLocal && readInside ? 'A local x shadows the global one.' : 'No local x, so the pointer finds the global.'}</>}
    >
      {/* global room */}
      <rect x="60" y="40" width="520" height="210" rx="14" fill="#58a6ff" opacity="0.08" stroke="#58a6ff" strokeWidth="1.5" />
      <text x="76" y="66" fill="#58a6ff" fontSize="13" fontFamily="Consolas">GLOBAL scope (module)</text>
      <rect x="90" y="188" width="130" height="46" rx="8" fill={found === 'global' ? '#58a6ff' : '#161b22'} stroke="#58a6ff" className="pf2d-fade" />
      <text x="155" y="216" fill={found === 'global' ? '#0d1117' : '#c9d1d9'} fontSize="14" textAnchor="middle" fontFamily="Consolas">x = "outer"</text>
      {/* local room */}
      <rect x="250" y="96" width="300" height="128" rx="12" fill="#a78bfa" opacity="0.13" stroke="#a78bfa" strokeWidth="1.5" />
      <text x="266" y="120" fill="#a78bfa" fontSize="12" fontFamily="Consolas">LOCAL scope — def func():</text>
      {effLocal && (
        <g className="pf2d-fade">
          <rect x="270" y="132" width="130" height="46" rx="8" fill={found === 'local' ? '#a78bfa' : '#161b22'} stroke="#a78bfa" />
          <text x="335" y="160" fill={found === 'local' ? '#0d1117' : '#c9d1d9'} fontSize="14" textAnchor="middle" fontFamily="Consolas">x = "inner"</text>
        </g>
      )}
      {/* lookup pointer */}
      <g style={{ transform: `translate(${eyePos[0]}px, ${eyePos[1]}px)`, transition: 'transform .55s cubic-bezier(.4,1.1,.5,1)' }}>
        <circle r="14" fill="#ffd43b" className="pf2d-pulse" />
        <text y="-22" fill="#ffd43b" fontSize="12" textAnchor="middle" fontFamily="Consolas">print(x)</text>
      </g>
    </Stage2D>
  );
}
