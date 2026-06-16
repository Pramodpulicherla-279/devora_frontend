import { useState } from 'react';
import './visual.css';

const STAGES = [
  {
    id: 0,
    label: 'Raw Data (X)',
    icon: '📋',
    preview: 'Age  Income  Spend\n 34    52k     120\n 55    90k     400\n 22    30k      60',
    desc: 'Original feature matrix — no cluster information yet.',
  },
  {
    id: 1,
    label: 'KMeans Fit',
    icon: '⚙️',
    preview: 'km = KMeans(n_clusters=4)\nkm.fit(X)',
    desc: 'KMeans groups rows into k clusters without labels.',
  },
  {
    id: 2,
    label: 'Cluster IDs',
    icon: '🏷️',
    preview: 'cluster_id\n    2\n    0\n    3',
    desc: 'Each row gets a cluster assignment (0 to k-1).',
  },
  {
    id: 3,
    label: 'hstack(X, IDs)',
    icon: '➕',
    preview: 'Age  Income  Spend  cluster_id\n 34    52k     120       2\n 55    90k     400       0\n 22    30k      60       3',
    desc: 'Concatenate the cluster column onto the original X.',
  },
  {
    id: 4,
    label: 'Supervised Model',
    icon: '🤖',
    preview: 'clf = RandomForestClassifier()\nclf.fit(X_enriched, y)',
    desc: 'The supervised model now has richer features to learn from.',
  },
];

const ARROWS = ['→', '→', '→', '→'];

export default function UnsupClusFeatVisualization() {
  const [active, setActive] = useState(null);

  return (
    <div className="unsupcf-wrap">
      <h3 className="unsupcf-title">Clustering as Features — Pipeline</h3>
      <p className="unsupcf-hint">Click any stage to see the data at that point.</p>

      <div className="unsupcf-pipeline">
        {STAGES.map((s, i) => (
          <div key={s.id} className="unsupcf-stage-row">
            <div className={`unsupcf-box ${active === i ? 'unsupcf-box--active' : ''}`}
              onClick={() => setActive(active === i ? null : i)}>
              <span className="unsupcf-box-icon">{s.icon}</span>
              <span className="unsupcf-box-label">{s.label}</span>
            </div>
            {i < STAGES.length - 1 && <div className="unsupcf-arrow">{ARROWS[i]}</div>}
          </div>
        ))}
      </div>

      {active !== null && (
        <div className="unsupcf-detail">
          <div className="unsupcf-detail-title">{STAGES[active].icon} {STAGES[active].label}</div>
          <div className="unsupcf-detail-desc">{STAGES[active].desc}</div>
          <pre className="unsupcf-detail-pre">{STAGES[active].preview}</pre>
        </div>
      )}
    </div>
  );
}
