/* Lesson: Writing a Complete Data Script — From Raw File to Clean Output
 * Visual type: ILLUSTRATION
 * 5-step pipeline walkthrough for the Zephyr orders script */
import React, { useState } from 'react';
import './visual.css';

const STEPS = [
  {
    id: 'load',
    num: '01',
    label: 'Load raw data',
    code: `import csv, json
from datetime import datetime

orders = []
with open('orders_raw.csv', 'r') as f:
    for row in csv.DictReader(f):
        orders.append(row)

print(f'Loaded {len(orders)} rows')  # 500`,
    output: 'Loaded 500 rows',
  },
  {
    id: 'validate',
    num: '02',
    label: 'Validate & clean',
    code: `cleaned, skipped = [], 0
for row in orders:
    try:
        row['amount'] = float(row['amount'])
        row['city'] = row['city'].strip().title()
        row['date'] = datetime.strptime(
            row['date'], '%Y-%m-%d')
        cleaned.append(row)
    except (ValueError, KeyError):
        skipped += 1

print(f'{len(cleaned)} valid, {skipped} skipped')`,
    output: '498 valid, 2 skipped',
  },
  {
    id: 'transform',
    num: '03',
    label: 'Transform',
    code: `for row in cleaned:
    row['amount_gst'] = round(row['amount'] * 1.18, 2)
    row['tier'] = (
        'Premium'  if row['amount'] >= 10000 else
        'Standard' if row['amount'] >= 3000  else
        'Budget'
    )
    row['month'] = row['date'].strftime('%b %Y')`,
    output: 'Added: amount_gst, tier, month columns',
  },
  {
    id: 'analyse',
    num: '04',
    label: 'Analyse',
    code: `from collections import defaultdict

totals = defaultdict(float)
for row in cleaned:
    totals[row['city']] += row['amount']

top_city = max(totals, key=totals.get)
print(f'Top city: {top_city} (₹{totals[top_city]:,.0f})')`,
    output: 'Top city: Mumbai (₹78,400)',
  },
  {
    id: 'export',
    num: '05',
    label: 'Export results',
    code: `with open('cleaned_orders.csv', 'w', newline='') as f:
    writer = csv.DictWriter(f,
        fieldnames=['city','amount','tier','month'])
    writer.writeheader()
    for row in cleaned:
        writer.writerow({k: row[k]
            for k in writer.fieldnames})

print('Exported cleaned_orders.csv')`,
    output: 'Exported cleaned_orders.csv ✓',
  },
];

const PyPipelineVisualization = () => {
  const [sel, setSel] = useState('load');
  const step = STEPS.find(s=>s.id===sel);

  return (
    <div className="pypipe-wrap">
      <header className="pypipe-head">
        <span className="pypipe-badge">Python Basics</span>
        <h2>Complete Data Pipeline</h2>
        <p>Five steps from raw CSV to clean output</p>
      </header>

      <div className="pypipe-steps">
        {STEPS.map((s, i) => (
          <div key={s.id} className="pypipe-step-item">
            <button className={`pypipe-step-btn ${sel===s.id?'pypipe-step-btn--on':''}`} onClick={()=>setSel(s.id)}>
              <span className="pypipe-step-num">{s.num}</span>
              <span className="pypipe-step-label">{s.label}</span>
            </button>
            {i < STEPS.length-1 && <div className="pypipe-step-conn" />}
          </div>
        ))}
      </div>

      <pre className="pypipe-code"><code>{step.code}</code></pre>

      <div className="pypipe-output">
        <span className="pypipe-output-label">Output</span>
        {step.output}
      </div>

      <div className="pypipe-note">
        Every data script follows this shape: <strong>Load → Validate → Transform → Analyse → Export.</strong> Mastering this loop with pure Python means you understand exactly what pandas is doing when you call it.
      </div>
    </div>
  );
};

export default PyPipelineVisualization;
