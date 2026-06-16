/* Lesson: Applying Functions with apply, map, and Vectorized Operations
 * Visual type: ILLUSTRATION
 * Tab between 3 approaches — same transformation, different method */
import React, { useState } from 'react';
import './visual.css';

const RAW_AMOUNTS = [4200, 1850, 6700, 980, 12400, 2300];

const APPROACHES = [
  {
    id: 'vec',
    label: 'Vectorised (fastest)',
    code: `# No loop at all — NumPy handles the math
df['amount_gst'] = df['amount'] * 1.18
df['is_high_value'] = df['amount'] > 5000`,
    badge: 'recommended',
    result: RAW_AMOUNTS.map(a => ({ amount: a, result: Math.round(a * 1.18), high: a > 5000 })),
    col: 'amount_gst',
    note: 'Use vectorised operations whenever possible. They run on NumPy arrays without Python-level loops.',
  },
  {
    id: 'apply',
    label: '.apply() (flexible)',
    code: `def classify(amount):
    if amount >= 10000: return 'Premium'
    if amount >= 3000:  return 'Standard'
    return 'Budget'

df['tier'] = df['amount'].apply(classify)`,
    badge: 'for custom logic',
    result: RAW_AMOUNTS.map(a => ({ amount: a, result: a >= 10000 ? 'Premium' : a >= 3000 ? 'Standard' : 'Budget', high: null })),
    col: 'tier',
    note: 'apply() passes each value to a Python function. Use it when no vectorised operation covers your logic. Slower than vectorised.',
  },
  {
    id: 'map',
    label: '.map() (replace values)',
    code: `city_region = {
    'Mumbai': 'West',   'Pune': 'West',
    'Delhi': 'North', 'Bengaluru': 'South',
}
df['region'] = df['city'].map(city_region)`,
    badge: 'for lookup / replace',
    result: [
      { amount: 4200,  result: 'West',  high: null },
      { amount: 1850,  result: 'West',  high: null },
      { amount: 6700,  result: 'North', high: null },
      { amount: 980,   result: 'South', high: null },
      { amount: 12400, result: 'West',  high: null },
      { amount: 2300,  result: 'West',  high: null },
    ],
    col: 'region',
    note: '.map() replaces values using a dictionary or Series. Perfect for adding lookup columns. Values not in the dict become NaN.',
  },
];

const PdApplyMapVisualization = () => {
  const [sel, setSel] = useState('vec');
  const a = APPROACHES.find(x => x.id === sel);

  return (
    <div className="pdapm-wrap">
      <header className="pdapm-head">
        <span className="pdapm-badge">Pandas &amp; NumPy</span>
        <h2>apply, map &amp; Vectorised</h2>
        <p>Same goal, different tools — pick the right one</p>
      </header>

      <div className="pdapm-tabs">
        {APPROACHES.map(ap => (
          <button key={ap.id} className={`pdapm-tab ${sel===ap.id?'pdapm-tab--on':''}`} onClick={()=>setSel(ap.id)}>
            {ap.label}
            <span className={`pdapm-badge-sm pdapm-badge-sm--${ap.id}`}>{ap.badge}</span>
          </button>
        ))}
      </div>

      <pre className="pdapm-code"><code>{a.code}</code></pre>

      <div className="pdapm-table-wrap">
        <table className="pdapm-table">
          <thead><tr><th>amount</th><th>→ {a.col}</th></tr></thead>
          <tbody>
            {a.result.map((r, i) => (
              <tr key={i}>
                <td>₹{r.amount.toLocaleString()}</td>
                <td className="pdapm-result">{typeof r.result === 'number' ? `₹${r.result.toLocaleString()}` : r.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pdapm-note">{a.note}</div>
    </div>
  );
};

export default PdApplyMapVisualization;
