/* Lesson: Statistical Analysis (Capstone) — turning observations into defensible evidence
 * Visual: pick a claim → run the right test → impression vs statistically defensible finding */
import React, { useState } from 'react';
import './visual.css';

const CLAIMS = [
  {
    id: 'q4',
    claim: 'Q4 revenue is higher than other quarters',
    test: 'One-way ANOVA (revenue across 4 quarters)',
    stat: 'F = 12.3', p: 'p < 0.001', ci: '95% CI: +$12,000 to +$18,000 vs mean',
    impression: 'It looks like Q4 performs better.',
    finding: 'Q4 revenue is significantly higher than other quarters (ANOVA F=12.3, p<0.001), 95% CI $12k–$18k above the quarterly mean.',
    reject: true,
  },
  {
    id: 'disc',
    claim: 'High discounts reduce profit margin',
    test: "Two-sample t-test (margin: discount ≤10% vs >30%)",
    stat: 't = -8.7', p: 'p < 0.001', ci: '95% CI: -0.19 to -0.11 margin',
    impression: 'High-discount orders seem less profitable.',
    finding: 'Orders with >30% discount have significantly lower margin than low-discount orders (t=-8.7, p<0.001), by 0.11–0.19.',
    reject: true,
  },
  {
    id: 'region',
    claim: 'Region affects profitability',
    test: 'One-way ANOVA (profit across regions)',
    stat: 'F = 1.4', p: 'p = 0.24', ci: '95% CI includes 0',
    impression: 'The North region might do a bit better.',
    finding: 'No statistically significant difference in profit across regions (ANOVA F=1.4, p=0.24) — likely noise, do not report as a finding.',
    reject: false,
  },
];

export default function CapStatsVisualization() {
  const [id, setId] = useState('q4');
  const c = CLAIMS.find(x => x.id === id);

  return (
    <div className="capstat-wrap">
      <div className="capstat-head">
        <span className="capstat-badge">CAPSTONE · STEP 7</span>
        <h2>Statistical Analysis</h2>
        <p>Convert a pattern you can see into a finding you can defend</p>
      </div>

      <div className="capstat-claims">
        {CLAIMS.map(x => (
          <button key={x.id} className={`capstat-claim ${id === x.id ? 'capstat-claim--on' : ''}`} onClick={() => setId(x.id)}>{x.claim}</button>
        ))}
      </div>

      <div className="capstat-test">
        <span className="capstat-test-label">Test</span>
        <span className="capstat-test-name">{c.test}</span>
      </div>

      <div className="capstat-stats">
        <div className="capstat-stat"><span>{c.stat}</span><small>statistic</small></div>
        <div className={`capstat-stat ${c.reject ? 'capstat-sig' : 'capstat-ns'}`}><span>{c.p}</span><small>p-value</small></div>
        <div className="capstat-stat"><span style={{ fontSize: '0.7rem' }}>{c.ci}</span><small>confidence</small></div>
      </div>

      <div className="capstat-compare">
        <div className="capstat-side capstat-impression">
          <div className="capstat-side-h">🗨️ Impression</div>
          <p>"{c.impression}"</p>
        </div>
        <div className="capstat-arrow">→</div>
        <div className={`capstat-side ${c.reject ? 'capstat-evidence' : 'capstat-nofind'}`}>
          <div className="capstat-side-h">{c.reject ? '✅ Defensible finding' : '⚠️ Not significant'}</div>
          <p>{c.finding}</p>
        </div>
      </div>

      <div className="capstat-rule">
        {c.reject
          ? 'p < 0.05 → reject the null → the difference is unlikely to be chance.'
          : 'p ≥ 0.05 → fail to reject the null → treat as noise, not a finding.'}
      </div>
    </div>
  );
}
