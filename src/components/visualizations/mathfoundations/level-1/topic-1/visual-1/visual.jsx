import { useState } from 'react';
import './visual.css';

const stages = [
  { id: 'data', label: 'Raw Data', math: 'Vectors & Matrices', desc: 'Data is represented as vectors and matrices — the language of Linear Algebra.', color: '#58a6ff' },
  { id: 'linalg', label: 'Linear Algebra', math: 'Wx + b', desc: 'Weights multiply inputs in every neural layer. Matrix multiplication is the engine.', color: '#a78bfa' },
  { id: 'calculus', label: 'Calculus', math: '∂L/∂w', desc: 'Derivatives tell us how to adjust weights to reduce error during training.', color: '#56d364' },
  { id: 'prob', label: 'Probability', math: 'P(y|x)', desc: 'Models output probabilities. Bayes, distributions, and likelihood shape predictions.', color: '#f97316' },
  { id: 'model', label: 'ML Model', math: 'ŷ = f(x)', desc: 'Everything combines: algebra for structure, calculus for learning, probability for output.', color: '#58a6ff' },
];

export default function MfWhyVisualization() {
  const [active, setActive] = useState(null);

  return (
    <div className="mfwhy-root">
      <h3 className="mfwhy-title">Why Math Powers AI</h3>
      <p className="mfwhy-subtitle">Click each stage to see the math behind it</p>

      <div className="mfwhy-pipeline">
        {stages.map((s, i) => (
          <div key={s.id} className="mfwhy-stage-wrap">
            <button
              className={`mfwhy-stage ${active === s.id ? 'mfwhy-active' : ''}`}
              style={{ '--accent': s.color }}
              onClick={() => setActive(active === s.id ? null : s.id)}
            >
              <span className="mfwhy-stage-label">{s.label}</span>
              <span className="mfwhy-stage-math">{s.math}</span>
            </button>
            {i < stages.length - 1 && (
              <div className="mfwhy-arrow">→</div>
            )}
          </div>
        ))}
      </div>

      {active && (() => {
        const s = stages.find(x => x.id === active);
        return (
          <div className="mfwhy-info" style={{ '--accent': s.color }}>
            <div className="mfwhy-info-title" style={{ color: s.color }}>{s.label}</div>
            <div className="mfwhy-info-math">{s.math}</div>
            <div className="mfwhy-info-desc">{s.desc}</div>
          </div>
        );
      })()}

      {!active && (
        <div className="mfwhy-placeholder">
          ↑ Select a stage to explore the math behind it
        </div>
      )}
    </div>
  );
}
