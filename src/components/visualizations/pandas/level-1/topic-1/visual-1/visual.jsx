/* Lesson: What is Pandas and Why Data Analysts Love It
 * Visual type: ILLUSTRATION
 * Shows the pain of pure-Python loops vs pandas one-liners for the same task */
import React, { useState } from 'react';
import './visual.css';

const TASKS = [
  {
    id: 'filter',
    label: 'Filter rows',
    python: `results = []
for row in orders:
    if row['city'] == 'Mumbai':
        results.append(row)
# 5 lines, O(n) manual loop`,
    pandas: `df[df['city'] == 'Mumbai']
# 1 line`,
  },
  {
    id: 'total',
    label: 'Sum a column',
    python: `total = 0
for row in orders:
    total += row['amount']
# accumulator pattern`,
    pandas: `df['amount'].sum()
# built-in vectorised`,
  },
  {
    id: 'group',
    label: 'Group by city',
    python: `groups = {}
for row in orders:
    c = row['city']
    groups.setdefault(c, 0)
    groups[c] += row['amount']
# defaultdict pattern`,
    pandas: `df.groupby('city')['amount'].sum()
# 1 line`,
  },
  {
    id: 'sort',
    label: 'Sort by amount',
    python: `orders_sorted = sorted(
    orders,
    key=lambda r: r['amount'],
    reverse=True
)`,
    pandas: `df.sort_values('amount',
    ascending=False)`,
  },
];

const PdWhatIsVisualization = () => {
  const [sel, setSel] = useState('filter');
  const t = TASKS.find(x => x.id === sel);

  return (
    <div className="pdwhat-wrap">
      <header className="pdwhat-head">
        <span className="pdwhat-badge">Pandas &amp; NumPy</span>
        <h2>Pure Python vs Pandas</h2>
        <p>Same task — completely different effort</p>
      </header>

      <div className="pdwhat-tabs">
        {TASKS.map(t => (
          <button key={t.id} className={`pdwhat-tab ${sel === t.id ? 'pdwhat-tab--on' : ''}`} onClick={() => setSel(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="pdwhat-compare">
        <div className="pdwhat-col pdwhat-col--py">
          <div className="pdwhat-col-label">Pure Python</div>
          <pre className="pdwhat-code pdwhat-code--py"><code>{t.python}</code></pre>
        </div>
        <div className="pdwhat-arrow">→</div>
        <div className="pdwhat-col pdwhat-col--pd">
          <div className="pdwhat-col-label">Pandas</div>
          <pre className="pdwhat-code pdwhat-code--pd"><code>{t.pandas}</code></pre>
        </div>
      </div>

      <div className="pdwhat-note">
        Pandas wraps NumPy arrays with labelled columns, SQL-style operations, and broadcasting — so tasks that take 5 lines in Python take 1 in pandas, and run 10–100× faster on large data.
      </div>
    </div>
  );
};

export default PdWhatIsVisualization;
