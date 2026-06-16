import { useState } from 'react';
import './visual.css';

const STEPS = [
  {
    id: 'input',
    title: 'Input Layer',
    math: 'x = [x₁, x₂, x₃]',
    domain: 'Linear Algebra',
    desc: 'Raw inputs represented as a vector. Each node holds one feature value.',
    color: '#58a6ff',
  },
  {
    id: 'weights',
    title: 'Weight Matrix',
    math: 'z = Wx + b',
    domain: 'Linear Algebra',
    desc: 'Inputs multiplied by weight matrix W. This is pure matrix multiplication — dot products.',
    color: '#a78bfa',
  },
  {
    id: 'activation',
    title: 'Activation',
    math: 'a = σ(z)',
    domain: 'Calculus',
    desc: 'Non-linearity applied element-wise. Its derivative enables backpropagation via the chain rule.',
    color: '#56d364',
  },
  {
    id: 'loss',
    title: 'Loss',
    math: 'L = -Σ y log(ŷ)',
    domain: 'Calculus',
    desc: 'Cross-entropy loss measures prediction error. Gradient ∂L/∂W tells us how to fix weights.',
    color: '#f97316',
  },
  {
    id: 'softmax',
    title: 'Softmax Output',
    math: 'P(yₖ|x) = eᶻᵏ / Σeᶻⁱ',
    domain: 'Probability',
    desc: 'Converts raw scores to class probabilities that sum to 1. Pure probability theory.',
    color: '#58a6ff',
  },
];

const DOMAIN_COLOR = { 'Linear Algebra': '#58a6ff', 'Calculus': '#56d364', 'Probability': '#a78bfa' };

export default function MfSynthesisVisualization() {
  const [active, setActive] = useState(null);

  const info = active ? STEPS.find(s => s.id === active) : null;

  return (
    <div className="mfsynth-root">
      <h3 className="mfsynth-title">Neural Network: Math in Action</h3>
      <p className="mfsynth-subtitle">Click each step to see which math concept powers it</p>

      <div className="mfsynth-pipeline">
        {STEPS.map((s, i) => (
          <div key={s.id} className="mfsynth-step-wrap">
            <button
              className={`mfsynth-step ${active === s.id ? 'mfsynth-active' : ''}`}
              style={{ '--c': s.color }}
              onClick={() => setActive(a => a === s.id ? null : s.id)}>
              <span className="mfsynth-step-num">{i + 1}</span>
              <span className="mfsynth-step-title">{s.title}</span>
              <span className="mfsynth-step-math">{s.math}</span>
              <span className="mfsynth-step-domain"
                style={{ color: DOMAIN_COLOR[s.domain] }}>{s.domain}</span>
            </button>
            {i < STEPS.length - 1 && <div className="mfsynth-arrow">↓</div>}
          </div>
        ))}
      </div>

      {info && (
        <div className="mfsynth-info" style={{ '--c': info.color }}>
          <div className="mfsynth-info-header">
            <span className="mfsynth-info-title" style={{ color: info.color }}>{info.title}</span>
            <span className="mfsynth-info-domain" style={{ color: DOMAIN_COLOR[info.domain] }}>
              {info.domain}
            </span>
          </div>
          <div className="mfsynth-info-math">{info.math}</div>
          <div className="mfsynth-info-desc">{info.desc}</div>
        </div>
      )}

      <div className="mfsynth-legend">
        {Object.entries(DOMAIN_COLOR).map(([d, c]) => (
          <span key={d} className="mfsynth-legend-item">
            <span className="mfsynth-legend-dot" style={{ background: c }} />
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}
