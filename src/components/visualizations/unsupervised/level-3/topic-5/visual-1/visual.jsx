import { useState } from 'react';
import './visual.css';

const STEPS = [
  {
    label: 'Load Data',
    icon: '📂',
    code: "df = pd.read_csv('customers.csv')",
    output: 'Shape: (5000, 8)  |  dtypes: int64(5), float64(3)',
    desc: 'Import raw customer data and verify shape.',
  },
  {
    label: 'EDA',
    icon: '🔍',
    code: 'df.describe()  # check distributions\ndf.isnull().sum()  # find missing',
    output: 'Missing: Age(12), Income(0)  |  Outliers detected in Spend',
    desc: 'Understand the data — distributions, nulls, and outliers.',
  },
  {
    label: 'Scale Features',
    icon: '⚖️',
    code: 'scaler = StandardScaler()\nX_scaled = scaler.fit_transform(df)',
    output: 'All features: mean≈0, std≈1',
    desc: 'Standardize so no feature dominates the distance metric.',
  },
  {
    label: 'Cluster',
    icon: '🔵',
    code: 'km = KMeans(n_clusters=4, random_state=42)\ndf["cluster"] = km.fit_predict(X_scaled)',
    output: 'Inertia: 4821  |  Silhouette: 0.54',
    desc: 'Fit KMeans and assign each customer to a cluster.',
  },
  {
    label: 'Interpret',
    icon: '📊',
    code: 'df.groupby("cluster")[feats].mean()',
    output: 'Cluster 0: High spend, recent  → VIP\nCluster 1: Low spend, old  → Churned',
    desc: 'Summarize each cluster to give it a business name.',
  },
];

export default function UnsupEndToEndVisualization() {
  const [open, setOpen] = useState(null);

  return (
    <div className="unsupend-wrap">
      <h3 className="unsupend-title">End-to-End Unsupervised Project</h3>
      <p className="unsupend-hint">Click a step to expand code and expected output.</p>

      <div className="unsupend-stepper">
        {STEPS.map((s, i) => (
          <div key={i} className="unsupend-step-wrap">
            <div className={`unsupend-step ${open === i ? 'unsupend-step--open' : ''}`}
              onClick={() => setOpen(open === i ? null : i)}>
              <div className="unsupend-num">{i + 1}</div>
              <div className="unsupend-step-info">
                <div className="unsupend-step-label">{s.icon} {s.label}</div>
                {open !== i && <div className="unsupend-step-desc">{s.desc}</div>}
                {open === i && (
                  <div className="unsupend-expanded">
                    <div className="unsupend-step-desc">{s.desc}</div>
                    <pre className="unsupend-code">{s.code}</pre>
                    <div className="unsupend-output-label">Expected output</div>
                    <div className="unsupend-output">{s.output}</div>
                  </div>
                )}
              </div>
              <span className="unsupend-chevron">{open === i ? '▲' : '▼'}</span>
            </div>
            {i < STEPS.length - 1 && <div className="unsupend-connector" />}
          </div>
        ))}
      </div>
    </div>
  );
}
