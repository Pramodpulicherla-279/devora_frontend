/* Lesson: Functions — Writing Code You Can Reuse
 * Visual type: ILLUSTRATION
 * Shows function anatomy then 3 reuse scenarios with the same function called on different data */
import React, { useState } from 'react';
import './visual.css';

const PARTS = [
  { id:'def',    label:'def keyword',    hl:'def ',              note:'Tells Python you are defining a function.' },
  { id:'name',   label:'Name',           hl:'calculate_gst',     note:'Pick a verb-noun name. Lowercase with underscores (snake_case).' },
  { id:'params', label:'Parameters',     hl:'(amount, rate=0.18)', note:'Inputs the function expects. rate=0.18 is a default — caller can override it.' },
  { id:'body',   label:'Function body',  hl:'  gst = amount * rate\n  return amount + gst', note:'Indented 4 spaces. Must return a value (or None implicitly).' },
  { id:'return', label:'return',         hl:'return amount + gst', note:'Sends the result back to the caller. Without return, the function returns None.' },
];

const CODE = `def calculate_gst(amount, rate=0.18):
    gst = amount * rate
    return amount + gst`;

const CALLS = [
  { call:"calculate_gst(4200)",           result: 4956,    note:'Uses default rate 18%.' },
  { call:"calculate_gst(4200, 0.05)",     result: 4410,    note:'Override rate — 5% GST slab.' },
  { call:"calculate_gst(12400)",          result: 14632,   note:'Same function, different input.' },
];

const PyFunctionsVisualization = () => {
  const [sel, setSel] = useState(null);
  const part = PARTS.find(p=>p.id===sel);

  const highlight = (code) => {
    if (!sel || !part) return code;
    return code.split(part.hl).join(`§${part.hl}§`).split('§').map((seg, i) =>
      seg === part.hl ? <mark key={i} className="pyfn-mark">{seg}</mark> : seg
    );
  };

  return (
    <div className="pyfn-wrap">
      <header className="pyfn-head">
        <span className="pyfn-badge">Python Basics</span>
        <h2>Functions</h2>
        <p>Click a part to learn what it does — then see the function in action</p>
      </header>

      <pre className="pyfn-code"><code>{highlight(CODE)}</code></pre>

      <div className="pyfn-parts">
        {PARTS.map(p=>(
          <button key={p.id} className={`pyfn-part-btn ${sel===p.id?'pyfn-part-btn--on':''}`} onClick={()=>setSel(sel===p.id?null:p.id)}>{p.label}</button>
        ))}
      </div>

      {part && <div className="pyfn-note">{part.note}</div>}

      <div className="pyfn-divider" />
      <div className="pyfn-calls-label">Calling the same function three ways:</div>
      <div className="pyfn-calls">
        {CALLS.map((c,i)=>(
          <div key={i} className="pyfn-call">
            <code className="pyfn-call-code">{c.call}</code>
            <span className="pyfn-arrow">→</span>
            <code className="pyfn-result">₹{c.result.toLocaleString()}</code>
            <span className="pyfn-call-note">{c.note}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PyFunctionsVisualization;
