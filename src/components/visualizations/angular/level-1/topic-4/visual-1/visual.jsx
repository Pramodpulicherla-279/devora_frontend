/* Lesson: Pipes
 * Visual type: INTERACTIVE
 * Reason: Pipes transform display values. Typing a raw value and toggling pipes
 * to watch the formatted output change makes the | syntax instantly clear. */
import React, { useState } from 'react';
import './visual.css';

const NgPipesVisualization = () => {
  const [pipe, setPipe] = useState('uppercase');
  const PIPES = {
    uppercase: { syntax: "{{ 'hello' | uppercase }}", input: 'hello', out: 'HELLO' },
    currency: { syntax: "{{ 1234.5 | currency:'USD' }}", input: '1234.5', out: '$1,234.50' },
    date: { syntax: "{{ today | date:'mediumDate' }}", input: '2024-03-15', out: 'Mar 15, 2024' },
    percent: { syntax: '{{ 0.847 | percent }}', input: '0.847', out: '84.7%' },
    json: { syntax: '{{ obj | json }}', input: '{a:1}', out: '{ "a": 1 }' },
    slice: { syntax: "{{ 'Angular' | slice:0:3 }}", input: 'Angular', out: 'Ang' },
  };
  const p = PIPES[pipe];
  return (
    <div className="ngpipe-wrap">
      <header className="ngpipe-head">
        <span className="ngpipe-badge">Angular</span>
        <h2>Pipes</h2>
        <p>Transform values right in the template with <code>|</code></p>
      </header>
      <div className="ngpipe-tabs">
        {Object.keys(PIPES).map((k) => (
          <button key={k} className={`ngpipe-tab ${pipe === k ? 'ngpipe-tab--on' : ''}`} onClick={() => setPipe(k)}>{k}</button>
        ))}
      </div>
      <div className="ngpipe-flow">
        <div className="ngpipe-box ngpipe-box--in"><span className="ngpipe-l">input</span><code>{p.input}</code></div>
        <div className="ngpipe-pipe">| {pipe}</div>
        <div className="ngpipe-box ngpipe-box--out"><span className="ngpipe-l">output</span><code>{p.out}</code></div>
      </div>
      <pre className="ngpipe-code"><code>{p.syntax}</code></pre>
      <div className="ngpipe-note">Pipes are pure display transforms — they never change the underlying data. Chain them: <code>{'{{ value | date | uppercase }}'}</code>. You can also write custom pipes.</div>
    </div>
  );
};
export default NgPipesVisualization;
