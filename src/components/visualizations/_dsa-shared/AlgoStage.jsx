/* AlgoStage — the shared "interactive CS textbook" framework for algorithm visuals.
 * Drives a precomputed array of frames with full transport (restart / step-back / play-pause /
 * step-forward / speed / scrubber), a synced code panel, a live variable inspector, and a
 * console — all from one timeline. Keyboard + reduced-motion + aria built in.
 *
 * A consumer supplies:
 *   frames        array of opaque per-step state objects
 *   renderCanvas  (frame, prev) => SVG children
 *   aside         (frame, prev) => JSX under the canvas (queue strips etc.)   [optional]
 *   code          [{ n, t }]   code lines (t may contain highlight spans)     [optional]
 *   lineFor       frame => code line number to highlight                      [optional]
 *   variables     (frame, prev) => [{ name, type, prev, cur }]                [optional]
 *   logFor        (frame, i) => console string for that step                  [optional]
 */
import { useState, useEffect, useRef } from 'react';
import './algostage.css';

export default function AlgoStage({
  title, subtitle, frames, viewBox = '0 0 640 320', accent = '#6b8cff',
  renderCanvas, aside, code = [], lineFor = () => null, variables = () => [], logFor = () => null, legend,
}) {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const N = frames.length;
  const reduce = useRef(false);
  useEffect(() => { reduce.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches; }, []);

  // auto-advance: a fresh timeout per step, stops cleanly at the end
  useEffect(() => {
    if (!playing) return undefined;
    if (i >= N - 1) { setPlaying(false); return undefined; }
    const id = setTimeout(() => setI(v => Math.min(N - 1, v + 1)), 950 / speed);
    return () => clearTimeout(id);
  }, [playing, i, speed, N]);

  const stop = () => setPlaying(false);
  const togglePlay = () => { if (i >= N - 1) setI(0); setPlaying(p => !p); };
  const step = d => { stop(); setI(v => Math.max(0, Math.min(N - 1, v + d))); };
  const restart = () => { stop(); setI(0); };

  const onKey = e => {
    if (['INPUT', 'BUTTON'].includes(e.target.tagName)) return;
    if (e.key === ' ') { e.preventDefault(); togglePlay(); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
    else if (e.key === 'r' || e.key === 'R') { restart(); }
  };

  const fr = frames[i], prev = i > 0 ? frames[i - 1] : null;
  const vars = variables(fr, prev);
  const activeLine = lineFor(fr);
  const logs = [];
  for (let k = 0; k <= i; k++) { const t = logFor(frames[k], k); if (t != null) logs.push(t); }

  return (
    <div className={'algo' + (reduce.current ? ' reduce' : '')} style={{ '--algo-accent': accent }}
      tabIndex={0} onKeyDown={onKey} role="group" aria-label={`${title} — interactive visualization`}>
      <div className="algo-head">
        <h3 className="algo-title">{title}</h3>
        {subtitle && <p className="algo-sub">{subtitle}</p>}
      </div>

      <div className="algo-grid">
        <section className="algo-card algo-canvas" aria-label="Visualization">
          <svg viewBox={viewBox} className="algo-svg" role="img" aria-label={`${title} state at step ${i + 1}`}>
            {renderCanvas(fr, prev)}
          </svg>
          {aside && <div className="algo-strip">{aside(fr, prev)}</div>}
        </section>

        <div className="algo-panels">
          {code.length > 0 && (
            <section className="algo-card" aria-label="Code, current line highlighted">
              <div className="algo-cardh"><h4>Code</h4><span className="algo-tag">python</span></div>
              <pre className="algo-code">{code.map(l => (
                <div key={l.n} className={'algo-cl' + (l.n === activeLine ? ' on' : '')}>
                  <span className="algo-ln">{l.n}</span>
                  <span className="algo-ct" dangerouslySetInnerHTML={{ __html: l.t }} />
                </div>
              ))}</pre>
            </section>
          )}

          {vars.length > 0 && (
            <section className="algo-card" aria-label="Variable inspector">
              <div className="algo-cardh"><h4>Variables</h4><span className="algo-tag">live</span></div>
              <table className="algo-vtable">
                <thead><tr><th>Name</th><th>Type</th><th>Prev</th><th>Current</th></tr></thead>
                <tbody>{vars.map(v => {
                  const ch = String(v.prev) !== String(v.cur);
                  return (
                    <tr key={v.name}>
                      <td className="algo-vn">{v.name}</td><td className="algo-vt">{v.type}</td>
                      <td className="algo-vp">{v.prev}</td>
                      <td className={'algo-vc' + (ch ? ' changed' : '')}>{ch ? <span className="algo-flash">{v.cur}</span> : v.cur}</td>
                    </tr>
                  );
                })}</tbody>
              </table>
            </section>
          )}

          <section className="algo-card" aria-label="Console output">
            <div className="algo-cardh"><h4>Console</h4><span className="algo-tag">stdout</span></div>
            <div className="algo-console">{logs.map((t, k) => (
              <div key={k} className={'algo-cline' + (k === logs.length - 1 ? ' cur' : '')} dangerouslySetInnerHTML={{ __html: t }} />
            ))}</div>
          </section>
        </div>
      </div>

      <div className="algo-transport" role="group" aria-label="Playback controls">
        <div className="algo-tbtns">
          <button className="algo-tbtn" onClick={restart} disabled={i === 0 && !playing} aria-label="Restart" title="Restart (R)">⏮</button>
          <button className="algo-tbtn" onClick={() => step(-1)} disabled={i === 0} aria-label="Step back" title="Step back (←)">◀</button>
          <button className="algo-tbtn algo-play" onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'} title="Play / Pause (Space)">{playing ? '❚❚' : '▶'}</button>
          <button className="algo-tbtn" onClick={() => step(1)} disabled={i === N - 1} aria-label="Step forward" title="Step forward (→)">▶▏</button>
        </div>
        <div className="algo-scrub">
          <input type="range" min="0" max={N - 1} value={i} step="1" onChange={e => { stop(); setI(+e.target.value); }} aria-label="Scrub through steps" />
          <span className="algo-stepnum">{i + 1} / {N}</span>
        </div>
        <div className="algo-speed" role="group" aria-label="Playback speed">
          <span className="algo-sl">Speed</span>
          {[0.5, 1, 2].map(sp => (
            <button key={sp} className={'algo-sp' + (speed === sp ? ' on' : '')} onClick={() => setSpeed(sp)} aria-pressed={speed === sp}>{sp}×</button>
          ))}
        </div>
      </div>

      {legend && <div className="algo-legend">{legend}</div>}
      <div className="algo-sr" aria-live="polite">{`Step ${i + 1} of ${N}`}</div>
    </div>
  );
}
