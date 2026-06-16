import { useState } from 'react';
import './visual.css';

const layers = [
  { id: 'transformers', label: 'Transformers / HuggingFace', color: '#a78bfa', desc: 'Pre-trained LLMs and NLP pipelines — BERT, GPT-2, T5 and more, all in a few lines of Python.' },
  { id: 'pytorch', label: 'PyTorch / TensorFlow', color: '#818cf8', desc: 'Deep learning frameworks. Define, train, and deploy neural networks with autograd and GPU support.' },
  { id: 'sklearn', label: 'scikit-learn', color: '#58a6ff', desc: 'Classical ML algorithms: regression, classification, clustering, cross-validation, pipelines.' },
  { id: 'pandas', label: 'Pandas', color: '#56d364', desc: 'DataFrames for data wrangling — load CSVs, filter rows, group, merge, and reshape tabular data.' },
  { id: 'numpy', label: 'NumPy', color: '#f97316', desc: 'N-dimensional arrays and vectorised math. The numerical backbone every other library builds on.' },
  { id: 'python', label: 'Python', color: '#e6edf3', desc: 'The language itself — clean syntax, dynamic typing, and the world\'s largest package ecosystem.' },
];

export default function PyMathWhatIsVisualization() {
  const [active, setActive] = useState(null);

  return (
    <div className="pymwhat-root">
      <h3 className="pymwhat-title">Python AI/ML Ecosystem</h3>
      <p className="pymwhat-sub">Click any layer to learn its role</p>
      <div className="pymwhat-stack">
        {layers.map((l) => (
          <button
            key={l.id}
            className={`pymwhat-layer ${active === l.id ? 'pymwhat-layer--active' : ''}`}
            style={{ '--layer-color': l.color }}
            onClick={() => setActive(active === l.id ? null : l.id)}
          >
            <span className="pymwhat-dot" />
            {l.label}
          </button>
        ))}
      </div>
      {active && (
        <div className="pymwhat-tooltip">
          <span className="pymwhat-tooltip-label" style={{ color: layers.find(l => l.id === active)?.color }}>
            {layers.find(l => l.id === active)?.label}
          </span>
          <p className="pymwhat-tooltip-desc">{layers.find(l => l.id === active)?.desc}</p>
        </div>
      )}
      <div className="pymwhat-arrow-row">
        <span className="pymwhat-arrow-label">Lower level</span>
        <div className="pymwhat-arrow" />
        <span className="pymwhat-arrow-label">Higher abstraction</span>
      </div>
    </div>
  );
}
