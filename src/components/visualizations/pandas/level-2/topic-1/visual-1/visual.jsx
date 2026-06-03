/* Lesson: Groupby and Merge
 * Visual type: INTERACTIVE
 * Reason: groupby is "split-apply-combine" — visualizing rows splitting into
 * groups then collapsing to aggregates makes the pattern concrete. Tab for merge. */
import React, { useState } from 'react';
import './visual.css';

const ROWS = [
  { city: 'Mumbai', sales: 100 }, { city: 'Delhi', sales: 80 }, { city: 'Mumbai', sales: 120 },
  { city: 'Pune', sales: 60 }, { city: 'Delhi', sales: 90 }, { city: 'Mumbai', sales: 70 },
];
const COLORS = { Mumbai: '#eab308', Delhi: '#60a5fa', Pune: '#34d399' };

const PdGroupVisualization = () => {
  const [tab, setTab] = useState('group');
  const groups = {};
  ROWS.forEach((r) => { groups[r.city] = groups[r.city] || []; groups[r.city].push(r.sales); });
  return (
    <div className="pdgroup-wrap">
      <header className="pdgroup-head">
        <span className="pdgroup-badge">Pandas</span>
        <h2>GroupBy &amp; Merge</h2>
        <p>Split-apply-combine, and joining tables</p>
      </header>
      <div className="pdgroup-tabs">
        <button className={`pdgroup-tab ${tab === 'group' ? 'pdgroup-tab--on' : ''}`} onClick={() => setTab('group')}>groupby</button>
        <button className={`pdgroup-tab ${tab === 'merge' ? 'pdgroup-tab--on' : ''}`} onClick={() => setTab('merge')}>merge</button>
      </div>
      {tab === 'group' ? (
        <>
          <pre className="pdgroup-code"><code>{"df.groupby('city')['sales'].sum()"}</code></pre>
          <div className="pdgroup-split">
            {Object.entries(groups).map(([city, vals]) => (
              <div key={city} className="pdgroup-bucket" style={{ borderColor: COLORS[city] }}>
                <div className="pdgroup-bucket-head" style={{ color: COLORS[city] }}>{city}</div>
                <div className="pdgroup-chips">{vals.map((v, i) => <span key={i} className="pdgroup-chip">{v}</span>)}</div>
                <div className="pdgroup-agg">Σ = {vals.reduce((a, b) => a + b, 0)}</div>
              </div>
            ))}
          </div>
          <div className="pdgroup-note">1) <strong>Split</strong> rows by key → 2) <strong>Apply</strong> a function (sum/mean/count) → 3) <strong>Combine</strong> into one result per group.</div>
        </>
      ) : (
        <>
          <pre className="pdgroup-code"><code>{"pd.merge(orders, users, on='user_id', how='inner')"}</code></pre>
          <div className="pdgroup-merge">
            <div className="pdgroup-mt"><div className="pdgroup-mt-h">orders</div><div>user_id, item</div></div>
            <div className="pdgroup-join">⋈ on user_id</div>
            <div className="pdgroup-mt"><div className="pdgroup-mt-h">users</div><div>user_id, name</div></div>
          </div>
          <div className="pdgroup-note"><code>merge</code> joins two DataFrames on a key — like SQL JOINs. <code>how=</code> inner / left / right / outer controls which rows survive.</div>
        </>
      )}
    </div>
  );
};
export default PdGroupVisualization;
