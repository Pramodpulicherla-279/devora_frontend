import { useState } from 'react';
import './visual.css';

const ORIGINAL = [
  { label: 'Cat', count: 800, color: '#58a6ff' },
  { label: 'Dog', count: 600, color: '#a78bfa' },
  { label: 'Bird', count: 120, color: '#56d364' },
  { label: 'Fish', count: 80, color: '#f97316' },
];

const STRATEGIES = {
  original: { label: 'Original', data: ORIGINAL, desc: 'Severe imbalance. Model will bias toward Cat/Dog.', code: '# No fix applied\nmodel.train()' },
  oversample: {
    label: 'Oversample', desc: 'Duplicate minority classes to balance counts (SMOTE-style).',
    data: ORIGINAL.map(d => ({ ...d, count: 800 })),
    code: `from imblearn.over_sampling import SMOTE\nX_res, y_res = SMOTE().fit_resample(X, y)`
  },
  undersample: {
    label: 'Undersample', desc: 'Reduce majority classes to match the minority count.',
    data: ORIGINAL.map(d => ({ ...d, count: 80 })),
    code: `from imblearn.under_sampling import RandomUnderSampler\nX_res, y_res = RandomUnderSampler().fit_resample(X, y)`
  },
  weighted: {
    label: 'Weighted Loss', desc: 'Give rarer classes higher loss weight during training.',
    data: ORIGINAL,
    code: `weights = 1 / class_counts\ncriterion = nn.CrossEntropyLoss(\n  weight=torch.tensor(weights))`
  },
  focal: {
    label: 'Focal Loss', desc: 'Focal loss down-weights easy examples, focuses on hard ones.',
    data: ORIGINAL,
    code: `# Focal Loss\npt = torch.exp(-CE_loss)\nfocal = (1 - pt)**gamma * CE_loss`
  },
};

const MAX_COUNT = 800;

export default function CnnImbalancedVisualization() {
  const [strategy, setStrategy] = useState('original');
  const s = STRATEGIES[strategy];

  return (
    <div className="cnnimbal-wrap">
      <h3 className="cnnimbal-title">Handling Imbalanced Datasets</h3>

      <div className="cnnimbal-tabs">
        {Object.entries(STRATEGIES).map(([key, v]) => (
          <button key={key}
            className={`cnnimbal-tab ${strategy===key?'cnnimbal-tab--active':''}`}
            onClick={() => setStrategy(key)}>{v.label}</button>
        ))}
      </div>

      <div className="cnnimbal-layout">
        <div className="cnnimbal-chart">
          {s.data.map((d) => (
            <div key={d.label} className="cnnimbal-bar-row">
              <span className="cnnimbal-bar-label">{d.label}</span>
              <div className="cnnimbal-bar-track">
                <div className="cnnimbal-bar-fill"
                  style={{ width: `${(d.count / MAX_COUNT) * 100}%`, background: d.color }} />
              </div>
              <span className="cnnimbal-bar-val">{d.count}</span>
            </div>
          ))}
        </div>

        <div className="cnnimbal-info">
          <p className="cnnimbal-desc">{s.desc}</p>
          <pre className="cnnimbal-code">{s.code}</pre>
        </div>
      </div>
    </div>
  );
}
