import { useState } from 'react';
import './visual.css';

const STEPS = [
  {
    label: 'SimpleImputer',
    color: '#f97316',
    code: "SimpleImputer(strategy='median')",
    note: 'Fills missing values — runs on train data only, applied to test.',
  },
  {
    label: 'OrdinalEncoder',
    color: '#fb923c',
    code: "OrdinalEncoder(handle_unknown='use_encoded_value', unknown_value=-1)",
    note: 'Converts categories to integers. Must fit on train set only.',
  },
  {
    label: 'StandardScaler',
    color: '#fbbf24',
    code: 'StandardScaler()',
    note: 'Zero mean, unit variance. Fit on train → transform both splits.',
  },
  {
    label: 'RandomForestClassifier',
    color: '#56d364',
    code: 'RandomForestClassifier(n_estimators=100, random_state=42)',
    note: 'Final estimator. Pipeline calls .fit() and .predict() through all steps.',
  },
];

export default function FePipelineVisualization() {
  const [active, setActive] = useState(null);

  return (
    <div className="fepipe-wrap">
      <h3 className="fepipe-title">sklearn Pipeline — Chained Steps</h3>
      <p className="fepipe-hint">Click a block to see the Python code for that step.</p>

      <div className="fepipe-chain">
        {STEPS.map((s, i) => (
          <div key={i} className="fepipe-chain-row">
            <div className={`fepipe-block ${active === i ? 'fepipe-block--active' : ''}`}
              style={{ '--bc': s.color }}
              onClick={() => setActive(active === i ? null : i)}>
              <div className="fepipe-block-label" style={{ color: s.color }}>{s.label}</div>
            </div>
            {i < STEPS.length - 1 && (
              <div className="fepipe-arrow">
                <svg viewBox="0 0 24 14" width="28" height="14">
                  <line x1={0} y1={7} x2={20} y2={7} stroke="#30363d" strokeWidth={1.5} />
                  <polygon points="16,3 24,7 16,11" fill="#30363d" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {active !== null && (
        <div className="fepipe-detail" style={{ borderColor: STEPS[active].color }}>
          <div className="fepipe-detail-name" style={{ color: STEPS[active].color }}>{STEPS[active].label}</div>
          <pre className="fepipe-code">{STEPS[active].code}</pre>
          <div className="fepipe-note">{STEPS[active].note}</div>
        </div>
      )}

      <div className="fepipe-leakage">
        <strong style={{ color: '#f97316' }}>No Data Leakage:</strong> Pipeline's <code>.fit(X_train)</code> never sees test data — all transformers learn from training folds only.
      </div>
    </div>
  );
}
