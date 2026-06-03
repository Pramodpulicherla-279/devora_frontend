/* Lesson: Variables and Data Types
 * Visual type: INTERACTIVE
 * Reason: Python's dynamic types are best explored by clicking a value and seeing
 * its type(), mutability, and a literal example — concrete over abstract. */
import React, { useState } from 'react';
import './visual.css';

const TYPES = [
  { t: 'int', ex: '42', py: 'type(42)', mut: false, note: 'Whole numbers, unlimited size.' },
  { t: 'float', ex: '3.14', py: 'type(3.14)', mut: false, note: 'Decimal numbers.' },
  { t: 'str', ex: '"hello"', py: 'type("hello")', mut: false, note: 'Text. Immutable sequence of characters.' },
  { t: 'bool', ex: 'True', py: 'type(True)', mut: false, note: 'True or False (capitalized!).' },
  { t: 'list', ex: '[1, 2, 3]', py: 'type([1,2,3])', mut: true, note: 'Ordered, changeable sequence.' },
  { t: 'dict', ex: '{"a": 1}', py: 'type({"a":1})', mut: true, note: 'Key-value pairs.' },
  { t: 'NoneType', ex: 'None', py: 'type(None)', mut: false, note: 'The absence of a value.' },
];

const PyVariablesVisualization = () => {
  const [sel, setSel] = useState(0);
  const t = TYPES[sel];
  return (
    <div className="pyvar-wrap">
      <header className="pyvar-head">
        <span className="pyvar-badge">Python</span>
        <h2>Variables &amp; Data Types</h2>
        <p>Dynamically typed — no declarations needed</p>
      </header>
      <pre className="pyvar-code"><code>{`x = ${t.ex}        # just assign — Python infers the type
${t.py}   # → <class '${t.t}'>`}</code></pre>
      <div className="pyvar-types">
        {TYPES.map((ty, i) => (
          <button key={ty.t} className={`pyvar-type ${sel === i ? 'pyvar-type--on' : ''}`} onClick={() => setSel(i)}>
            <code>{ty.t}</code>
          </button>
        ))}
      </div>
      <div className="pyvar-detail">
        <div className="pyvar-d-top">
          <span className="pyvar-d-type">{t.t}</span>
          <span className={`pyvar-mut ${t.mut ? 'pyvar-mut--y' : 'pyvar-mut--n'}`}>{t.mut ? 'mutable' : 'immutable'}</span>
        </div>
        <code className="pyvar-d-ex">{t.ex}</code>
        <p className="pyvar-d-note">{t.note}</p>
      </div>
      <div className="pyvar-tip">💡 No <code>int x</code> or <code>let</code> — just <code>x = value</code>. Reassign to any type anytime (but be careful, that flexibility can hide bugs).</div>
    </div>
  );
};
export default PyVariablesVisualization;
