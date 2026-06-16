import { useState } from 'react';
import './visual.css';

const STAGES = [
  {
    label: 'Understand',
    icon: '🧭',
    color: '#f97316',
    tasks: ['Define the target variable clearly', 'Identify key business drivers', 'Map raw columns to meaning'],
    code: "df.dtypes; df['target'].value_counts()",
  },
  {
    label: 'Clean',
    icon: '🧹',
    color: '#fb923c',
    tasks: ['Handle missing values (impute or drop)', 'Remove duplicates', 'Fix obvious data-entry errors'],
    code: "df.dropna(subset=['income']); df.drop_duplicates()",
  },
  {
    label: 'Transform',
    icon: '⚙️',
    color: '#fbbf24',
    tasks: ['Encode categoricals (OHE / ordinal)', 'Scale numerics (StandardScaler)', 'Create interaction & ratio features'],
    code: "pd.get_dummies(df, columns=['city']); scaler.fit_transform(X)",
  },
  {
    label: 'Select',
    icon: '🎯',
    color: '#34d399',
    tasks: ['Drop low-variance features', 'Check feature importance', 'Remove highly correlated pairs'],
    code: "SelectKBest(f_classif, k=10).fit_transform(X, y)",
  },
  {
    label: 'Validate',
    icon: '✅',
    color: '#56d364',
    tasks: ['Cross-validate final feature set', 'Compare baseline vs enriched model', 'Check for leakage (test AUC >> CV AUC?)'],
    code: "cross_val_score(pipe, X, y, cv=5, scoring='roc_auc')",
  },
];

export default function FeEndToEndVisualization() {
  const [open, setOpen] = useState(null);

  return (
    <div className="feend-wrap">
      <h3 className="feend-title">Complete Feature Engineering Project</h3>
      <p className="feend-hint">Click a stage card to expand tasks and code.</p>

      <div className="feend-stages">
        {STAGES.map((s, i) => (
          <div key={i} className={`feend-card ${open === i ? 'feend-card--open' : ''}`}
            style={{ '--sc': s.color }}
            onClick={() => setOpen(open === i ? null : i)}>
            <div className="feend-card-header">
              <div className="feend-card-badge" style={{ background: s.color }}>{i + 1}</div>
              <span className="feend-card-icon">{s.icon}</span>
              <span className="feend-card-label" style={{ color: s.color }}>{s.label}</span>
              <span className="feend-chevron">{open === i ? '▲' : '▼'}</span>
            </div>
            {open === i && (
              <div className="feend-card-body">
                <ul className="feend-tasks">
                  {s.tasks.map((t, j) => <li key={j}>{t}</li>)}
                </ul>
                <pre className="feend-code">{s.code}</pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
