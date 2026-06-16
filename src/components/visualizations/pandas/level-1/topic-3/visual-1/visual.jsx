/* Lesson: Exploring Your Data — shape, head, info, describe
 * Visual type: INTERACTIVE
 * Click a method name to see simulated output — reinforces what each command reveals */
import React, { useState } from 'react';
import './visual.css';

const METHODS = [
  {
    id: 'shape',
    call: 'df.shape',
    output: '(500, 8)',
    explanation: 'Returns (rows, columns). 500 orders, 8 columns. Always run this first.',
  },
  {
    id: 'head',
    call: 'df.head()',
    output: `   order_id      city  amount  category  ...
0      1001    Mumbai    4200  Electronics
1      1002      Pune    1850  Accessories
2      1003     Delhi    6700  Electronics
3      1004  Bengaluru    980  Accessories
4      1005    Mumbai   12400  Electronics`,
    explanation: 'Shows first 5 rows. Pass a number for more: df.head(10). Use df.tail() for the last rows.',
  },
  {
    id: 'info',
    call: 'df.info()',
    output: `RangeIndex: 500 entries, 0 to 499
Data columns (total 8 columns):
 #   Column      Non-Null Count  Dtype
---  ------      --------------  -----
 0   order_id    500 non-null    int64
 1   city        500 non-null    object
 2   amount      498 non-null    float64
 3   category    500 non-null    object
 4   date        500 non-null    datetime64
 5   rep         492 non-null    object
 6   returned    500 non-null    bool
 7   region      500 non-null    object`,
    explanation: 'Shows dtypes and null counts per column. "498 non-null" on amount = 2 missing values.',
  },
  {
    id: 'describe',
    call: 'df.describe()',
    output: `          amount
count   498.000000
mean   4312.450000
std    3218.770000
min      250.000000
25%    1600.000000
50%    3850.000000
75%    6200.000000
max   24000.000000`,
    explanation: 'Summary stats for numeric columns only. Mean ₹4,312, but max ₹24,000 — look for outliers.',
  },
  {
    id: 'dtypes',
    call: 'df.dtypes',
    output: `order_id         int64
city            object
amount         float64
category        object
date     datetime64[ns]
rep             object
returned          bool
region          object`,
    explanation: '"object" dtype = string in pandas. If a number column shows object, it imported as text — convert with pd.to_numeric().',
  },
];

const PdExploreDataVisualization = () => {
  const [sel, setSel] = useState('head');
  const m = METHODS.find(x => x.id === sel);

  return (
    <div className="pdexpl-wrap">
      <header className="pdexpl-head">
        <span className="pdexpl-badge">Pandas &amp; NumPy</span>
        <h2>Exploring a DataFrame</h2>
        <p>Run these five before you do anything else</p>
      </header>

      <div className="pdexpl-methods">
        {METHODS.map(m => (
          <button key={m.id} className={`pdexpl-btn ${sel === m.id ? 'pdexpl-btn--on' : ''}`} onClick={() => setSel(m.id)}>
            {m.call}
          </button>
        ))}
      </div>

      <div className="pdexpl-output-wrap">
        <div className="pdexpl-output-label">Output</div>
        <pre className="pdexpl-output"><code>{m.output}</code></pre>
      </div>

      <div className="pdexpl-note">{m.explanation}</div>
    </div>
  );
};

export default PdExploreDataVisualization;
