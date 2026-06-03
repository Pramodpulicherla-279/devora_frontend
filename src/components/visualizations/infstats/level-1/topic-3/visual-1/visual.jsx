/* Lesson: Sampling Methods
 * Visual type: ILLUSTRATION (with light interactivity to switch methods)
 * Reason: Random vs stratified vs cluster vs systematic are spatial selection
 * patterns — showing which units get picked on a grid makes the difference obvious. */
import React, { useState } from 'react';
import './visual.css';

const METHODS = {
  random: { label: 'Simple Random', desc: 'Every unit has an equal chance. Simple but can miss small subgroups.' },
  stratified: { label: 'Stratified', desc: 'Split into groups (strata), sample from each — guarantees representation.' },
  systematic: { label: 'Systematic', desc: 'Pick every k-th unit. Easy, but risky if data has a hidden cycle.' },
  cluster: { label: 'Cluster', desc: 'Randomly pick whole groups, survey everyone inside. Cheap at scale.' },
};
const COLORS = ['#818cf8', '#34d399', '#f0883e', '#f472b6'];

function picked(method) {
  const grid = Array.from({ length: 40 }, (_, i) => i);
  if (method === 'random') { const s = new Set(); while (s.size < 10) s.add(Math.floor(Math.random() * 40)); return grid.map((i) => (s.has(i) ? 0 : -1)); }
  if (method === 'systematic') return grid.map((i) => (i % 4 === 0 ? 0 : -1));
  if (method === 'stratified') return grid.map((i) => (i % 10 < 2 ? Math.floor(i / 10) : -1));
  // cluster: pick 2 of 4 columns-of-10
  const clusters = [0, 2];
  return grid.map((i) => (clusters.includes(Math.floor(i / 10)) ? Math.floor(i / 10) : -1));
}

const InfStatsSamplingVisualization = () => {
  const [method, setMethod] = useState('random');
  const [seed, setSeed] = useState(0);
  const marks = React.useMemo(() => picked(method), [method, seed]);
  return (
    <div className="issamp-wrap">
      <header className="issamp-head">
        <span className="issamp-badge">Inferential</span>
        <h2>Sampling Methods</h2>
        <p>How you pick your sample changes everything</p>
      </header>
      <div className="issamp-tabs">
        {Object.entries(METHODS).map(([k, m]) => (
          <button key={k} className={`issamp-tab ${method === k ? 'issamp-tab--on' : ''}`} onClick={() => setMethod(k)}>{m.label}</button>
        ))}
      </div>
      <div className="issamp-grid-wrap">
        <div className="issamp-grid">
          {marks.map((m, i) => (
            <div key={i} className={`issamp-cell ${m >= 0 ? 'issamp-cell--on' : ''}`}
              style={m >= 0 ? { background: COLORS[m % 4], borderColor: COLORS[m % 4] } : {}} />
          ))}
        </div>
        {method === 'random' && <button className="issamp-reroll" onClick={() => setSeed((s) => s + 1)}>↻ Re-sample</button>}
      </div>
      <div className="issamp-desc">{METHODS[method].desc}</div>
    </div>
  );
};
export default InfStatsSamplingVisualization;
