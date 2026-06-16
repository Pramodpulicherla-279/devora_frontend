/* Lesson: Sampling Methods — How to Draw Valid Conclusions from Subsets
 * Visual type: ILLUSTRATION
 * Reason: The four sampling strategies are spatial — which units get picked from
 * a grid is the clearest possible illustration of simple random, stratified,
 * cluster, and systematic sampling. */
import React, { useState } from 'react';
import './visual.css';

const GRID_W = 8, GRID_H = 5, N = GRID_W * GRID_H;

const METHODS = {
  simple: {
    name: 'Simple Random',
    desc: 'Every unit has an equal chance of selection. No structure — pure chance.',
    pro: 'No bias. Easy to implement with np.random.sample().',
    con: 'May miss subgroups by luck. Less efficient on small samples.',
    pick: () => {
      const all = Array.from({ length: N }, (_, i) => i);
      const selected = new Set();
      while (selected.size < 10) selected.add(all[Math.floor(Math.random() * N)]);
      return selected;
    },
  },
  stratified: {
    name: 'Stratified',
    desc: 'Divide into groups (strata) then sample proportionally from each.',
    pro: 'Guarantees every subgroup is represented. Better precision.',
    con: 'Requires knowing the strata in advance.',
    pick: () => {
      const sel = new Set();
      [0, 1, 2, 3, 4].forEach(row => {
        const rowIdxs = Array.from({ length: GRID_W }, (_, i) => row * GRID_W + i);
        sel.add(rowIdxs[Math.floor(Math.random() * GRID_W)]);
        sel.add(rowIdxs[Math.floor(Math.random() * GRID_W)]);
      });
      return sel;
    },
  },
  cluster: {
    name: 'Cluster',
    desc: 'Randomly select entire groups (clusters), then survey all units within.',
    pro: 'Cheaper when units are geographically spread out.',
    con: 'Higher variance — clusters may not represent the population.',
    pick: () => {
      const clusterCols = [1, 4, 6].sort(() => Math.random() - 0.5).slice(0, 2);
      const sel = new Set();
      clusterCols.forEach(c => {
        for (let r = 0; r < GRID_H; r++) sel.add(r * GRID_W + c);
      });
      return sel;
    },
  },
  systematic: {
    name: 'Systematic',
    desc: 'Pick a random start then select every k-th unit.',
    pro: 'Simple to execute on ordered lists. Even spread.',
    con: 'Biased if the list has a periodic pattern matching k.',
    pick: () => {
      const sel = new Set();
      const start = Math.floor(Math.random() * 4);
      for (let i = start; i < N; i += 4) sel.add(i);
      return sel;
    },
  },
};

const InfStatsSamplingVisualization = () => {
  const [method, setMethod] = useState('simple');
  const [picked, setPicked] = useState(() => METHODS.simple.pick());
  const m = METHODS[method];

  const resample = () => setPicked(METHODS[method].pick());
  const switchMethod = (k) => { setMethod(k); setPicked(METHODS[k].pick()); };

  return (
    <div className="issamp-wrap">
      <header className="issamp-head">
        <span className="issamp-badge">Inferential</span>
        <h2>Sampling Methods</h2>
        <p>Which units get picked — and why it matters</p>
      </header>

      <div className="issamp-toggle">
        {Object.keys(METHODS).map(k => (
          <button key={k} className={`issamp-t ${method === k ? 'issamp-t--on' : ''}`} onClick={() => switchMethod(k)}>{METHODS[k].name}</button>
        ))}
      </div>

      <div className="issamp-grid">
        {Array.from({ length: N }, (_, i) => (
          <div key={i} className={`issamp-cell ${picked.has(i) ? 'issamp-cell--on' : ''}`} />
        ))}
      </div>
      <p className="issamp-count">{picked.size} units selected from {N}</p>

      <div className="issamp-desc">{m.desc}</div>
      <div className="issamp-rows">
        <div className="issamp-pcon"><span className="issamp-pro">✓</span>{m.pro}</div>
        <div className="issamp-pcon"><span className="issamp-con">✗</span>{m.con}</div>
      </div>

      <button className="issamp-resample" onClick={resample}>Re-sample</button>

      <div className="issamp-note">
        The sampling method determines whether your estimates are <strong>unbiased</strong>. A convenience sample (whoever is easy to reach) looks like data but is not a random sample — its conclusions cannot generalise.
      </div>
    </div>
  );
};

export default InfStatsSamplingVisualization;
