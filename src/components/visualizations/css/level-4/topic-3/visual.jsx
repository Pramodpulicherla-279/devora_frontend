/* Lesson: Fluid Typography & Layouts
 * Visual: clamp() visualizer — font-size scales with viewport, clamped between min and max */
import { useState, useMemo } from 'react';
import './visual.css';

const MIN_REM = 1.0, MAX_REM = 2.5, PREF_VW = 4; // clamp(1rem, 4vw, 2.5rem)

export default function CssFluidTypographyVisualization() {
  const [vw, setVw] = useState(700);

  const { sizeRem, state } = useMemo(() => {
    const pref = (PREF_VW / 100) * vw / 16; // vw -> rem (16px base)
    let s = pref, st = 'fluid (scaling with viewport)';
    if (pref <= MIN_REM) { s = MIN_REM; st = 'clamped at MIN'; }
    else if (pref >= MAX_REM) { s = MAX_REM; st = 'clamped at MAX'; }
    return { sizeRem: s, state: st };
  }, [vw]);

  return (
    <div className="fluidtype-wrap">
      <h3 className="fluidtype-title">Fluid Typography & Layouts</h3>
      <p className="fluidtype-sub">One <code>clamp()</code> scales type smoothly — no breakpoints needed</p>

      <pre className="fluidtype-code">font-size: clamp(<span className="fluidtype-min">1rem</span>, <span className="fluidtype-pref">4vw</span>, <span className="fluidtype-max">2.5rem</span>);</pre>

      <label className="fluidtype-label">Viewport width: <strong>{vw}px</strong></label>
      <input className="fluidtype-slider" type="range" min="320" max="1440" value={vw} onChange={e => setVw(+e.target.value)} />

      <div className="fluidtype-preview">
        <span style={{ fontSize: `${sizeRem}rem` }}>Fluid heading</span>
      </div>

      <div className="fluidtype-readout">
        <div className="fluidtype-stat"><span>{sizeRem.toFixed(2)}rem</span><small>computed size</small></div>
        <div className={`fluidtype-stat ${state.includes('clamped') ? 'fluidtype-clamped' : 'fluidtype-fluidstate'}`}><span>{state.split(' ')[0]}</span><small>{state.includes('MIN') ? 'at minimum' : state.includes('MAX') ? 'at maximum' : 'between bounds'}</small></div>
      </div>

      <div className="fluidtype-track">
        <span className="fluidtype-bound">1rem</span>
        <div className="fluidtype-bar"><div className="fluidtype-fill" style={{ width: `${((sizeRem - MIN_REM) / (MAX_REM - MIN_REM)) * 100}%` }} /></div>
        <span className="fluidtype-bound">2.5rem</span>
      </div>
    </div>
  );
}
