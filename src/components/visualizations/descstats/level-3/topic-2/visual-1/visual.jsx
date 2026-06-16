/* Lesson: Simpson's Paradox and Other Statistical Traps
 * Visual type: INTERACTIVE
 * Reason: The core of this lesson is the reversal illusion — aggregate numbers
 * say "Accessories returns more" while every individual city says the opposite.
 * A toggle between Aggregate and By-City bar views makes the reversal undeniable. */
import React, { useState } from 'react';
import './visual.css';

const W = 320, H = 160, PAD = 28, GAP = 18, BAR_W = 54;

const DATA = {
  aggregate: [
    { label: 'Electronics', pct: 40,  n: 30,  r: 12, color: '#f0883e' },
    { label: 'Accessories', pct: 43,  n: 30,  r: 13, color: '#56d364' },
  ],
  cities: [
    { city: 'Mumbai',
      bars: [
        { label: 'Electronics', pct: 20, n: 20, r: 4, color: '#f0883e' },
        { label: 'Accessories', pct: 10, n: 10, r: 1, color: '#56d364' },
      ]
    },
    { city: 'Pune',
      bars: [
        { label: 'Electronics', pct: 80, n: 10, r: 8, color: '#f0883e' },
        { label: 'Accessories', pct: 60, n: 20, r: 12, color: '#56d364' },
      ]
    },
  ],
};

function BarSet({ bars, scaleMax }) {
  const chartH = H - PAD;
  return (
    <>
      {bars.map((b, i) => {
        const bh = (b.pct / scaleMax) * chartH;
        const x = PAD + i * (BAR_W + GAP);
        return (
          <g key={b.label}>
            <rect x={x} y={H - PAD - bh} width={BAR_W} height={bh} rx={4} fill={b.color} opacity={0.9} />
            <text x={x + BAR_W / 2} y={H - PAD - bh - 5} textAnchor="middle" fill={b.color} fontSize={11} fontWeight="700">{b.pct}%</text>
            <text x={x + BAR_W / 2} y={H + 4} textAnchor="middle" fill="#a3adbb" fontSize={9.5}>{b.label}</text>
            <text x={x + BAR_W / 2} y={H + 14} textAnchor="middle" fill="#6b7785" fontSize={8.5}>{b.r}/{b.n}</text>
          </g>
        );
      })}
    </>
  );
}

const DescStatsSimpsonsVisualization = () => {
  const [view, setView] = useState('aggregate');

  return (
    <div className="dssim-wrap">
      <header className="dssim-head">
        <span className="dssim-badge">Statistics</span>
        <h2>Simpson's Paradox</h2>
        <p>Same data — two completely opposite conclusions</p>
      </header>

      <div className="dssim-toggle">
        <button className={`dssim-t ${view === 'aggregate' ? 'dssim-t--on' : ''}`} onClick={() => setView('aggregate')}>Aggregate view</button>
        <button className={`dssim-t ${view === 'cities' ? 'dssim-t--on' : ''}`} onClick={() => setView('cities')}>By city</button>
      </div>

      {view === 'aggregate' ? (
        <div className="dssim-chart-wrap">
          <p className="dssim-chart-label">Return rate — all cities combined</p>
          <svg viewBox={`0 0 ${W} ${H + 20}`} width="100%" className="dssim-svg">
            <line x1={PAD} y1={0} x2={PAD} y2={H - PAD} stroke="#30363d" strokeWidth={1} />
            <line x1={PAD} y1={H - PAD} x2={W} y2={H - PAD} stroke="#30363d" strokeWidth={1} />
            <BarSet bars={DATA.aggregate} scaleMax={60} />
          </svg>
          <p className="dssim-verdict dssim-verdict--acc">Aggregate says: Accessories returns MORE (43% vs 40%)</p>
        </div>
      ) : (
        <div className="dssim-cities">
          {DATA.cities.map(cg => (
            <div key={cg.city} className="dssim-city-block">
              <p className="dssim-chart-label">{cg.city}</p>
              <svg viewBox={`0 0 ${(BAR_W + GAP) * 2 + PAD * 2} ${H + 20}`} width="100%" className="dssim-svg">
                <line x1={PAD} y1={0} x2={PAD} y2={H - PAD} stroke="#30363d" strokeWidth={1} />
                <line x1={PAD} y1={H - PAD} x2={(BAR_W + GAP) * 2 + PAD * 2} y2={H - PAD} stroke="#30363d" strokeWidth={1} />
                <BarSet bars={cg.bars} scaleMax={100} />
              </svg>
            </div>
          ))}
          <p className="dssim-verdict dssim-verdict--elec">By city: Electronics returns MORE in BOTH cities</p>
        </div>
      )}

      <div className="dssim-explain">
        <strong>Why?</strong> Mumbai (low return rates overall) has mostly Electronics orders. Pune (high return rates) has mostly Accessories. When you aggregate, city composition distorts the category comparison — this is a <em>confounding variable</em>.
      </div>

      <div className="dssim-note">
        <strong>Fix it:</strong> always segment by the confounding variable before drawing a causal conclusion. If the conclusion flips when you break by subgroup, the aggregate is misleading.
      </div>
    </div>
  );
};

export default DescStatsSimpsonsVisualization;
