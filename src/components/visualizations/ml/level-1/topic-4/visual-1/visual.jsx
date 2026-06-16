/* Lesson: Feature Engineering — Preparing Data for Models
 * Visual type: ILLUSTRATION
 * Reason: Feature engineering is a transformation pipeline — raw columns in,
 * model-ready columns out. A tabbed before/after panel covering encoding,
 * scaling, and derived features makes the 80%-of-the-work claim concrete. */
import React, { useState } from 'react';
import './visual.css';

const TRANSFORMS = [
  {
    id: 'encode',
    label: 'Encode categories',
    before: [{ k: 'category', v: '"Electronics"', t: 'object' }],
    after: [
      { k: 'cat_Electronics', v: '1', t: 'int' },
      { k: 'cat_Accessories', v: '0', t: 'int' },
      { k: 'cat_Furniture', v: '0', t: 'int' },
    ],
    code: "pd.get_dummies(df['category'])",
    why: 'Models need numbers. One-hot encoding turns "Electronics" into three binary columns — one per category.',
  },
  {
    id: 'scale',
    label: 'Scale numerics',
    before: [
      { k: 'amount', v: '24000', t: 'int' },
      { k: 'num_orders', v: '3', t: 'int' },
    ],
    after: [
      { k: 'amount_scaled', v: '2.14', t: 'float' },
      { k: 'num_orders_scaled', v: '-0.87', t: 'float' },
    ],
    code: 'StandardScaler().fit_transform(X)',
    why: 'A ₹24,000 feature dominates a "3 orders" feature. Scaling puts every numeric column on the same z-score range.',
  },
  {
    id: 'derive',
    label: 'Create derived features',
    before: [
      { k: 'order_date', v: '2024-01-15', t: 'datetime' },
      { k: 'amount', v: '4500', t: 'int' },
    ],
    after: [
      { k: 'month', v: '1', t: 'int' },
      { k: 'is_weekend', v: '0', t: 'int' },
      { k: 'log_amount', v: '8.41', t: 'float' },
    ],
    code: "df['month'] = df['date'].dt.month",
    why: 'Raw columns hide signals. Month captures seasonality; log_amount handles the heavy tail in order values.',
  },
  {
    id: 'missing',
    label: 'Handle missing values',
    before: [
      { k: 'city', v: 'NaN', t: 'NaN' },
      { k: 'amount', v: 'NaN', t: 'NaN' },
    ],
    after: [
      { k: 'city', v: '"Unknown"', t: 'str' },
      { k: 'amount', v: '1300.0', t: 'float (median)' },
    ],
    code: "df.fillna({'city':'Unknown','amount':median})",
    why: 'Most ML models cannot handle NaN. Impute numeric with median (robust to outliers), categoricals with "Unknown".',
  },
];

const MlFeatureEngVisualization = () => {
  const [sel, setSel] = useState('encode');
  const t = TRANSFORMS.find(x => x.id === sel);

  return (
    <div className="mlfeat-wrap">
      <header className="mlfeat-head">
        <span className="mlfeat-badge">Machine Learning</span>
        <h2>Feature Engineering</h2>
        <p>80% of the work — before the model even starts</p>
      </header>

      <div className="mlfeat-tabs">
        {TRANSFORMS.map(x => (
          <button key={x.id} className={`mlfeat-tab ${sel === x.id ? 'mlfeat-tab--on' : ''}`} onClick={() => setSel(x.id)}>{x.label}</button>
        ))}
      </div>

      <div className="mlfeat-panel">
        <div className="mlfeat-col">
          <span className="mlfeat-col-hd">Before</span>
          {t.before.map((r, i) => (
            <div key={i} className="mlfeat-row mlfeat-row--before">
              <span className="mlfeat-key">{r.k}</span>
              <span className="mlfeat-val">{r.v}</span>
              <span className="mlfeat-type">{r.t}</span>
            </div>
          ))}
        </div>
        <div className="mlfeat-arrow">→</div>
        <div className="mlfeat-col">
          <span className="mlfeat-col-hd">After</span>
          {t.after.map((r, i) => (
            <div key={i} className="mlfeat-row mlfeat-row--after">
              <span className="mlfeat-key">{r.k}</span>
              <span className="mlfeat-val">{r.v}</span>
              <span className="mlfeat-type">{r.t}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mlfeat-code"><code>{t.code}</code></div>
      <div className="mlfeat-why">{t.why}</div>

      <div className="mlfeat-note">
        Feature engineering is domain knowledge translated into columns. A good feature can do more for accuracy than switching algorithms.
      </div>
    </div>
  );
};

export default MlFeatureEngVisualization;
