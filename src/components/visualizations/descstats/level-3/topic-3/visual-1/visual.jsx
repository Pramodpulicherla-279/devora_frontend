/* Lesson: Weighted Averages and Grouped Statistics
 * Visual type: INTERACTIVE
 * Reason: The lesson opens with Rep A (2 deals × ₹50k), Rep B (18 × ₹20k), Rep C
 * (5 × ₹40k). Simple average gives ₹36,667 — wildly wrong. A side-by-side toggle
 * that shows the deal-count bars pulling the average marker into position turns the
 * "averaging averages is wrong" rule from abstract to visceral. */
import React, { useState } from 'react';
import './visual.css';

const REPS = [
  { name: 'Rep A', deals: 2,  avg: 50000, color: '#a78bfa' },
  { name: 'Rep B', deals: 18, avg: 20000, color: '#56d364' },
  { name: 'Rep C', deals: 5,  avg: 40000, color: '#f0883e' },
];

const totalDeals = REPS.reduce((s, r) => s + r.deals, 0);
const simpleAvg  = REPS.reduce((s, r) => s + r.avg, 0) / REPS.length;
const weightedAvg = REPS.reduce((s, r) => s + r.avg * r.deals, 0) / totalDeals;

const fmt = v => '₹' + Math.round(v).toLocaleString('en-IN');

const MAX_AMT = 55000;
const SVG_W = 300, SVG_H = 150, PAD_L = 42, PAD_B = 22, BAR_W = 40, GAP = 20;
const CHART_H = SVG_H - PAD_B;
const CHART_W = SVG_W - PAD_L;

function yPos(v) { return CHART_H - (v / MAX_AMT) * CHART_H; }

const DescStatsWeightedVisualization = () => {
  const [mode, setMode] = useState('simple');
  const marker = mode === 'simple' ? simpleAvg : weightedAvg;
  const markerY = yPos(marker);

  return (
    <div className="dswavg-wrap">
      <header className="dswavg-head">
        <span className="dswavg-badge">Statistics</span>
        <h2>Weighted Averages</h2>
        <p>Who really drives the team's numbers?</p>
      </header>

      <div className="dswavg-reps">
        {REPS.map(r => (
          <div key={r.name} className="dswavg-rep">
            <span className="dswavg-rep-name" style={{ color: r.color }}>{r.name}</span>
            <span className="dswavg-rep-val">{fmt(r.avg)}</span>
            <span className="dswavg-rep-deals">
              {Array.from({ length: Math.min(r.deals, 18) }).map((_, i) => (
                <span key={i} className="dswavg-dot" style={{ background: r.color }} />
              ))}
              {r.deals > 18 && <span className="dswavg-more">+{r.deals - 18}</span>}
            </span>
            <span className="dswavg-rep-count" style={{ color: r.color }}>{r.deals} deal{r.deals > 1 ? 's' : ''}</span>
          </div>
        ))}
      </div>

      <div className="dswavg-toggle">
        <button className={`dswavg-t ${mode === 'simple' ? 'dswavg-t--on' : ''}`} onClick={() => setMode('simple')}>Simple average</button>
        <button className={`dswavg-t ${mode === 'weighted' ? 'dswavg-t--on' : ''}`} onClick={() => setMode('weighted')}>Weighted average</button>
      </div>

      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%" className="dswavg-svg">
        <line x1={PAD_L} y1={0} x2={PAD_L} y2={CHART_H} stroke="#30363d" strokeWidth={1} />
        <line x1={PAD_L} y1={CHART_H} x2={SVG_W} y2={CHART_H} stroke="#30363d" strokeWidth={1} />
        {[0, 20000, 40000].map(v => (
          <g key={v}>
            <line x1={PAD_L - 4} y1={yPos(v)} x2={SVG_W} y2={yPos(v)} stroke="#21262d" strokeWidth={1} />
            <text x={PAD_L - 6} y={yPos(v) + 4} textAnchor="end" fill="#6b7785" fontSize={8}>₹{v/1000}k</text>
          </g>
        ))}
        {REPS.map((r, i) => {
          const x = PAD_L + i * (BAR_W + GAP) + 8;
          const bh = (r.avg / MAX_AMT) * CHART_H;
          const dealW = mode === 'weighted' ? Math.min(6 + r.deals * 1.4, BAR_W) : BAR_W;
          return (
            <g key={r.name}>
              <rect x={x} y={yPos(r.avg)} width={dealW} height={bh} rx={3} fill={r.color} opacity={0.8} />
              <text x={x + BAR_W / 2} y={SVG_H - 8} textAnchor="middle" fill="#a3adbb" fontSize={9}>{r.name}</text>
            </g>
          );
        })}
        <line x1={PAD_L} y1={markerY} x2={SVG_W} y2={markerY} stroke="#a78bfa" strokeWidth={1.5} strokeDasharray="4 3" />
        <text x={SVG_W - 2} y={markerY - 3} textAnchor="end" fill="#a78bfa" fontSize={9} fontWeight="700">{fmt(marker)}</text>
      </svg>

      <div className={`dswavg-result ${mode === 'simple' ? 'dswavg-result--wrong' : 'dswavg-result--right'}`}>
        {mode === 'simple'
          ? <><strong>Simple average: {fmt(simpleAvg)}</strong> — treats Rep B's 18 deals the same as Rep A's 2. That's wrong.</>
          : <><strong>Weighted average: {fmt(weightedAvg)}</strong> — Rep B's 18 deals pull the average down, as they should.</>
        }
      </div>

      <div className="dswavg-note">
        <code>np.average(avgs, weights=deal_counts)</code> — the weight can be any count that reflects relative contribution: deal count, order volume, population size.
      </div>
    </div>
  );
};

export default DescStatsWeightedVisualization;
