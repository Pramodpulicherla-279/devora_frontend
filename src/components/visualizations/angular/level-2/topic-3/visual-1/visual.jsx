/* Lesson: Observables & RxJS
 * Visual type: INTERACTIVE (marble diagram)
 * Reason: RxJS operators transform streams over time — a marble diagram where you
 * emit values and watch an operator transform them is the canonical RxJS teaching tool. */
import React, { useState } from 'react';
import './visual.css';

const OPS = {
  map: { label: 'map(x => x*2)', fn: (v) => v * 2, d: 'Transform each emitted value.' },
  filter: { label: 'filter(x => x%2===0)', fn: (v) => v, keep: (v) => v % 2 === 0, d: 'Only let through values passing the test.' },
};

const NgRxjsVisualization = () => {
  const [op, setOp] = useState('map');
  const [marbles, setMarbles] = useState([]);
  const cfg = OPS[op];
  const emit = () => {
    const v = Math.floor(Math.random() * 9) + 1;
    const id = Date.now();
    const passes = cfg.keep ? cfg.keep(v) : true;
    setMarbles((m) => [...m.slice(-5), { id, v, out: passes ? cfg.fn(v) : null }]);
  };
  return (
    <div className="ngrx-wrap">
      <header className="ngrx-head">
        <span className="ngrx-badge">Angular</span>
        <h2>Observables &amp; RxJS</h2>
        <p>Streams of values over time, transformed by operators</p>
      </header>
      <div className="ngrx-tabs">
        {Object.entries(OPS).map(([k, v]) => (
          <button key={k} className={`ngrx-tab ${op === k ? 'ngrx-tab--on' : ''}`} onClick={() => { setOp(k); setMarbles([]); }}>{v.label}</button>
        ))}
      </div>
      <div className="ngrx-stream">
        <div className="ngrx-line"><span className="ngrx-line-label">source$</span>
          <div className="ngrx-marbles">{marbles.map((m) => <span key={m.id} className="ngrx-marble ngrx-marble--in">{m.v}</span>)}</div>
        </div>
        <div className="ngrx-op">{cfg.label}</div>
        <div className="ngrx-line"><span className="ngrx-line-label">output$</span>
          <div className="ngrx-marbles">{marbles.map((m) => m.out !== null ? <span key={m.id} className="ngrx-marble ngrx-marble--out">{m.out}</span> : <span key={m.id} className="ngrx-marble ngrx-marble--drop">✕</span>)}</div>
        </div>
      </div>
      <div className="ngrx-controls">
        <button className="ngrx-btn" onClick={emit}>▶ Emit a value</button>
        <button className="ngrx-btn ngrx-btn--reset" onClick={() => setMarbles([])}>Clear</button>
      </div>
      <div className="ngrx-note">{cfg.d} An <strong>Observable</strong> is a stream you subscribe to; operators like <code>map</code>, <code>filter</code>, <code>switchMap</code> compose pipelines over async events.</div>
    </div>
  );
};
export default NgRxjsVisualization;
